import {NextFunction, Response, Request} from "express";
import logger from "../logger";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status ? err.status : 500;
  if (status >= 400) {
    logger.error(`Request headers: ${JSON.stringify(req.headers)}`);
    logger.error(`Request parameters: ${JSON.stringify(req.params)}`);
    logger.error(`Request body : ${JSON.stringify(req.body, null, 2)}`);
  }

  if (status >= 500 || process.env.NODE_ENV === "development") {
    logger.error(err.stack);
  }

  let response = null;
  if (status >= 500) {
    response = {error: "Something went wrong"};
  } else {
    response = {error: err.message};
    if (err.data) {
      response.errors = err.data;
    }
  }
  res.status(status).json(response);
}
