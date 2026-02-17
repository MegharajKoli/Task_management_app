import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import commentRoutes from './routes/commentRoutes';
import reportRoutes from './routes/reportRoutes';

dotenv.config();


const app = express();
app.use(express.json());

// Connect to DB
connectDB();

app.use('/users', userRoutes);
app.use('/reports',reportRoutes);
app.use('/tasks',taskRoutes);
app.use('/comments',commentRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});