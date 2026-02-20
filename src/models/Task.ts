import { Schema, Types, model, Document } from 'mongoose';
import { Status, Priority } from '../domain/taskEnums';

export interface ITask extends Document {
  title: string;
  description: string;
  assigned_to: Types.ObjectId;
  priority: Priority;
  status: Status;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assigned_to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  priority: { type: String, enum: Object.values(Priority), required: true },
  status: { type: String, enum: Object.values(Status), default: Status.Open },
  createdAt: { type: Date, default: Date.now },
});

export default model<ITask>('Task', taskSchema);