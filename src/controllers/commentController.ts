import { Request, Response } from "express";
import { z } from "zod";
import * as commentService from "../services/commentServices";

const commentSchema = z.object({
  content: z.string().min(1),
});

interface TaskParams {
  taskId: string;
}

export const addComment = async (req: Request<TaskParams>, res: Response) => {
  try {
    const validatedData = commentSchema.parse(req.body);

    const comment = await commentService.createComment(
      req.params.taskId,
      validatedData.content
    );

    res.status(201).json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export const getCommentsByTask = async (req: Request<TaskParams>, res: Response) => {
  try {
    const comments = await commentService.getCommentsByTaskId(
      req.params.taskId
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
