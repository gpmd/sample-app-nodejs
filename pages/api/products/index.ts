import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';

export default async function products(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { accessToken, storeHash } = await getSession(req);
        const bigcommerce = bigcommerceClient(accessToken, storeHash);

        // const { data } = await bigcommerce.get('/catalog/summary');
        const response = await bigcommerce.get('/catalog/products');
        res.status(200).json(response);
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }
}
