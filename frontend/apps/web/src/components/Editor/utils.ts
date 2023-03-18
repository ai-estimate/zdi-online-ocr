import axios from 'axios';

const CancelToken = axios.CancelToken;
let source: any;
export const nextSpellAPI = async (data: any) => {
  if (source) source?.cancel('Operation canceled by the user.');
  source = CancelToken.source();
  try {
    const {data: resp} = await axios.post(
      'http://api.nextspell.com/api_spellcheck',
      {data},
      {
        headers: {'Content-Type': 'multipart/form-data'},
        cancelToken: source.token,
      },
    );
    return resp;
  } catch (error) {
    return null;
  }
};
