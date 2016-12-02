import {createPool, IPool, IConnection} from "mysql";
import {stringOrNumber} from "../../utils/types";
import {User, IModel, IModelConstructor} from "./types";

const pool: IPool = createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

async function getConnection(): Promise<IConnection> {
  return new Promise<IConnection>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
}

/**
 * Returns promise of query
 * @param {String} query - sql query
 * @param {Array<*>} [args=[]] - list of arguments
 * @param returnType - type the result will return as
 * @return {Promise} - promise of result
 */
async function queryOne<T extends IModel>(query: string, args: stringOrNumber[] = [],
                                          returnType: IModelConstructor): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    const connection = await getConnection();
    connection.query(query, args, (err, result) => {
      if (err) {
        reject(err);
      } else if (Object.keys(result).length > 0) {
        resolve(new returnType(result[0]));
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * Returns promise of query
 * @param {String} query - sql query
 * @param {Array<*>} [args=[]] - list of arguments
 * @return {Promise} - promise of result
 */
function query(query: string, args: stringOrNumber[] = []): Promise<[{[p: string]: string}]> {
  return new Promise<{[p: string]: string}>(async (resolve, reject) => {
    const connection = await getConnection();
    connection.query(query, args, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getActiveSurveys(): Promise<[{[p: string]: string}]> {
  return query(`
    SELECT
      id, 
      survey_name
    FROM surveys
    WHERE end_dtm > now()
    ORDER BY start_dtm DESC`
  );
}

async function insertNewVoter(id: number, username: string): Promise<[{[p: string]: string}]> {
  return query(`
    INSERT INTO voters (id, username)
    VALUES (?, ?)`,
    [id, username]
  );
}

export async function getUser(id: number): Promise<User> {
  return queryOne<User>(`
    SELECT
      u.id as id,
      u.username as username,
      u.banned as banned,
      p.permission
    FROM users u
    INNER JOIN permissions p ON p.id = u.permission_id
    WHERE u.id = ?`,
    [id]
  );
}
