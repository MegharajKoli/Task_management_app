import { Schema, model, Document, Types } from 'mongoose';

export interface IActivityLog extends Document {
  task_id: Types.ObjectId;
  action: string;
}

const activityLogSchema = new Schema<IActivityLog>({
  task_id: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  action: { type: String, required: true },
}, { timestamps: true });

export default model<IActivityLog>('ActivityLog', activityLogSchema);