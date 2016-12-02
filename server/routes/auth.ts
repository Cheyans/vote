import {Router} from "express";
import logger from "../libs/logger";
import {fafOAuth} from "../libs/auth/utils";

const router = Router();
const authorizationUri = fafOAuth.code.getUri();

router.get("/", (req, res, next) => {
  logger.info(`Initiating oauth request, redirecting to ${authorizationUri}`);
  res.redirect(authorizationUri);
});

router.get("/callback", async (req, res, next) => {
  const token = await fafOAuth.code.getToken(req.originalUrl).catch(next);
});

export = router;
