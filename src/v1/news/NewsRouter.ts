import { Router } from 'express';
import { getNews } from './NewsController';

const router = Router();

router.use('/:stock', getNews);

export default router;
