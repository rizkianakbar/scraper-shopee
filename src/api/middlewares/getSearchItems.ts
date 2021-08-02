import { Request, Response } from 'express';
import axios from 'axios';
import config from '../../config';
import { Logger } from 'winston';
import { Container } from 'typedi';
/**
 * POST : Search Product
 *
 * @param keyword
 * @param limit
 * @returns
 */

interface RequestBody {
  keyword: string;
  limit: number;
  url: string;
}

async function getSearchItems(req: Request, res: Response): Promise<void> {
  const { keyword, limit } = req.body as RequestBody;

  const searchUrl = `/v4/search/search_items?by=relevancy&keyword=${keyword}&limit=${limit}&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`;
  try {
    const response = await axios(`${config.baseUrl}${searchUrl}`);
    res.json(response.data);
  } catch (error) {
    const logger: Logger = Container.get('logger');
    logger.error(error);
  }
}
export default getSearchItems;
