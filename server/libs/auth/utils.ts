import * as njwt from "njwt";
import {Response, NextFunction} from "express";
import {ResponseErrors} from "../errors/errors";
import {getUser} from "../database/database";
import {IAuthedRequest} from "./types";
import TokenExpired = ResponseErrors.TokenExpired;
import UnauthorizedAccess = ResponseErrors.UnauthorizedAccess;

export const SIGNING_KEY = process.env.SIGNING_KEY;

export async function generateUserJwt(id: number) {
  const user = await getUser(id);
  const claims = {
    iss: "FAF",
    sub: user.id,
    username: user.username,
    banned: Boolean(user.banned),
    permissions: user.permissions
  };
  return njwt.create(claims, SIGNING_KEY).compact();
}

export function permissions(permission: string) {
  return (req: IAuthedRequest, res: Response, next: NextFunction) => {
    if (req.user.permissions !== permission) {
      return next(new UnauthorizedAccess());
    }
  };
}

// const config = {
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   accessTokenUri: `${process.env.FAF_API}/oauth/token`,
//   authorizationUri: `${process.env.FAF_API}/oauth/authorize`,
//   redirectUri: `${process.env.BASE_URL}/api/v1/oauth/callback`,
//   scopes: ["public_profile"]
// };

// export const fafOAuth = new ClientOAuth2(config);
