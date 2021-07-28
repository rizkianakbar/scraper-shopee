import { Router } from 'express';
import { getProductDetails } from './controller';

const productRouter = Router();
productRouter.post('/products', getProductDetails);

export default productRouter;
