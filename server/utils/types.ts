export type StrNum = string | number;
export type StrNumDate = Date | StrNum;

export interface INoParamConstructor<T> {
  new (): T;
}

export interface IConstructor<T> {
  new (...args: any[]): T;
}
