// Packages imports
import { Router } from 'express';

// Files imports
import NewsRouter from './news/NewsRouter';
import StocksRouter from './stocks/StocksRouter';
import AiRouter from './ai/AiRouter';

const routes = Router();

routes.use('/news', NewsRouter);
routes.use('/stocks', StocksRouter);
routes.use('/ai', AiRouter);

export default routes;
