import FormData from 'form-data';
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';

const API_URL = 'http://api.nextspell.com/khmerocr_api';

import {NextApiRequest, NextApiResponse, PageConfig} from 'next';
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(404).end();
  const form = new formidable.IncomingForm();

  form.parse(req, async function (err, fields, files) {
    const file = files.file;
    const data = fs.createReadStream(file.filepath);
    let formData = new FormData();
    formData.append('file', data, file.originalFilename);
    const {data: resp} = await axios.post(API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    res.status(200).json(resp);
  });
}

export default handler;
