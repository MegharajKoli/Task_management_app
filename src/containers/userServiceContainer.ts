import userServices from '../services/userServices';
import { UserRepository } from '../repositories/userRepository';
import { NotificationHelper } from '../helpers/notificationHelper';
import { notificationService } from './notificationServiceContainer';

const repository=new UserRepository();
const notificationhelper=new NotificationHelper(notificationService);
export const userservice = new userServices(repository,notificationhelper);