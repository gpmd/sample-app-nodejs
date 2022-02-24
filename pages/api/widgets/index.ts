import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';

export default async function widgets(req: NextApiRequest, res: NextApiResponse) {
  try {
      // First, retrieve the session by calling:
      const { accessToken, storeHash } = await getSession(req);
      // Then, connect the Node API client (to make API calls to BigCommerce)
      const bigcommerce = bigcommerceClient(accessToken, storeHash);
      // For this example, we'll be connecting to the Catalog API
      const { data } = await bigcommerce.get('/content/widgets');
      res.status(200).json(data);
      // Finally, handle errors
  } catch (error) {
      const { message, response } = error;
      res.status(response?.status || 500).json({ message });
  }
}
