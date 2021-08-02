import { Request, Response } from 'express';
import axios from 'axios';
import { Logger } from 'winston';
import { Container } from 'typedi';
import config from '../../config';

interface RequestBody {
  keyword: string;
  limit: number;
  url: string;
}

/**
 * POST : Product Details
 *
 * @param url
 * @returns
 */
async function getProductDetails(req: Request, res: Response): Promise<void> {
  const { url } = req.body as RequestBody;
  const data: string[] = url.split('.').splice(3, 3);
  const shopId: string = data[0];
  const itemId: string = data[1].split('').splice(0, 10).join('');

  try {
    const response = await axios(`${config.baseUrl}/v2/item/get?itemid=${itemId}&shopid=${shopId}`);
    res.json(response.data);
  } catch (error) {
    const logger: Logger = Container.get('logger');
    logger.error(error);
  }
}
export default getProductDetails;
