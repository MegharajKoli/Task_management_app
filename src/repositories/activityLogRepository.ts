import { Model } from 'mongoose';
import ActivityLog, {IActivityLog } from '../models/ActivityLog'; 
import { IActivityLogRepository } from '../domain/IActivityLogRepository';

export class ActivityLogRepository implements IActivityLogRepository {
  private activitymodel: Model<IActivityLog>;

  constructor() {
    this.activitymodel = ActivityLog;
  }

  async create(logData: Partial<IActivityLog>): Promise<IActivityLog> {
    const log = new this.activitymodel(logData);
    return log.save();
  }
}