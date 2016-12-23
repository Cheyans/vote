/**
 * Base ORM model for database objects
 */
export class IModel {
  constructor(public result) {};
}

/**
 * Class wrapping id of last insert id from a db insert
 * IMPORTANT: It will only hold the correct id if the table being inserted into has an auto incremented primary key
 * @see http://dev.mysql.com/doc/refman/5.7/en/getting-unique-id.html
 */
export class Insert extends IModel {
  public insertId: string;
  constructor(result) {
    super(result);
    this.insertId = result.insertId;
  }
}

export class ID extends IModel {
  public id: string;
  constructor(result) {
    super(result);
    this.id = result.id;
  }
}

export class User extends ID {
  public username: string;
  public banned?: boolean;
  public permissions?: string;

  constructor(result) {
    super(result);
    this.id = result.id;
    this.username = result.username;
    this.banned = Boolean(result.banned);
    this.permissions = result.permission;
  }
}

/**
 * Expects a sorted list of result questionAnswer rows
 */
export class Survey extends ID {
  public name: string;
  public startDate: Date;
  public endDate: Date;
  public questions: Question[];
  public bannedUsers: string[][];
  public bannedIps: string[];

  constructor(result, bannedUsers, bannedIps) {
    super({id: result.surveyId, ...result});
    this.bannedUsers = bannedUsers.map((row) => [row.userId, row.shadowUsername]);
    this.bannedIps = bannedIps.map((row) => row.ip);
    const firstResult = result[0];
    this.name = firstResult.surveyName;
    this.startDate = new Date(firstResult.surveyStartDate);
    this.endDate = new Date(firstResult.surveyEndDate);
    this.questions = [];
    let lastQuestion: Question;
    result.forEach((row) => {
      if (row.questionId !== lastQuestion.id) {
        lastQuestion = new Question(row);
        this.questions.push(lastQuestion);
      }
      lastQuestion.answerOptions.push(new Answer(row));
    });
  }
}

export class BannedUsers extends ID {

}

export class Question extends ID {
  public question: string;
  public orderNumber: number;
  public maxVotesPerUser: number;
  public minVotesPerUser: number;
  public answers: Answer[];

  constructor(result) {
    super({id: result.questionId, ...result});
    const firstResult = result[0];
    this.question = firstResult.question;
    this.orderNumber = firstResult.questionOrderNumber;
    this.maxVotesPerUser = firstResult.maxVotesPerUser;
    this.minVotesPerUser = firstResult.minVotesPerUser;
  }
}

export class Answer {
  public answer: string;
  public orderNumber: number;

  constructor(result) {
    this.answer = result.answer;
    this.orderNumber = result.answerOrderNumber;
  }
}
