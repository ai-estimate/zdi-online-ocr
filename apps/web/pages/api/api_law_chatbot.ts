import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';

const API_URL = 'http://api.nextspell.com/api_law_chatbot';

const fetchAPI = async (data: any, req: NextApiRequest) => {
  const {data: resp} = await axios({
    url: API_URL,
    method: 'POST',
    data,
    headers: {
      'Content-Type': req.headers['content-type'],
    },
  });
  return resp;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data = req.body;
    const result = await fetchAPI(data, req);
    return res.status(200).json(result);
  }
  res.status(405).end('Method not allowed');
}
