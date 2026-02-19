import { TaskRepository} from '../repositories/taskRepository';
import { AppError } from '../middlewares/appError';
import { TaskAssignmentService } from '../helpers/taskAssignmentService';
import { TaskDomainService } from '../helpers/taskDomainService';
import { ActivityLogHelper } from '../helpers/activityLogHelper';
import { NotificationService } from './notification/notificationService';

export default class taskServices{

  constructor(
  private repository: TaskRepository,
  private assignmentService: TaskAssignmentService,
  private activitylog: ActivityLogHelper,
  private taskdomain:TaskDomainService,
  private notificationService: NotificationService) { 
  }
  
    async createNewTask(taskBody:any){
       const user = await this.assignmentService.resolveUser(taskBody.assigned_to);

        const task= await this.repository.create({
      ...taskBody,
      assigned_to: user._id,
      status: "Open",
      createdAt: new Date(),
    });
    await this.notificationService.sendTaskCreatedNotification(user.email,task.title);
    await this.activitylog.taskCreated(task._id);
    return task;
    }
    
   async delete(taskId: string) {
   const deleted = await this.repository.delete(taskId);
   if (!deleted) {
    throw new AppError("Task not found",404);
  }
  await this.activitylog.taskDeleted(taskId);
 }

async update(taskId: string, updates: any) {
    const existingTask = await this.getTaskOrThrow(taskId);

  if (updates.status) {
      await this.taskdomain.changeStatus(existingTask.status, updates.status);
    }

  if (updates.assigned_to) {
     const user = await this.assignmentService.resolveUser(updates.assigned_to);
    updates.assigned_to = user._id;
  }

  const updatedTask = await this.repository.update(taskId, updates);
   const user = await this.assignmentService.resolveUser(updates.assigned_to);
   
  await this.activitylog.taskUpdated(taskId);
  await this.notificationService.sendTaskUpdatedNotification(user.email,updatedTask.title)
  return updatedTask;
}

async fetchAllTask() {
  return this.repository.findAll();
}
private async getTaskOrThrow(taskId: string) {
    const task = await this.repository.findById(taskId);
    if (!task) throw new AppError("Task not found", 404);
    return task;
  }    
}