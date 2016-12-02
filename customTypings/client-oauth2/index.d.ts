// declare module "client-oauth2" {
//   export = ClientOAuth2;
//   interface IClientOAuth2Options {
//     clientId: string;
//     clientSecret: string;
//     accessTokenUri: string;
//     authorizationUri: string;
//     redirectUri: string;
//     scopes: string[];
//     state?: string;
//   }
//   interface IClientOAuth2TokenOptions {
//     access_token: string;
//     refresh_token: string;
//     token_type: string;
//   }
//   interface IRequestObject {
//     tokenType?: "bearer";
//     headers: {[p: string]: string};
//   }
//   interface ISignedRequestObject extends IRequestObject {
//     headers: {
//       Authorization?: string,
//       Pragma?: string,
//       [p: string]: string
//     };
//     url?: string;
//   }
//   class ClientOAuth2Token<T extends IClientOAuth2TokenOptions> {
//     public client: ClientOAuth2<T>;
//     public data: T;
//     public tokenType: string;
//     public accessTOken: string;
//     public refreshToken: string;
//     public expiresIn(duration: number | Date): Date;
//     public sign(requestObject: IRequestObject): ISignedRequestObject;
//     public refresh(options: {[p: string]: string}): Promise<ClientOAuth2Token<T>;
//     public expired(): boolean;
//   }
//
//   class ClientOAuth2<T extends IClientOAuth2TokenOptions> {
//     public code: CodeFlow<T>;
//     public token: TokenFlow<T>;
//     public owner: OwnerFlow<T>;
//     public credentials: CredentialsFlow<T>;
//     public jwt: JwtBearerFlow<T>;
//     public Token: ClientOAuth2Token<T>;
//     private options: IClientOAuth2Options;
//     private request: any;
//     constructor(options: IClientOAuth2Options, request?: any);
//     public createToken(access: string, refresh: string, type: string, data: {[p: string]: string}): ClientOAuth2Token<T>
//   }
//
//   class TokenFlow<T extends IClientOAuth2TokenOptions> {
//     constructor(client: ClientOAuth2<T>);
//     public getUri(options?: {[p: string]: string}): string;
//     public getToken(uri: string, options?: {[p: string]: string}): Promise<ClientOAuth2Token<T>>
//   }
//
//   class OwnerFlow<T extends IClientOAuth2TokenOptions> {
//     constructor(client: ClientOAuth2<T>);
//     public getToken(username: string, password: string, options?: {[p: string]: string}): Promise<ClientOAuth2Token<T>>
//   }
//
//   class CredentialsFlow<T extends IClientOAuth2TokenOptions> {
//     constructor(client: ClientOAuth2<T>);
//     public getToken(options?: {[p: string]: string}): Promise<ClientOAuth2Token<T>>
//   }
//
//   class CodeFlow<T extends IClientOAuth2TokenOptions> {
//     constructor(client: ClientOAuth2<T>);
//     public getUri(options?: {[p: string]: string}): string;
//     public getToken(uri: string, options?: {[p: string]: string}): Promise<ClientOAuth2Token<T>>
//   }
//
//   class JwtBearerFlow<T extends IClientOAuth2TokenOptions> {
//     constructor(client: ClientOAuth2<T>);
//     public getToken(token: string, options?: {[p: string]: string}): Promise<ClientOAuth2Token<T>>
//   }
// }
