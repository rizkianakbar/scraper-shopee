import { Request, Response, Router } from 'express';
import middlewares from '../middlewares';
import { Logger } from 'winston';
import { Container } from 'typedi';

const route = Router();

export default (app: Router) => {
  app.use('/category', route);

  route.get('/list', middlewares.getCategory, (req: Request, res: Response) => {
    try {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Category-List endpoint with body: %o', req.body);
      return res.status(200).end();
    } catch (err) {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Category-List endpoint with body: %o', req.body);
      logger.error('🔥 error %o', err);
    }
  });
};
