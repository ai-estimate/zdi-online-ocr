import axios from 'axios';
import {isEmpty} from 'lodash';
import {Method, Params} from './types';
import {Z1_ESTIMATE_HOST} from 'config';

const CancelToken = axios.CancelToken;
const instance: any = axios.create({
  baseURL: Z1_ESTIMATE_HOST,
  headers: {'Content-Type': 'application/json; charset=utf-8'},
});

class Z1ApiV2 {
  api: typeof axios;
  constructor() {
    this.api = instance;
  }

  getCancelRequest() {
    return CancelToken.source();
  }

  private request(url: string, method: Method = 'GET', params: Params) {
    const options: any = {url, method, headers: {}};
    const httpMethod = method.toLowerCase();

    let cancelToken: any = null;
    if (!isEmpty(params)) {
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
    return this.api.request(options);
  }
}

export default new Z1ApiV2();
