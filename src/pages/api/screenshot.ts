import type { NextApiRequest, NextApiResponse } from 'next'
import { getScreenshot } from '../../../infra/getScreenshot';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const url = 
    query.url !== undefined ?
      typeof query.url === 'string' ?
        query.url :
        query.url[0]
    : 'https://github.com/arimariojesus';

  try {
    if (url && isValidUrl(url)) {
      const file = await getScreenshot(url);

      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(file);
    } else {
      throw "Please provide a valid url"
    }
  } catch (error) {
    res.status(500).end({ status: 'Failed', error });
  }
}

function isValidUrl(url: string) {
  console.log(url);
  try {
    new URL(url);
  } catch (error) {
    return false;
  }

  return true;
}
