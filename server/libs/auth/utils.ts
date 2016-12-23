import * as njwt from "njwt";
import {Response, NextFunction} from "express";
import {ResponseErrors} from "../errors/errors";
import {getUser} from "../database/accessor";
import {IAuthedRequest, IUnsignedToken} from "./types";
import TokenExpired = ResponseErrors.TokenExpired;
import UnauthorizedAccess = ResponseErrors.UnauthorizedAccess;
import NotFound = ResponseErrors.NotFound;
import {WEEK} from "../../utils/time";
import Users from "../database/tables/users";

export const SIGNING_KEY = process.env.SIGNING_KEY;

export function generateUserJwt(user: Users) {
  const claims = {
    iss: "FAF",
    sub: user.id,
    username: user.username,
    banned: Boolean(user.banned),
    permissions: user.permission.permission
  };
  return createAndCompact(claims);
}

export function permissions(permission: string) {
  return (req: IAuthedRequest, res: Response, next: NextFunction) => {
    if (req.user.permissions !== permission) {
      return next(new UnauthorizedAccess());
    }
    next();
  };
}

export function createAndCompact(claims: IUnsignedToken) {
  const token = njwt.create(claims, SIGNING_KEY);
  token.setExpiration(new Date().getTime() + WEEK);
  return token.compact();
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
