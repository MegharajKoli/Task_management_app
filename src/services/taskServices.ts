import User from '../models/User';
import { TaskRepository} from '../repositories/taskRepository';
import { ActivityLogService } from './activityLogServices';
import { AppError } from '../middlewares/appError';


export default class taskServices{
   private repository: TaskRepository;

  constructor() {
    this.repository = new TaskRepository();
  }
  
    async createNewTask(taskBody:any){
        const user = await User.findOne({ email: taskBody.assigned_to });
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

         const task= await this.repository.create({
      ...taskBody,
      assigned_to: user._id,
      status: "Open",
      createdAt: new Date(),
    });
     ActivityLogService.createTask(task._id);
    return task;
    }
    
   async delete(taskId: string) {
   const deleted = await this.repository.delete(taskId);
   ActivityLogService.deleteTask(taskId);
  
  if (!deleted) {
    throw new Error("Task not found");
  }
}

async update(taskId: string, updates: any) {
    const existingTask = await this.repository.findById(taskId);

  if (!existingTask) {
    throw new AppError("Task not found", 404);
  }

  if (updates.assigned_to) {
    const user = await User.findOne({ email: updates.assigned_to });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    updates.assigned_to = user._id;
  }

  if (updates.status) {
    const currentStatus = existingTask.status;
    const newStatus = updates.status;

    const validTransitions: Record<string, string[]> = {
      Open: ["In Progress"],
      "In Progress": ["Done"],
      Done: [],
    };

    if (
      !validTransitions[currentStatus] ||
      !validTransitions[currentStatus].includes(newStatus)
    ) {
      throw new Error(
        `Invalid status transition: ${currentStatus} → ${newStatus}`
      );
    }
  }
  const updatedTask = await this.repository.update(taskId, updates);
  
  if (!updatedTask) {
    throw new Error("Task not found");
  }
  ActivityLogService.updateTask(taskId);
  return updatedTask;
}

async fetchAllTask() {
  return this.repository.findAll();
}
    
}