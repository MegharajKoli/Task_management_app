import { Request, Response } from 'express';
import { z } from 'zod';
import Task, { Priority, Status, ITask } from '../models/Task';
import ActivityLog from '../models/ActivityLog';
import User from '../models/User';
import { sendNotification } from '../utils/notification';

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  assigned_to: z.string().refine((val) => val.match(/^[0-9a-fA-F]{24}$/), { message: 'Invalid ObjectId' }),
  priority: z.enum([Priority.Low, Priority.Medium, Priority.High]),
  status: z.enum([Status.Open, Status.InProgress, Status.Done]).optional(),
});

const statusOrder = [Status.Open, Status.InProgress, Status.Done];

export const createTask = async (req: Request, res: Response) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    const task = new Task(validatedData);
    await task.save();

    // Log activity
    await new ActivityLog({ task_id: task._id, action: 'Task created' }).save();

    // Notification
    const user = await User.findById(task.assigned_to);
    if (user) {
      sendNotification(user.name, task.title, 'assigned');
    }

    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find().populate('assigned_to', 'name email');
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id).populate('assigned_to', 'name email');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const validatedData = taskSchema.partial().parse(req.body);
    const existingTask = await Task.findById(req.params.id);
    if (!existingTask) return res.status(404).json({ message: 'Task not found' });

    // Validate status transition
    if (validatedData.status) {
      const currentIndex = statusOrder.indexOf(existingTask.status);
      const newIndex = statusOrder.indexOf(validatedData.status);
      if (newIndex <= currentIndex) {
        return res.status(400).json({ message: 'Invalid status transition. Can only move forward.' });
      }
    }

    // Check for changes
    let action = '';
    if (validatedData.status && validatedData.status !== existingTask.status) {
      action += `Status changed to ${validatedData.status}. `;
    }
    if (validatedData.priority && validatedData.priority !== existingTask.priority) {
      action += `Priority changed to ${validatedData.priority}. `;
    }
    if (validatedData.assigned_to && validatedData.assigned_to !== existingTask.assigned_to.toString()) {
      const user = await User.findById(validatedData.assigned_to);
      if (user) {
        sendNotification(user.name, existingTask.title, 'assigned');
      }
    }

    const task = await Task.findByIdAndUpdate(req.params.id, validatedData, { new: true }).populate('assigned_to', 'name email');

    // Log activity if changed
    if (action) {
      await new ActivityLog({ task_id: task!._id, action: action.trim() }).save();
    }

    // Notification if completed
    if (validatedData.status === Status.Done) {
      const user = await User.findById(existingTask.assigned_to);
      if (user) {
        sendNotification(user.name, existingTask.title, 'completed');
      }
    }

    res.json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  // Also delete related logs and comments (optional, but for cleanup)
  await ActivityLog.deleteMany({ task_id: task._id });
  await Comment.deleteMany({ task_id: task._id });
  res.json({ message: 'Task deleted' });
};