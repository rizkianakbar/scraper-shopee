import { Request, Response } from 'express';
import axios from 'axios';

const baseUrl: string = `https://shopee.co.id/api`;

/**
 * GET Product Details
 *            shopId = 120033763 , 121394730
 *            itemId = 6235683454 , 2795513363
 * @param req
 * @param res
 * @returns
 */
export async function getProductDetails(
	req: Request,
	res: Response
): Promise<void> {
	const { url } = req.body;
	const data = url.split('.').splice(3, 3);
	const shopId = data[0];
	const itemId = data[1].split('').splice(0, 10).join('');

	try {
		const response = await axios(
			`${baseUrl}/v2/item/get?itemid=${itemId}&shopid=${shopId}`
		);
		res.json(response.data);
	} catch (error) {
		console.log(error);
	}
}
