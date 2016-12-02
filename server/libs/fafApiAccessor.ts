import * as axios from "axios";
import {RequestMethod} from "../utils/http";
import {ServerErrors} from "./errors/errors";
import * as moment from "moment";
import UnsupportedOperation = ServerErrors.UnsupportedOperation;
import IPromise = Axios.IPromise;
import AxiosXHR = Axios.AxiosXHR;
import AxiosXHRConfigBase = Axios.AxiosXHRConfigBase;
import Moment = moment.Moment;

type IJsonApiDocument = IJsonApiDocumentOne | IJsonApiDocumentMany;

export interface IJsonApiDocumentMany {
  data: [{
    attributes: {}
    id: string
    type: string
  }];
}

export interface IJsonApiDocumentOne {
  data: {
    attributes: {}
    id: string
    type: string
  };
}

export default class FafApiAccessor {
  public static FAF_API = process.env.FAF_API;
  private expireAt: Moment;
  constructor(private accessToken: string, private refreshToken: string, expireAt: string) {
    this.expireAt = moment.utc(expireAt);
  }

  /**
   * Gets '/players/me' route
   * @returns {Promise<AxiosXHR<IJsonApiDocumentOne>>}
   */
  public async getPlayerMe(): Promise<AxiosXHR<IJsonApiDocumentOne>> {
    return this.get<IJsonApiDocumentOne>("/players/me");
  }

  private async get<T extends IJsonApiDocument>(route: string): Promise<AxiosXHR<T>> {
    return this.request<T>(RequestMethod.GET, route);
  }

  /**
   * Request wrapper for axios requests
   * @param {RequestMethod} method - request method
   * @param {string} route - route of faf api, must begin with '/'
   * @param {AxiosXHRConfigBase<T>} headers - request headers
   * @returns {IPromise<AxiosXHR<T>>}
   */
  private async request<T extends IJsonApiDocument>(method: RequestMethod, route: string,
                                                    headers: AxiosXHRConfigBase<T> = {}): Promise<AxiosXHR<T>> {
    if (this.accessToken) {
      headers = Object.assign(headers, {Authorization: `Bearer ${this.accessToken}`});
    }
    const url = `${FafApiAccessor.FAF_API}${route}`;
    switch (method) {
      case RequestMethod.GET:
        return axios.get<T>(url, headers);
      default:
        throw new UnsupportedOperation();
    }
  }
}
