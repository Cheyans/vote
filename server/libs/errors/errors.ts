import {StrNum} from "../../utils/types";
import {ValidationErrorItem} from "joi";

abstract class ResponseError extends Error {
  public readonly status: number;
  public readonly data: any;
  constructor(error: string, status: number, data: any = null) {
    super(error);
    this.status = status;
    this.data = data;
  };
}

export namespace ResponseErrors {
  export class MissingOAuthCode extends ResponseError {
    constructor() {super("Missing oauth code", 400); };
  }

  export class InvalidAuthInfo extends ResponseError {
    constructor() {super("Invalid email or password", 400); };
  }

  export class TokenExpired extends ResponseError {
    constructor() {super("Token expired", 401); };
  }

  export class UnauthorizedAccess extends ResponseError {
    constructor() {super("Unauthorized access", 401); };
  }

  export class InvalidSchema extends ResponseError {
    constructor(reasons: ValidationErrorItem[]) {
      const data = reasons.map((r) => {
        return {message: r.message, path: r.path, type: r.type, context: r.context};
      });
      super("Invalid body schema", 400, data);
    };
  }

  export class NotFound extends ResponseError {
    constructor(item: StrNum) {super(`${item} not found`, 404); };
  }
}

export namespace ServerErrors {
  export class UnsupportedOperation extends Error {
    constructor() {super("Unsupported operation"); };
  }

  export class AccessTokenRequired extends Error {
    constructor() {super(""); };
  }
}
