export type stringOrNumber = string | number;
export interface INoParamConstructor<T> {
  new (model: any): T;
}
