import BaseAPI from './base';

export default class BookmarkAPI extends BaseAPI {
  get url() {
    return '/api/v1/bookmarks/';
  }

  get(id: number, cancelled = false) {
    return super._get(`${this.url + id}/`, cancelled);
  }

  list(params = {}, cancelled = false) {
    return super._list(this.url, params, cancelled);
  }

  create(params = {}) {
    return super._create(this.url, params);
  }

  update(id: number, params = {}) {
    return super._update(`${this.url + id}/`, params);
  }

  delete(id: number) {
    return super._delete(`${this.url + id}/`);
  }
}
