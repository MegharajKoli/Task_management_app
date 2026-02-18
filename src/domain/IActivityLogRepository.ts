import  {IActivityLog } from '../models/ActivityLog'; 

export interface IActivityLogRepository {
  create(logData: Partial<IActivityLog>): Promise<IActivityLog>;
}
