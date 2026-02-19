import { Router } from 'express';
import userController from '../controllers/userController';
import { validate } from '../middlewares/validate';
import { createUserSchema } from '../schema/userschema';
import { userservice } from '../containers/userServiceContainer';
const router = Router();

const usercontroller = new userController(userservice);
router.post('/',validate({body : createUserSchema}), usercontroller.createUser);
router.get('/', usercontroller.getUsers);

export default router;