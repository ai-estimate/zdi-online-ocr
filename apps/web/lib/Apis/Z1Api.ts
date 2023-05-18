import axios from 'axios';
import {isEmpty} from 'lodash';
import {CancelledFn, Method, Params} from './types';

const CancelToken = axios.CancelToken;
const instance: any = axios.create({
  headers: {'Content-Type': 'application/json; charset=utf-8'},
});

class Z1Api {
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

  private createCancelRequest(params: any, fnCancelled: CancelledFn) {
    const source = this.getCancelRequest();
    params.cancelToken = source.token;
    fnCancelled(source);
  }
}

export default new Z1Api();
