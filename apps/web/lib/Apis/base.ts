import axios from 'axios';
import {Z1_API_HOST} from 'config';
import {isEmpty} from 'lodash';
import {getToken} from './../auth/userCookies';
import {Method, Params} from './types';

const CancelToken = axios.CancelToken;
const instance: any = axios.create({
  baseURL: Z1_API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default class BaseAPI {
  private api: any;
  constructor() {
    this.api = instance;
  }

  getOptions(options: any) {
    return options;
  }

  getCancelRequest() {
    return CancelToken.source().token;
  }

  request(
    url: string,
    method: Method = 'GET',
    params: Params = {},
    headers = {},
  ) {
    const options: any = {url, method, headers};
    const httpMethod = method.toLowerCase();
    let cancelToken: any = null;

    if (!isEmpty(params) || params instanceof FormData) {
      if (httpMethod === 'get') {
        options.params = params;
      } else {
        options.data = params;
      }
      cancelToken = params.cancelToken;
    }

    if (cancelToken) {
      delete params.cancelToken;
      options.cancelToken = cancelToken;
    }

    const token = getToken();
    // console.log('token::: ', token);
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    const promise = this.api.request(this.getOptions(options));
    if (options.cancelToken) {
      return {source: options.cancelToken, promise};
    }
    return promise;
  }

  private makeRequest(
    url: string,
    method: Method = 'GET',
    params: any = {},
    cancelled = false,
  ) {
    if (cancelled) {
      params.cancelToken = this.getCancelRequest();
    }
    return this.request(url, method, params);
  }

  protected _get(url: string, cancelled = false) {
    return this.makeRequest(url, 'GET', {}, cancelled);
  }

  protected _list(url: string, params: any = {}, cancelled = false) {
    return this.makeRequest(url, 'GET', params, cancelled);
  }

  protected _create(url: string, params = {}) {
    return this.request(url, 'POST', params);
  }

  protected _update(url: string, params = {}) {
    return this.request(url, 'PUT', params);
  }

  protected _delete(url: string, params = {}) {
    return this.request(url, 'DELETE', params);
  }
}
