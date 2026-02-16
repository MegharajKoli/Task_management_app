import { Request, Response } from 'express';
import { z } from 'zod';
import User, { IUser } from '../models/User';

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  contact: z.string().min(1),
  password: z.string().min(6),
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const user = new User(validatedData);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const validatedData = userSchema.partial().parse(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, validatedData, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
};