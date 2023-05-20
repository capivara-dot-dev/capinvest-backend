import { Router } from 'express';
import { getStock } from './StocksController';

const router = Router();

router.use('/:stock', getStock);

export default router;
