import express from 'express';
import product from './routes/product';

export default () => {
  const app = express();
  product(app);

  return app;
};
