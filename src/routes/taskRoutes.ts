// src/routes/taskRoutes.ts
import { Router } from 'express';
import taskController from '../controllers/taskController';
import taskServices from '../services/taskServices';

const taskservice = new taskServices();
const taskcontroller = new taskController(taskservice);
const router = Router();

router.post('/', taskcontroller.createTask);
router.get('/', taskcontroller.getTasks);
router.put('/:id', taskcontroller.updateTask);
router.delete('/:id', taskcontroller.deleteTask);

export default router;