import { Types } from 'mongoose';
import { UpdateTaskDto } from '../dtos/taskDTO/updateTaskDTO';
import { ITask } from '../models/Task';

export class TaskMapper {
  static toPersistence(
    updates: UpdateTaskDto,
    resolvedId?: string
  ): Partial<ITask> {
    const persistenceModel: Partial<ITask> = {};

    if (updates.title) {
      persistenceModel.title = updates.title;
    }

    if (updates.description) {
      persistenceModel.description = updates.description;
    }

    if (updates.priority ) {
      persistenceModel.priority = updates.priority;
    }

    if (updates.status) {
      persistenceModel.status = updates.status;
    }

    if (resolvedId) {
      persistenceModel.assigned_to = new Types.ObjectId(resolvedId);
    }

    return persistenceModel;
  }
}