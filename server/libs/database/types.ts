export interface IModel {}


export class User implements IModel {
  public id: string;
  public username: string;
  public banned: boolean;
  public permission: string;

  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.banned = Boolean(user.banned);
    this.permission = user.permission;
  }
}
