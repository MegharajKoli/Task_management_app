import { Model } from 'mongoose';
import ActivityLog, {IActivityLog } from '../models/ActivityLog'; 
import { IActivityLogRepository } from '../domain/IActivityLogRepository';
import { BaseMongoRepository } from './BaseRepository';

export class ActivityLogRepository extends BaseMongoRepository<IActivityLog> implements IActivityLogRepository {
  constructor() {
      super(ActivityLog);   
    }
}