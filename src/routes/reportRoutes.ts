import { Router } from 'express';
import { getTaskReport } from '../controllers/reportController';

const router = Router();

router.get('/tasks', getTaskReport);

export default router;