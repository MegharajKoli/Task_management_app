import { Router } from 'express';
import userController from '../controllers/userController';
import userServices from '../services/userServices';

const router = Router();
const userservice = new userServices();
const usercontroller = new userController(userservice);
router.post('/', usercontroller.createUser);
router.get('/', usercontroller.getUsers);

export default router;