import logger from "../../shared/Logger";
import { Request, Response } from "express";
import axios from "axios";

interface RequestBody {
  keyword: string;
  limit: number;
  url: string;
}
const baseUrl = `https://shopee.co.id/api`;

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
  const { url } = req.body as RequestBody;
  const data: string[] = url.split(".").splice(3, 3);
  const shopId: string = data[0];
  const itemId: string = data[1].split("").splice(0, 10).join("");

  try {
    const response = await axios(
      `${baseUrl}/v2/item/get?itemid=${itemId}&shopid=${shopId}`
    );
    res.json(response.data);
  } catch (error) {
    logger.info(error);
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
  const { keyword, limit } = req.body as RequestBody;

  const searchUrl = `/v4/search/search_items?by=relevancy&keyword=${keyword}&limit=${limit}&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`;
  try {
    const response = await axios(`${baseUrl}${searchUrl}`);
    res.json(response.data);
  } catch (error) {
    logger.info(error);
  }
}
