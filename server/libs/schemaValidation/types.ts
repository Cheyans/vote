import {IAuthedRequest} from "../auth/types";

export interface IAuthedSchemaRequest<T> extends IAuthedRequest {
  schema: T;
}
