import ActivityLog from '../models/ActivityLog';
import {Types} from 'mongoose';

export class ActivityLogService {
    static async createTask(taskId: Types.ObjectId, action: string="Task Created") {
    try {
      await ActivityLog.create({
        task_id: taskId,
        action,
      });
    } catch (err) {
      console.error('Activity logging failed', err);
    }
  }
    static async updateTask(taskId: string , action: string="Task Updated") {
    try {
      await ActivityLog.create({
        task_id: taskId,
        action,
      });
    } catch (err) {
      console.error('Activity logging failed', err);
    }
  }
    static async deleteTask(taskId: string , action: string="Task deleted") {
    try {
      await ActivityLog.create({
        task_id: taskId,
        action,
      });
    } catch (err) {
      console.error('Activity logging failed', err);
    }
  }

  static async addComment(taskId: string , action: string="Comment Added") {
    try {
      await ActivityLog.create({
        task_id: taskId,
        action,
      });
    } catch (err) {
      console.error('Activity logging failed', err);
    }
  }
}