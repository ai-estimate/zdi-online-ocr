import axios from 'axios';
import {isEmpty, isFunction} from 'lodash';
import {
  Z1_API_HOST,
  Z1_CLIENT_ID,
  Z1_CLIENT_SECRET,
  Z1_ESTIMATE_HOST,
} from 'config';
import {getToken} from './../auth/userCookies';
import {CancelledFn, Method, Params} from './types';

const FormData = require('form-data');
const CancelToken = axios.CancelToken;
const instance: any = axios.create({
  headers: {'Content-Type': 'application/json'},
  baseURL: Z1_API_HOST,
});

const z1estimateInst: any = axios.create({
  headers: {'Content-Type': 'application/json'},
  baseURL: Z1_ESTIMATE_HOST,
});

class Z1DataApi {
  api: typeof axios;
  api2: typeof axios;
  constructor() {
    this.api = instance;
    this.api2 = z1estimateInst;
  }

  private getCancelRequest() {
    return CancelToken.source();
  }

  private toFormData(params: any = {}) {
    const formData = new FormData();
    for (let k in params) {
      formData.append(k, params[k]);
    }
    return formData;
  }

  private toRequestOption(
    method: Method = 'GET',
    params: Params,
    headers = {},
  ) {
    const options: any = {method, headers};
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
    return options;
  }

  private request(
    url: string,
    method: Method = 'GET',
    params: Params,
    headers = {},
  ) {
    const options = this.toRequestOption(method, params, headers);
    options.url = url;
    return this.api.request(options);
  }

  private z1EstimateRequest(
    url: string,
    method: Method = 'GET',
    params: Params,
    headers = {},
  ) {
    const options = this.toRequestOption(method, params, headers);
    options.url = url;
    return this.api2.request(options);
  }

  private createCancelRequest(params: any, fnCancelled?: CancelledFn) {
    const source = this.getCancelRequest();
    params.cancelToken = source.token;
    if (isFunction(fnCancelled)) {
      fnCancelled(source);
    }
    return source;
  }

  login(email: string, password: string) {
    const params: any = {
      username: email,
      password,
      grant_type: 'password',
      client_id: Z1_CLIENT_ID,
      client_secret: Z1_CLIENT_SECRET,
    };
    const formData = this.toFormData(params);
    return this.request('/api/token', 'POST', formData, {
      'Content-Type': 'multipart/form-data',
    });
  }

  logout() {
    const formData = this.toFormData({
      client_id: Z1_CLIENT_ID,
      client_secret: Z1_CLIENT_SECRET,
      token: getToken(),
    });
    return this.request('/api/revoke_token', 'POST', formData, {
      'Content-Type': 'multipart/form-data',
    });
  }

  currentUser() {
    return this.request('/api/users/me/', 'GET', {});
  }

  csvDownload() {
    return this.request('/api/users/csv_export/', 'POST', {});
  }

  register(params = {}) {
    return this.request('/api/users/register', 'POST', params);
  }

  forgotPassword(params = {}) {
    return this.request('/api/auth/password/reset', 'POST', params);
  }

  checkPasswordResetLink(key: string) {
    return this.request(`/api/auth/password/reset/key/${key}/`, 'GET', {});
  }

  changePasswordResetLink(key: string, params = {}) {
    return this.request(`/api/auth/password/reset/key/${key}/`, 'POST', params);
  }
}

export default new Z1DataApi();
