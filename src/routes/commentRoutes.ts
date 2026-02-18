import { Router } from 'express';
import commentController from '../controllers/commentController';
import commentServices from '../services/commentServices';
import { validate } from "../middlewares/validate";
import { commentSchema, commentIdSchema } from '../schema/commentSchema';
import { taskIdSchema } from '../schema/taskSchema';
import { ActivityLogService } from '../services/activityLogServices';

const router = Router();

const commentservices=new commentServices();
const activitylogservice=new ActivityLogService();
const commentcontroller =  new commentController(commentservices,activitylogservice);

router.post('/:taskId', validate({body:commentSchema ,params : taskIdSchema }),commentcontroller.addComment);
router.get('/:taskId',commentcontroller.getCommentsByTask);
router.delete('/:commentId',validate({params:commentIdSchema}), commentcontroller.deleteComment);

export default router;