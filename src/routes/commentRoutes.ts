import { Router } from 'express';
import commentController from '../controllers/commentController';
import { validate } from "../middlewares/validate";
import { commentSchema, commentIdSchema } from '../schema/commentSchema';
import { commentservice } from '../containers/commentServiceContainer';

const router = Router();

const commentcontroller =  new commentController(commentservice);

router.post('/:taskId', validate({body:commentSchema }),commentcontroller.addComment);
router.get('/:taskId',commentcontroller.getCommentsByTask);
router.delete('/:commentId',validate({params:commentIdSchema}), commentcontroller.deleteComment);

export default router;