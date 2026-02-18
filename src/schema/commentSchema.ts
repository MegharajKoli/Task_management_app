import { z } from "zod";

export const commentSchema = z.object({
  content: z.string({ message: "Content is required" }).min(1),
});

export const commentIdSchema = z.object({
  commentId: z
    .string({ message: "Comment ID is required" })
    .regex(/^[0-9a-fA-F]{24}$/i, "Invalid comment ID format (24 hex chars expected)"),
});
