abstract class ResponseError extends Error {
  public readonly status: number;
  public readonly data: Object;
  constructor(error: string, status: number, data: Object = null) {
    super(error);
    this.status = status;
    this.data = data;
  };
}

export namespace ResponseErrors {
  export class InvalidAuthInfo extends ResponseError {
    constructor() {super("Invalid email or password", 400); };
  }

  export class TokenExpired extends ResponseError {
    constructor() {super("Invalid email or password", 401); };
  }

  export class UnauthorizedAccess extends ResponseError {
    constructor() {super("Unauthorized access", 401); };
  }

  export class InvalidSchema extends ResponseErrors {
    constructor() {super("Invalid body schema", 400); };
  }
}

export namespace ServerErrors {
  export class UnsupportedOperation extends Error {
    constructor() {super("Unsupported operation"); };
  }
}
