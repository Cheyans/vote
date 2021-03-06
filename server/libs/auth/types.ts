import {Request} from "express";
import {StrNum} from "../../utils/types";

export interface IUnsignedToken {
  sub: StrNum;
  username: string;
  banned: boolean;
  permissions: string;
}

export interface ISignedToken extends IUnsignedToken {
  "iat": number;
  "exp": number;
  "iss": string;
}

export interface IAuthedRequest extends Request {
  user: ISignedToken;
}

export interface IClientOAuth2Token {
  client;
  data;
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn(duration: number | Date): Date;
  sign(requestObject);
  refresh(options): Promise<IClientOAuth2Token>;
  expired(): boolean;
}
