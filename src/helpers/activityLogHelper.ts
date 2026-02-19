import {Types} from 'mongoose';
import { ActivityLogService } from '../services/activityLogServices';

export class ActivityLogHelper{
    constructor( private services:ActivityLogService) {
          }

  async taskCreated(taskId: string | Types.ObjectId  ): Promise<void> {
    await this.services.logAction(taskId, 'Task Created');
  }

  async taskUpdated(taskId: string | Types.ObjectId): Promise<void> {
    await this.services.logAction(taskId, 'Task Updated');
  }

  async taskDeleted(taskId: string | Types.ObjectId): Promise<void> {
    await this.services.logAction(taskId, 'Task Deleted');
  }

  async commentAdded(taskId: string | Types.ObjectId): Promise<void> {
    await this.services.logAction(taskId, 'Comment Added');
  }
}