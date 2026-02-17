import { Request, Response } from "express";
import { z } from "zod";
import commentServices from "../services/commentServices";
import { asyncHandler } from '../middlewares/asyncHandlers';

const commentSchema = z.object({
  content: z.string().min(1),
});

interface TaskParams {
  taskId: string;
}
interface CommentParams {
  commentId: string;
}

export default class commentController{
    constructor(private commentservices: commentServices){}

 addComment = asyncHandler<TaskParams>(async (req: Request<TaskParams>, res: Response)  => {

    const validatedData = commentSchema.parse(req.body);

    const comment = await this.commentservices.createComment(
      req.params.taskId,
      validatedData.content
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