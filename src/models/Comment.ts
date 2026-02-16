import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
  task_id: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  task_id: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IComment>('Comment', commentSchema);