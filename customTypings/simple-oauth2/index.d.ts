// declare module "simple-oauth2" {
//   import simpleOAuth2 = require("simple-oauth2");
//
//   class IOAuth2 {
//     constructor (config: IModuleOptions);
//     authorizationCode: IAuthorizationCodeModule;
//     clientCredentials: IClientCredentialsModule;
//     accessToken: IAccessTokenModule;
//   }
//
//   /**
//    * Creates a new simple-oauth2 client
//    * with the passed configuration
//    * @param {IModuleOptions} options - Module options as defined in schema
//    */
//   function create(options: IModuleOptions): IOAuth2;
//
//   /**
//    * Authorization Code flow implementation
//    */
//   class IAuthorizationCodeModule {
//     constructor (config: IModuleOptions);
//     /**
//      * Redirect the user to the authorization page
//      * @param {IGetTokenParams} params
//      * @return {String} the absolute authorization url
//      */
//     authorizeURL(params: IAuthorizeUrlParams): string;
//     /**
//      * Returns the Access Token Object
//      * @param  {IGetTokenParams} params
//      * @return {Promise<{p: string}>}
//      */
//     getToken(params: IGetTokenParams): Promise<{[p: string]: string}>;
//   }
//
//   /**
//    * Clients credentials flow implementation
//    */
//   class IClientCredentialsModule {
//     constructor (config: IModuleOptions);
//     /**
//      * Returns the Access Token Object
//      * @param  {IGetTokenParams} params
//      * @return {Promise<{p: string}>}
//      */
//     getToken(params: IGetTokenParams): Promise<{[p: string]: string}>;
//   }
//
//   /**
//    * Wrapper for the Access Token Object
//    */
//   class IAccessTokenModule {
//     constructor (config: IModuleOptions);
//     /**
//      * Creates an OAuth2.AccessToken instance
//      * @param  {string} token - the token object returned from the OAuth2 server.
//      * @return {IAccessToken}
//      */
//     create(token: string): IAccessToken;
//   }
//
//   export interface IModuleOptions {
//     client: {
//       id: string,
//       secret: string,
//       secretParamName?: string,
//       idParamName?: string
//     };
//     auth: {
//       tokenHost: string,
//       tokenPath?: string,
//       revokePath?: string,
//       authorizeHost?: string,
//       authorizePath?: string
//     };
//     http?: {
//       headers?: {[p: string]: string}
//     };
//     options?: {
//       useBasicAuthorizationHeader?: boolean
//       useBodyAuth?: boolean
//     };
//   }
//
//   export interface IGetTokenParams {
//     code?: string;
//     redirect_uri?: string;
//   }
//
//   export interface IAuthorizeUrlParams {
//     redirect_uri?: string;
//     scope?: string;
//     state?: string;
//   }
//
//   class IAccessToken {
//     constructor(tokenToUse: {[p: string]: string})
//     token: {
//       token_type: string,
//       access_token: string,
//       refresh_token: string,
//       client_id: string,
//       expires_in: string,
//       expires_at: string,
//     };
//     /**
//      * Check if the access token is expired or not
//      * @return boolean
//      */
//     expired(): boolean
//     /**
//      * Refresh the access token
//      * @param {Object} params - An optional argument for additional API request params.
//      * @return {Promise<IAccessToken>}
//      */
//     refresh(params: {[p: string]: string}): Promise<IAccessToken>
//     /**
//      * Revoke access or refresh token
//      * @param {String} tokenType - A string containing the type of token to revoke.
//      *                            Should be either "access_token" or "refresh_token"
//      * @return {Promise<void>}
//      */
//     revoke(tokenType: "access_token" | "refresh_token"): Promise<void>
//   }
// }
