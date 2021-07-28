import { Router } from 'express';
import { getProductDetails, getSearchProduct } from './controller';

const productRouter = Router();
productRouter.post('/products', getProductDetails);
productRouter.post('/products/search-items', getSearchProduct);
export default productRouter;
