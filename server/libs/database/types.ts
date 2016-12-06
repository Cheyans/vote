/**
 * Base ORM model for database objects
 */
export interface IModel {}

export class Insert implements IModel {
  public insertId: string;
  constructor(result) {
    this.insertId = result.insertId;
  }
}

export class ID implements IModel {
  public id: string;
  constructor(result) {
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
    this.banned = (result.banned !== undefined) ? Boolean(result.banned) : undefined;
    this.permissions = result.permissions;
  }
}
