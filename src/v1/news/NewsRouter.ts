import { Router } from 'express';
import { getNews } from './NewsController';

const router = Router();

router.get('/:stock', getNews);

export default router;
