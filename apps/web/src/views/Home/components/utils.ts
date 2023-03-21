import axios from 'axios';
import {setItemToLocalStorage} from 'src/components/LocalStorege';

const CancelToken = axios.CancelToken;
let source: any;
export const nextSpellAPI = async (data: any) => {
  if (source) source?.cancel('Operation canceled by the user.');
  source = CancelToken.source();
  try {
    console.log('data:::', data);
    let formData = new FormData();
    formData.append('file', data);
    const resp = await axios.post('/api/khmerocr_api', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      // cancelToken: source.token,
    });
    const _id = generate6RandomId();
    if (resp.status === 200) {
      const {data} = resp;
      setItemToLocalStorage('docs', {
        id: _id,
        title: _id,
        content: data?.message,
      });
    }
    console.log('resp:::', resp);

    return _id;
  } catch (error) {
    return null;
  }
};

export const generate6RandomId = () => {
  return Math.random().toString(36).substr(2, 6);
};
