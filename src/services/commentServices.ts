import mongoose, {Types} from "mongoose";
import { CommentRepository } from "../repositories/commentRepository";
import { ActivityLogService } from "./activityLogServices";

export default class commentServices{
  private repository: CommentRepository;
  
    constructor() {
      this.repository = new CommentRepository();
    }


  createComment = async (taskId: string, content: string) => {
  const comment= await this.repository.create({
    task_id: new Types.ObjectId(taskId),
    content,
  });
  ActivityLogService.addComment(taskId);
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
