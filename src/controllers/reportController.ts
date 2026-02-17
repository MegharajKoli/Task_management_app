import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTaskReport = async (req: Request, res: Response) => {
  const report = await Task.aggregate([
    {
      $group: {
        _id: { status: '$status', priority: '$priority' },
        count: { $sum: 1 },
      },
    },
    
  ]);
  res.json(report);
};