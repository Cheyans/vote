import {StrNum} from "../../utils/types";
import {User, ID, Insert} from "./types";
import {ISurvey, IQuestion, IAnswer} from "../schemaValidation/schemas/survey";
import Database from "./database";
import {isNullOrUndefined} from "util";
import logger from "../logger";
import {IConnection} from "mysql";

const database: Database = Database.getInstance();

// async function getActiveSurveys(): Promise<[{[p: string]: string}]> {
//   return query(`
//     SELECT
//       id,
//       survey_name
//     FROM surveys
//     WHERE end_dtm > now()
//     ORDER BY start_dtm DESC`
//   );
// }
//

export async function insertSurvey(survey: ISurvey): Promise<ID> {
  return new Promise<ID>((resolve, reject) => {
    database.beginTransaction(async (connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      }
      try {
        const surveyResult = (<Insert> await database.insertOne(
          `INSERT INTO surveys (name, start_dtm, end_dtm)
           VALUES (?)`, [survey.name, survey.startDate, survey.endDate], true, connection));
        const surveyId = surveyResult.insertId;

        const formattedQuestions = survey.questions.map((q: IQuestion) => {
          return [q.question, surveyId, q.orderNumber || null, q.maxVotesPerUser || null, q.minVotesPerUser || null];
        });
        await database.insertMany(
          `INSERT INTO questions (question, survey_id, display_order, max_votes_per_user, min_votes_per_user) 
           VALUES ?`, formattedQuestions, true, connection);
        const questionIds = await getQuestionsAscOrder(surveyId, connection);

        const formattedAnswers = survey.questions.reduce((answers: StrNum[][], question: IQuestion, i: number) => {
          question.answers.forEach((a: IAnswer) => {
            answers.push([a.answer, questionIds[i].id, a.orderNumber]);
          });
          return answers;
        }, []);

        const formattedIps = survey.bannedIps.map((ip) => [surveyId, ip]);
        const bannedUsers = await getUsersFromUsernames(survey.bannedUsers, connection);
        const formattedUsers = bannedUsers.map((user: User) => [surveyId, user.id, null]);

        // If the user doesn't exist in the database then classify it as a shadow user
        const formattedShadowUsers = survey.bannedUsers.filter((shadowUsername) => {
          return bannedUsers.findIndex((user: User) => user.username === shadowUsername) === -1;
        }).map((shadowUsername) => [surveyId, null, shadowUsername]);

        await Promise.all([
          database.insertMany(`INSERT INTO answers (answer, question_id, display_order) VALUES ?`,
            formattedAnswers, false, connection),
          database.insertMany(`INSERT INTO survey_banned_ips (survey_id, ip) VALUES ?`,
            formattedIps, false, connection),
          database.insertMany(`INSERT INTO survey_banned_users (survey_id, user_id, shadow_username) VALUES ?`,
            formattedUsers.concat(formattedShadowUsers), false, connection)
        ]);
        connection.commit((e) => {
          if (e) {
            throw e;
          }
          resolve(new ID({id: surveyId}));
        });
      } catch (e) {
        await Database.rollback(connection);
        reject(e);
      }
    });
  });
}

export async function getUsersFromUsernames(usernames: string[], connection?: IConnection): Promise<[User]> {
  return database.queryMany<User>(`
    SELECT 
      id,
      username
    FROM users
    WHERE username IN (?)`, usernames, User, connection);
}

/**
 * Get questions for a given survey id in ascending order by question id
 * @param {StrNum} surveyId - id of survey
 * @param {IConnection} [connection] - connection instance, useful for transactions and cb based functions
 * @returns {Promise<[ID]>} - promise of list of question ids
 */
export async function getQuestionsAscOrder(surveyId: StrNum, connection?: IConnection): Promise<[ID]> {
  return database.queryMany<ID>(`
    SELECT
      id
    FROM questions
    WHERE survey_id = ?
    ORDER BY id ASC`, [surveyId], ID, connection);
}

/**
 * Update a user with the given username, banned status or permission id
 * @param {StrNum} id - user id
 * @param {string} username - username
 * @param {string} banned - global banned status
 * @param {StrNum} permissionId - permission level of user
 * @returns {Promise<Insert>} - promise of result
 */
export async function updateUser(id: StrNum, username?: string, banned?: boolean,
                                 permissionId?: StrNum): Promise<Insert> {
  let usernameSet = "";
  let bannedSet = "";
  let permissionSet = "";
  let args = [id];

  if (!isNullOrUndefined(username)) {
    usernameSet = "SET username = ?";
    args.unshift(username);
  }
  if (!isNullOrUndefined(banned)) {
    bannedSet += "SET banned = ?";
    args.unshift(Number(banned));
  }
  if (!isNullOrUndefined(permissionId)) {
    permissionSet = "SET permissions = ?";
    args.unshift(permissionId);
  }

  if (args.length === 1) {
    logger.warning(`No attributes updated for ${id}`);
    return;
  }

  return database.insertOne(`
    UPDATE users
    ${permissionSet}
    ${bannedSet}
    ${usernameSet}
    WHERE id = ?`, [username, id]);
}

/**
 * Inserts a list of new users into the db
 * @param {Array<{id: string, username: string}>} users - list of users
 * @returns {Promise<Insert>} - promise of result
 */
export async function insertNewUsers(users: Array<{id: string, username: string}>): Promise<Insert> {
  return database.insertMany(`
    INSERT INTO users (id, username)
    VALUES ?`, users.map((user) => [user.id, user.username]));
}

/**
 * Gets user from db
 * @param {number} id - id of user
 * @returns {Promise<null|User>} - promise of result
 */
export async function getUser(id: number): Promise<User | null> {
  return database.queryOne<User>(`
    SELECT
      u.id as id,
      u.username as username,
      u.banned as banned,
      p.permission as permissions
    FROM users u
    INNER JOIN permissions p ON p.id = u.permission_id
    WHERE u.id = ?`, [id], User);
}
