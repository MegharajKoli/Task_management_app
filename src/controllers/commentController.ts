import { Request, Response } from "express";
import commentServices from "../services/commentServices";
import { asyncHandler } from '../middlewares/asyncHandlers';

interface TaskParams {
  taskId: string;
}

interface CommentParams {
  commentId: string;
}

export default class commentController{
    constructor(private commentservices: commentServices){}

    addComment = asyncHandler<TaskParams>(async (req: Request<TaskParams>, res: Response)  => {
    const {content}= req.body;
    const taskId = req.params.taskId;
    const comment = await this.commentservices.createComment(
      taskId,
      content
    )
    res.status(201).json(comment);
    
  });

 getCommentsByTask = asyncHandler<TaskParams>(async (req: Request<TaskParams>, res: Response) => {
  
    const comments = await this.commentservices.getCommentsByTaskId(
      req.params.taskId
    );
    res.json(comments);

});

 deleteComment = asyncHandler<CommentParams>(async (req: Request<CommentParams>, res: Response) => {
            await this.commentservices.deleteCommentById(req.params.commentId);
            res.send({ message: "Deleted" });
        
    });
}