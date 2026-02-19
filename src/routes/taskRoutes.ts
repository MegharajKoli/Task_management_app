import { Router } from 'express';
import taskController from '../controllers/taskController';
import { validate } from "../middlewares/validate";
import {createTaskSchema,updateTaskSchema,taskIdSchema} from "../schema/taskSchema";
import { taskservice } from '../containers/taskServiceContainer';

const taskcontroller = new taskController(taskservice);
const router = Router();

router.post('/',validate({ body: createTaskSchema }), taskcontroller.createTask);
router.get('/', taskcontroller.getTasks);
router.put('/:id', validate({ body : updateTaskSchema , params: taskIdSchema }), taskcontroller.updateTask);
router.delete('/:id', validate({ params: taskIdSchema }),taskcontroller.deleteTask);

export default router;