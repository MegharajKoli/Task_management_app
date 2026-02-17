import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import commentRoutes from './routes/commentRoutes';
import reportRoutes from './routes/reportRoutes';
import type { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";

dotenv.config();


const app = express();
app.use(express.json());

// Connect to DB
connectDB();

app.use('/users', userRoutes);
app.use('/reports',reportRoutes);
app.use('/tasks',taskRoutes);
app.use('/comments',commentRoutes);

// Global error handler (must have 4 parameters)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // ← or use your logger

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Optional: handle Zod errors nicely
  if (err instanceof z.ZodError) {
    return res.status(400).json({ errors: err.issues });
  }

  res.status(status).json({
    error: message,
    stack: err.stack,   // ← only in development!
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});