import { ActivityLogHelper } from "../helpers/activityLogHelper";
import { ActivityLogRepository } from "../repositories/activityLogRepository";
import { CommentRepository } from "../repositories/commentRepository";
import { ActivityLogService } from "../services/activityLogServices";
import commentServices from "../services/commentServices";

const activityrepository=new ActivityLogRepository();
const activitylogservice=new ActivityLogService(activityrepository);
const activitylog=new ActivityLogHelper(activitylogservice);
const commentrepository=new CommentRepository();
export const commentservice=new commentServices(commentrepository,activitylog);