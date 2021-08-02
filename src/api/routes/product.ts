import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../middlewares';
import { Logger } from 'winston';
import { Container } from 'typedi';

const route = Router();

export default (app: Router) => {
  // app.use('/products', function (req, res, next) {
  //   console.log('Request Type:', req.method);
  //   next();
  // });
  app.use('/products', route);

  route.post('/details', middlewares.getProductDetails, (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).end();
    } catch (err) {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Product-Details endpoint with body: %o', req.body);
      logger.error('🔥 error %o', err);
      return next(err);
    }
  });

  route.post('/search', middlewares.getSearchItems, (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Search endpoint with body: %o', req.body);
    try {
      return res.status(200).end();
    } catch (err) {
      logger.error('🔥 error %o', err);
      return next(err);
    }
  });
};
