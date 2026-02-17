import mongoose from "mongoose";
import Comment from "../models/Comment";

export const createComment = async (taskId: string, content: string) => {
  const comment = new Comment({
    task_id: new mongoose.Types.ObjectId(taskId),
    content,
  });

  return await comment.save();
};

export const getCommentsByTaskId = async (taskId: string) => {
  return await Comment.find()
  .where("task_id")
  .equals(taskId);
};
