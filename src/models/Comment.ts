import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
  task_id: Types.ObjectId;
  content: string;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  task_id: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IComment>('Comment', commentSchema);