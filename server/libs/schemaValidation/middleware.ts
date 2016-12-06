import {ObjectSchema, validate} from "joi";
import {NextFunction, Response, Request} from "express";
import {ResponseErrors} from "../errors/errors";
import {IAuthedSchemaRequest} from "./types";

export default function schemaValidator<T>(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(req.body, schema, (err, value) => {
      if (err) {
        next(new ResponseErrors.InvalidSchema(err.details));
      } else {
        (<IAuthedSchemaRequest<T>> req).schema = value;
        next();
      }
    });
  };
}
