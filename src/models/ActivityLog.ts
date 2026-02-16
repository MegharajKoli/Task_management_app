import { Schema, model, Document } from 'mongoose';

export interface IActivityLog extends Document {
  task_id: Schema.Types.ObjectId;
  action: string;
}

const activityLogSchema = new Schema<IActivityLog>({
  task_id: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  action: { type: String, required: true },
}, { timestamps: true });

export default model<IActivityLog>('ActivityLog', activityLogSchema);