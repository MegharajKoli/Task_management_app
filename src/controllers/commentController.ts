import { Request, Response } from 'express';
import { z } from 'zod';
import Comment from '../models/Comment';

const commentSchema = z.object({
  content: z.string().min(1),
});

export const addComment = async (req: Request, res: Response) => {
  try {
    const validatedData = commentSchema.parse(req.body);
    const comment = new Comment({ task_id: req.params.taskId, ...validatedData });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCommentsByTask = async (req: Request, res: Response) => {
  const comments = await Comment.find({ task_id: req.params.taskId }).sort({ createdAt: -1 });
  res.json(comments);
};