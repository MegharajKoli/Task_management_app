import { TaskRepository} from '../repositories/taskRepository';
import { AppError } from '../middlewares/appError';
import { TaskAssignmentService } from '../helpers/taskAssignmentService';
import { TaskDomainService } from '../helpers/taskDomainService';
import { ActivityLogHelper } from '../helpers/activityLogHelper';
import { NotificationHelper } from '../helpers/notificationHelper';
import { CreateTaskDto } from '../dtos/taskDTO/createTaskDTO';
import { Status } from '../domain/taskEnums';
import { UpdateTaskDto } from '../dtos/taskDTO/updateTaskDTO';
import { TaskMapper } from '../helpers/mapperUtility';

export default class taskServices{

  constructor(
  private repository: TaskRepository,
  private assignmentService: TaskAssignmentService,
  private activitylog: ActivityLogHelper,
  private taskdomain:TaskDomainService,
  private notification:NotificationHelper) { 
  }
  
    async createNewTask(taskBody: CreateTaskDto){
       const user = await this.assignmentService.resolveUser(taskBody.assigned_to);

        const task= await this.repository.create({
      ...taskBody,
      assigned_to: user._id,
      status: Status.Open,
      createdAt: new Date(),
    });
    await Promise.all([
      this.notification.taskCreated(user, task),
      this.activitylog.taskCreated(task._id)
    ]);
    return task;
    }
    
   async delete(taskId: string) {
   const deleted = await this.repository.delete(taskId);
   if (!deleted) {
    throw new AppError("Task not found",404);
  }
  await this.activitylog.taskDeleted(taskId);
 }

async update(taskId: string, updates: UpdateTaskDto) {
    const existingTask = await this.getTaskOrThrow(taskId);

  if (updates.status) {
      await this.taskdomain.changeStatus(existingTask.status, updates.status);
    }
  
    let resolvedUserId: string | undefined;
    let user;
  if (updates.assigned_to) {
     user = await this.assignmentService.resolveUser(updates.assigned_to);
    resolvedUserId = user._id.toString(); 
  }

  const persistenceData = TaskMapper.toPersistence(updates, resolvedUserId);
  const updatedTask= await this.repository.update(taskId, persistenceData);

  await this.activitylog.taskUpdated(taskId);
   if (user) {
    await this.notification.taskUpdated(user, updatedTask);
  }
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