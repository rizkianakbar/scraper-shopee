import { Request, Response } from 'express';
import axios from 'axios';

const baseUrl: string = `https://shopee.co.id/api`;

/**
 * POST : Product Details
 *
 * @param url
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

/**
 * POST : Search Product
 *
 * @param keyword
 * @param limit
 * @returns
 */
export async function getSearchProduct(
	req: Request,
	res: Response
): Promise<void> {
	let { keyword, limit } = req.body;
	try {
		const response = await axios(
			`${baseUrl}/v4/search/search_items?by=relevancy&keyword=${keyword}&limit=${limit}&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`
		);
		res.json(response.data);
	} catch (error) {
		console.log(error);
	}
}
