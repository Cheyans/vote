import * as axios from "axios";
import {RequestMethod} from "../../utils/http";
import {ServerErrors} from "../errors/errors";
import {IClientOAuth2Token} from "../auth/types";
import {IJsonApiDocumentOne, IJsonApiDocument} from "./types";
import {IConstructor} from "../../utils/types";
import UnsupportedOperation = ServerErrors.UnsupportedOperation;
import AxiosXHRConfig = Axios.AxiosXHRConfig;
import AxiosXHR = Axios.AxiosXHR;

export default class FafApiAccessor {
  public static FAF_API = process.env.FAF_API;
  constructor(private token: IClientOAuth2Token) {}

  /**
   * Gets '/players/me' route
   * @returns {Promise<AxiosXHR<IJsonApiDocumentOne>>}
   */
  public async getPlayerMe(): Promise<AxiosXHR<IJsonApiDocumentOne>> {
    return this.get<IJsonApiDocumentOne>("/players/me", IJsonApiDocumentOne);
  }

  /**
   * Get request
   * @param {string} route - route to request
   * @param {IConstructor<T>} returnType - type of return object, must be the same as T
   * @returns {Promise<AxiosXHR<T>>} - Promise wrapping response result
   */
  private async get<T extends IJsonApiDocument>(route: string, returnType: IConstructor<T>): Promise<AxiosXHR<T>> {
    return this.request<T>("GET", route, returnType);
  }

  /**
   * Request wrapper for axios requests
   * @param {RequestMethod} method - request method
   * @param {string} route - route of faf api, must begin with '/'
   * @param returnType - type the result will return as
   * @returns {Promise<AxiosXHR<T>>} - Promise wrapping response result
   */
  private async request<T extends IJsonApiDocument>(method: RequestMethod, route: string,
                                                    returnType: IConstructor<T>): Promise<AxiosXHR<T>> {
    const url = `${FafApiAccessor.FAF_API}${route}`;
    const token = (<AxiosXHRConfig<any>> this.token.sign({
      method, url,
      transformResponse: axios.defaults.transformResponse.concat((data) => new returnType(data.data))
    }));
    return axios.request<T>(token);
  }
}
