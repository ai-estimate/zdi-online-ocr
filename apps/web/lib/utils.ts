import {keys, forEach} from 'lodash';
import qs from 'qs';
export const getNextUrl = (url: string) => {
  if (!url) return '';
  let query: any = {};
  if (url?.includes('?')) {
    query = qs.parse(url.split('?')[1]);
  }
  let next: any = '';
  forEach(keys(query), (key) => {
    next = query[key];
    if (next?.includes('?')) {
      next = next.split('?')[0];
    }
  });

  if (next) {
    next = '?_next=' + next;
  }

  //   console.log('next:::== ', url, next);

  return ''; //next === '/' ? '' : next;
};
