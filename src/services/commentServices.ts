import mongoose, {Types} from "mongoose";
import { CommentRepository } from "../repositories/commentRepository";
import { ActivityLogService } from "./activityLogServices";

export default class commentServices{
  private repository: CommentRepository;
  private activitylog: ActivityLogService;

    constructor() {
      this.repository = new CommentRepository();
      this.activitylog =new ActivityLogService();
    }

 createComment = async (taskId: string, content: string) => {
  const comment= await this.repository.create({
    task_id: new Types.ObjectId(taskId),
    content,
  });
  this.activitylog.commentAdded(taskId);
  return comment;
};

 getCommentsByTaskId = async (taskId: string) => {
  return await this.repository.findAll({
    task_id: new mongoose.Types.ObjectId(taskId),
  });
};

 deleteCommentById =async (commentId: string) => {
        const deleted = await this.repository.delete(commentId);
        return deleted;
    };
  }
