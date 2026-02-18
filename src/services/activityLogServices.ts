import {Types} from 'mongoose';
import { ActivityLogRepository } from "../repositories/activityLogRepository";

export class ActivityLogService {
     private repository: ActivityLogRepository;
    
      constructor() {
        this.repository = new ActivityLogRepository();
      }

  async logAction(taskId: Types.ObjectId | string, action: string) {
    try {
      await this.repository.create({
        task_id: new Types.ObjectId(taskId),
        action,
      });
    } catch (err) {
      console.error('Activity logging failed', err);
    }
  }
  async taskCreated(taskId: string | Types.ObjectId  ): Promise<void> {
    await this.logAction(taskId, 'Task Created');
  }

  async taskUpdated(taskId: string | Types.ObjectId): Promise<void> {
    await this.logAction(taskId, 'Task Updated');
  }

  async taskDeleted(taskId: string | Types.ObjectId): Promise<void> {
    await this.logAction(taskId, 'Task Deleted');
  }

  async commentAdded(taskId: string | Types.ObjectId): Promise<void> {
    await this.logAction(taskId, 'Comment Added');
  }
}
   