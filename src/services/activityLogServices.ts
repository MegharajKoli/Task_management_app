import {Types} from 'mongoose';
import { ActivityLogRepository } from "../repositories/activityLogRepository";

export class ActivityLogService {
    
      constructor( private repository: ActivityLogRepository) {
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
}
   