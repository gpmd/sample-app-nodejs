import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';

export default async function widgetList(req: NextApiRequest, res: NextApiResponse) {
  try {
      const { accessToken, storeHash } = await getSession(req);
      const bigcommerce = bigcommerceClient(accessToken, storeHash);
      // Optional: pass in API params here
      const params = [
          'limit=10',
      ].join('&');

      const { data } = await bigcommerce.get(`/content/widgets?${params}`);
      res.status(200).json(data);
      console.log(data);
  } catch (error) {
      const { message, response } = error;
      res.status(response?.status || 500).json({ message });
  }
}
