import {Request} from "express";

export interface IAuthedRequest extends Request {
  user: {
    sub: number,
    username: string,
    banned: boolean,
    permissions: string
  };
}
