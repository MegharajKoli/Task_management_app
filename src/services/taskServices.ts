import { TaskRepository} from '../repositories/taskRepository';
import { ActivityLogService } from './activityLogServices';
import { AppError } from '../middlewares/appError';
import { TaskStatusRules } from '../domain/taskStatusRules';
import userServices from "./userServices"

export default class taskServices{
   private repository: TaskRepository;
   private activitylog: ActivityLogService;
   private userservice: userServices;

  constructor() {
    this.repository = new TaskRepository();
    this.activitylog =new ActivityLogService();
    this.userservice=new userServices();
  }
  
    async createNewTask(taskBody:any){
       const user = await this.userservice.getValidUserByEmail(taskBody.assigned_to);

        const task= await this.repository.create({
      ...taskBody,
      assigned_to: user._id,
      status: "Open",
      createdAt: new Date(),
    });
     this.activitylog.taskCreated(task._id);
    return task;
    }
    
   async delete(taskId: string) {
   const deleted = await this.repository.delete(taskId);
   this.activitylog.taskDeleted(taskId);
   if (!deleted) {
    throw new AppError("Task not found",404);
  }
 }

async update(taskId: string, updates: any) {
    const existingTask = await this.repository.findById(taskId);

  if (!existingTask) {
    throw new AppError("Task not found", 404);
  }
  if (updates.status) {
      TaskStatusRules.validate(existingTask.status, updates.status);
    }

  if (updates.assigned_to) {
    const user = await this.userservice.getValidUserByEmail(updates.assigned_to);
    updates.assigned_to = user._id;
  }

  const updatedTask = await this.repository.update(taskId, updates);
  
  if (!updatedTask) {
    throw new AppError("Task not found",404);
  }
  this.activitylog.taskUpdated(taskId);
  return updatedTask;
}

async fetchAllTask() {
  return this.repository.findAll();
}    
}