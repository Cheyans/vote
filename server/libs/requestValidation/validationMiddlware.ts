import {ObjectSchema, validate} from "joi";
import {ResponseErrors} from "../errors/errors";

export default function schemaValidator(schema: ObjectSchema) {
  return (req, res, next) => {
    validate(req.body, schema, (err, value) => {
      if (err) {
        next(new ResponseErrors.InvalidSchema());
      } else {
        req.schema = value;
      }
    });
  };
}
