import userServices from '../services/userServices';
import { UserRepository } from '../repositories/userRepository';
import { NotificationService } from '../services/notification/notificationService';

const repository=new UserRepository();
const notification=new NotificationService
export const userservice = new userServices(repository,notification);