import { Router } from 'express';
import NewsRouter from './news/NewsRouter';
import StocksRouter from './stocks/StocksRouter';

const routes = Router();

routes.use('/news', NewsRouter);
routes.use('/stocks', StocksRouter);

export default routes;
