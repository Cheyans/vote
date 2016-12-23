import "reflect-metadata";
import {IConnection} from "mysql";
import {createConnection, Connection} from "typeorm";
import {IModel, Insert} from "./types";
import {IConstructor, StrNumDate} from "../../utils/types";

export default class Database {
  private static instance: Database;
  public connection: Connection;

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      Database.instance = new Database();
      Database.instance.connection = await createConnection({
        driver: {
          type: "mysql",
          host: process.env.MYSQL_HOSTNAME,
          database: process.env.MYSQL_DATABASE,
          username: process.env.MYSQL_USER,
          password: process.env.MYSQL_ROOT_PASSWORD,
        },
        entities: [
          __dirname + "/tables/*.js"
        ]
      });
    }
    return Database.instance;
  }

  public static async rollback(connection: IConnection): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      connection.rollback(() => {
        resolve();
      });
    });
  }

  public beginTransaction(cb: (err: any, connection?: IConnection) => void): void {
    this.getConnection().then((connection) => {
      connection.beginTransaction((err) => {
        cb(err, connection);
      });
    }).catch(cb);
  }

  /**
   * Queries the database and returns all rows as a single returnType
   * @param {String} sql - query
   * @param {StrNumDate[]} [args=[]] - list of arguments
   * @param returnType - type the result will return as
   * @param {IConnection} [connection] - connection instance, useful for transactions and cb based functions
   * @return {Promise<T>} - promise of result
   */
  public async queryOneResult<T extends IModel>(sql: string, args: StrNumDate[] = [], returnType: IConstructor<T>,
                                                connection?: IConnection): Promise<T> {
    return new Promise<T>(async(resolve, reject) => {
      const currConnection = connection || await this.getConnection();
      currConnection.query(sql, args, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(new returnType(result));
      });
    });
  }

  /**
   * Queries the database and returns the first row as the returnType
   * @param {String} sql - query
   * @param {StrNumDate[]} [args=[]] - list of arguments
   * @param returnType - type the result will return as
   * @param {IConnection} [connection] - connection instance, useful for transactions and cb based functions
   * @return {Promise<T | null>} - promise of result
   */
  public async queryFirstRow<T extends IModel>(sql: string, args: StrNumDate[] = [], returnType: IConstructor<T>,
                                               connection?: IConnection): Promise<T | null> {
    return new Promise<T>(async(resolve, reject) => {
      const currConnection = connection || await this.getConnection();
      currConnection.query(sql, args, (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length > 0) {
          resolve(new returnType(result[0]));
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Queries the database for many rows as many returnTypes
   * @param {String} sql - query
   * @param {StrNumDate[]} [args=[]] - list of arguments
   * @param returnType - type the results will return as
   * @param {IConnection} [connection] - connection instance, useful for transactions and cb based functions
   * @return {Promise<[T]>} - promise of result
   */
  public async queryManyRows<T extends IModel>(sql: string, args: StrNumDate[] = [], returnType: IConstructor<T>,
                                               connection?: IConnection): Promise<[T]> {
    return new Promise<[T] | undefined>(async(resolve, reject) => {
      const currConnection = connection || this.connection;
      currConnection.query(sql, args, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.map((r) => new returnType(r)));
      });
    });
  }

  /**
   * Inserts into the database
   * @param {String} sql - query
   * @param {StrNumDate[]} args - list of arguments
   * @param {IConnection} [connection] - connection instance, useful for transactions and cb based functions
   * @return {Promise<Insert | null>} - promise of result
   */
  public async insertOne(sql: string, args: StrNumDate[], connection?: IConnection): Promise<Insert | null> {
    return new Promise<Insert | undefined>(async(resolve, reject) => {
      const currConnection = connection || await this.getConnection();
      currConnection.query(sql, args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Insert(result));
        }
      });
    });
  }

  /**
   * Inserts many rows into the database
   * @param {String} sql - query
   * @param {StrNumDate[][]} args - list of arguments
   * @param {IConnection} [connection] - connection instance, useful for transactions and cb based functions
   * @return {Promise<Insert | null>} - promise of result
   */
  public async insertMany(sql: string, args: StrNumDate[][], connection?: IConnection): Promise<Insert> {
    return new Promise<Insert | undefined>(async(resolve, reject) => {
      const currConnection = connection || this.connection;
      currConnection.query(sql, [args], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Insert(result));
        }
      });
    });
  }
}
