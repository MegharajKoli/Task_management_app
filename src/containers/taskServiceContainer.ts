import { TaskAssignmentService } from '../helpers/taskAssignmentService';
import { TaskRepository } from '../repositories/taskRepository';
import { ActivityLogService } from '../services/activityLogServices';
import userServices from '../services/userServices';
import { TaskDomainService } from '../helpers/taskDomainService';
import taskServices from '../services/taskServices';
import { UserRepository } from '../repositories/userRepository';
import { ActivityLogRepository } from '../repositories/activityLogRepository';
import { ActivityLogHelper } from '../helpers/activityLogHelper';
import { NotificationService } from '../services/notification/notificationService';

const activityrepository=new ActivityLogRepository();
const userrepository=new UserRepository();
const notification=new NotificationService();
const assignment=new TaskAssignmentService(userrepository);
const repository=new TaskRepository();
const activitylogservice=new ActivityLogService(activityrepository);
const activitylog=new ActivityLogHelper(activitylogservice);
const taskdomain=new TaskDomainService();

export const taskservice = new taskServices(repository,assignment,activitylog,taskdomain,notification);