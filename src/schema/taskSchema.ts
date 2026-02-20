import { z } from "zod";
import { Priority , Status } from "../domain/taskEnums";

const taskBase = {
  title: z
    .string({ message: "Title is required" })
    .min(1, { message: "Title cannot be empty" })
    .trim(),

  description: z
    .string()
    .trim(),

  assigned_to: z
    .string({ message: "Assigned to is required" })
    .trim()
    .pipe(
    z.email({ message: "Assigned_to must be a valid email address" })
  ),

  priority: z.enum(Priority),

  status: z.enum(Status),
};



export const createTaskSchema = z
  .object({
    ...taskBase,       // required
    status: taskBase.status.default(Status.Open),  
  })
  .strict();

export const updateTaskSchema = z
  .object(taskBase)
  .partial()                                 // all fields optional
  .strict();


export const taskIdSchema = z.object({
  id: z
    .string({ message: "Task ID is required" })
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "Invalid task ID format — must be 24-character hexadecimal",
    })
    .trim(),
});