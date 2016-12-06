import {Request} from "express";

export interface IAuthedSchemaRequest<T> extends Request {
  schema: T;
  user: {
    sub: number,
    username: string,
    banned: boolean,
    permissions: string
  };
}
