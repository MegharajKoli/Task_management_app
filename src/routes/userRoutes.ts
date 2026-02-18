import { Router } from 'express';
import userController from '../controllers/userController';
import userServices from '../services/userServices';;
import { validate } from '../middlewares/validate';
import { createUserSchema } from '../schema/userschema';

const router = Router();
const userservice = new userServices();
const usercontroller = new userController(userservice);
router.post('/',validate({body : createUserSchema}), usercontroller.createUser);
router.get('/', usercontroller.getUsers);

export default router;