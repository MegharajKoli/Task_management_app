import mongoose, {Types} from "mongoose";
import { CommentRepository } from "../repositories/commentRepository";
import { ActivityLogHelper } from "../helpers/activityLogHelper";

export default class commentServices{

    constructor(
      private repository: CommentRepository,
      private activitylog: ActivityLogHelper) {
    }

 createComment = async (taskId: string, content: string) => {
  const comment= await this.repository.create({
    task_id: new Types.ObjectId(taskId),
    content,
  });
  await this.activitylog.commentAdded(taskId);
  return comment;
};

 getCommentsByTaskId = async (taskId: string) => {
  return await this.repository.findByTaskId({
    task_id: new mongoose.Types.ObjectId(taskId),
  });
};

 deleteCommentById =async (commentId: string) => {
        const deleted = await this.repository.delete(commentId);
        return deleted;
    };
  }
