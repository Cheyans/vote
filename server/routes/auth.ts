import {Router, Request} from "express";
import * as ClientOAuth2 from "client-oauth2";
import * as url from "url";
import logger from "../libs/logger";
import FafApiAccessor from "../libs/fafApi/accessor";
import {insertNewUsers, getUser, updateUser} from "../libs/database/accessor";
import {isNullOrUndefined} from "util";
import {ResponseErrors} from "../libs/errors/errors";
import {generateUserJwt, createAndCompact} from "../libs/auth/utils";
import authMiddleware from "../libs/auth/middleware";
import MissingOAuthCode = ResponseErrors.MissingOAuthCode;
import {IAuthedRequest} from "../libs/auth/types";

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
      next(new MissingOAuthCode());
    }
    const token = await fafOAuth.code.getToken(originalUrl);
    const apiAccessor = new FafApiAccessor(token);
    const player = await apiAccessor.getPlayerMe();
    const {id, login} = player.data.data.attributes;
    const user = await getUser(id);
    if (isNullOrUndefined(user)) {
      await insertNewUsers([{id, username: login}]);
      logger.info(`Successfully created account for ${login}`);
    } else {
      await updateUser(id, login);
      logger.info(`Successfully updated account for ${login}`);
    }
    res.send({message: "Successfully logged in", token: await generateUserJwt(id)});
  } catch (e) {
    next(e);
  }
});

router.put("/refresh",
  authMiddleware,
  async (req: IAuthedRequest, res, next) => {
    const compactedToken = createAndCompact(req.user);
    res.send({message: "Token refresh", token: compactedToken});
  }
);

export = router;
