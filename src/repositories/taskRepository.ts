
import { Model } from 'mongoose';
import Task, { ITask } from '../models/Task'; 
import { ITaskRepository } from '../domain/ITaskRepository';  

export class TaskRepository implements ITaskRepository {
  private  TaskModel: Model<ITask>;

  constructor() {
    this.TaskModel = Task;   
  }

  async create(TaskData: Partial<ITask>): Promise<ITask> {
    const Task = new this.TaskModel(TaskData);
    return Task.save();
  }
  async delete(taskId: string): Promise<boolean> {
  const result = await this.TaskModel.findByIdAndDelete(taskId).exec();
  return !!result;  
}

async update(taskId: string, updates: any): Promise<any> {
  const updated = await this.TaskModel
    .findByIdAndUpdate(
      taskId,
      { $set: updates },
      { new: true, runValidators: true }
    )
    .exec();

  return updated;  
}

  async findAll(): Promise<ITask[]> {
    return this.TaskModel.find().exec();
  }
  async findById(taskId: string): Promise<ITask | null> {
    return this.TaskModel.findById(taskId).exec();
}
}