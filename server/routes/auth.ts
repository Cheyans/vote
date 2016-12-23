import {Router, Request} from "express";
import * as ClientOAuth2 from "client-oauth2";
import * as url from "url";
import logger from "../libs/logger";
import FafApiAccessor from "../libs/fafApi/accessor";
import {isNullOrUndefined} from "util";
import {ResponseErrors} from "../libs/errors/errors";
import {generateUserJwt, createAndCompact} from "../libs/auth/utils";
import authMiddleware from "../libs/auth/middleware";
import {IAuthedRequest} from "../libs/auth/types";
import Database from "../libs/database/database";
import MissingOAuthCode = ResponseErrors.MissingOAuthCode;

const router = Router();
const FAF_API = process.env.FAF_API;

const fafOAuth = new ClientOAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessTokenUri: `${process.env.FAF_API}/oauth/token`,
  authorizationUri: `${process.env.FAF_API}/oauth/authorize`,
  redirectUri: `${process.env.BASE_URL}/api/v1/auth/callback`,
  scopes: ["public_profile"]
});
const authorizationUri = fafOAuth.code.getUri();

router.get("/", async (req, res) => {
  logger.info(`Initiating oauth request, redirecting to ${authorizationUri}`);
  res.redirect(authorizationUri);
});

router.get("/callback", async (req: Request, res, next) => {
  try {
    const originalUrl = req.originalUrl;
    if (isNullOrUndefined(url.parse(originalUrl, true).query.code)) {
      return next(new MissingOAuthCode());
    }

    // Handle oauth process
    const token = await fafOAuth.code.getToken(originalUrl);
    const apiAccessor = new FafApiAccessor(token);
    const player = await apiAccessor.getPlayerMe();
    const {id, login} = player.data.data.attributes;

    // // Handle user login
    // const database: Database = await Database.getInstance();
    // const usersRepo = database.connection.getRepository<Users>(Users);
    // let user = await usersRepo.findOneById(id);
    // const storedUsername = user.username;
    // if (isNullOrUndefined(user)) {
    //   await usersRepo.persist(new Users(id, login));
    //   logger.info(`Successfully created account for ${id}`);
    // } else if (storedUsername !== login) {
    //   user.username = login;
    //   await usersRepo.persist(user);
    //   logger.info(`Successfully updated ${id} username from ${storedUsername} to ${login}`);
    // } else {
    //   logger.info(`No account info changes to persist for ${id}`);
    // }
    // user = await usersRepo.findOneById(user.id, {
    //   alias: "user",
    //   innerJoinAndSelect: {"permission": "user.permission"}
    // });

    // res.send({message: "Successfully logged in", token: generateUserJwt(user)});
    res.end();
  } catch (e) {
    next(e);
  }
});

router.put("/refresh",
  authMiddleware,
  async (req: IAuthedRequest, res, next) => {
    const compactedToken = createAndCompact(req.user);
    res.send({message: "Token refreshed", token: compactedToken});
  }
);

export = router;
