import * as njwt from "njwt";
import {Request, Response, NextFunction} from "express";
import {ResponseErrors} from "../errors/errors";
import {IAuthedRequest} from "./types";
import TokenExpired = ResponseErrors.TokenExpired;
import UnauthorizedAccess = ResponseErrors.UnauthorizedAccess;

const SIGNING_KEY = process.env.SIGNING_KEY;

export default function authHandler(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (token) {
    njwt.verify(token, SIGNING_KEY, (err, ver) => {
      if (err) {
        next(new TokenExpired());
      } else {
        (<IAuthedRequest> req).user = ver.body;
        next();
      }
    });
  } else {
    // token not sent
    next(new UnauthorizedAccess());
  }
}
