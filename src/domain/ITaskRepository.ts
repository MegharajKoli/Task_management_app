import {ITask} from "../models/Task"
export interface ITaskRepository {

  create(TaskData: Partial<ITask>): Promise<ITask>;
  delete(taskId: string): Promise<boolean>;
  update(taskId: string, updates: Partial<ITask>): Promise<ITask | null>;
  findAll(): Promise<ITask[]>;
  findById(taskId: string): Promise<ITask | null>;
}