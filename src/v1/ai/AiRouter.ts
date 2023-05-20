// Packaged imports
import { Router } from 'express';

// Files imports
import { makePred } from './AiController';

const router = Router();

router.post('/prediction', makePred);

export default router;
