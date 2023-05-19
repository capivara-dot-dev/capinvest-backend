import { Router } from 'express';
import NewsRouter from './news/NewsRouter';

const routes = Router();

routes.use('/news', NewsRouter);

export default routes;
