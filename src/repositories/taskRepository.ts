import Task, { ITask } from '../models/Task'; 
import { ITaskRepository } from '../domain/ITaskRepository';  
import { BaseMongoRepository } from './BaseRepository';

export class TaskRepository extends BaseMongoRepository<ITask> implements ITaskRepository {

  constructor() {
    super(Task);   
  }
  
}