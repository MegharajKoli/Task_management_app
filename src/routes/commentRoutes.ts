import { Router } from 'express';
import commentController from '../controllers/commentController';
import commentServices from '../services/commentServices';

const router = Router();

const commentservices=new commentServices();
const commentcontroller =  new commentController(commentservices);
router.post('/:taskId', commentcontroller.addComment);
router.get('/:taskId', commentcontroller.getCommentsByTask);
router.delete('/:commentId',commentcontroller.deleteComment);

export default router;