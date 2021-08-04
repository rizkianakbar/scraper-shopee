import { Request, Response } from 'express';
import axios from 'axios';
import { Logger } from 'winston';
import { Container } from 'typedi';
import config from '../../config';

/**
 * Get : Category
 *
 *
 * @returns
 */
async function getCategory(req: Request, res: Response): Promise<void> {
  try {
    const response = await axios(`${config.baseUrl}/v2/category_list/get`);
    res.json(response.data);
  } catch (error) {
    const logger: Logger = Container.get('logger');
    logger.error(error);
  }
}
export default getCategory;
