import { Router } from 'express';
import { addComment, getCommentsByTask } from '../controllers/commentController';

const router = Router();

router.post('/:taskId', addComment);
router.get('/:taskId', getCommentsByTask);

export default router;