import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  name: string;
  email: string;
  resumePath?: string;
  message?: string;
  role?: string;
  status: 'new' | 'reviewed' | 'contacted' | 'rejected';
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  resumePath: { type: String },
  message: { type: String },
  role: { type: String, trim: true },
  status: { type: String, enum: ['new', 'reviewed', 'contacted', 'rejected'], default: 'new' },
}, { timestamps: true });

export default mongoose.model<IApplication>('Application', ApplicationSchema);
