import express from 'express';
import category from './routes/category';
import product from './routes/product';

export default () => {
  const app = express();
  product(app);
  category(app);
  return app;
};
