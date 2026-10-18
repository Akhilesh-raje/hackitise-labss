import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificationProgram extends Document {
  title: string;
  code: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  price: number;
  currency: string;
  validityPeriod?: number;
  color: string;
  icon: string;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationProgramSchema = new Schema<ICertificationProgram>({
  title: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  skills: [{ type: String, trim: true }],
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'INR' },
  validityPeriod: { type: Number },
  color: { type: String, default: 'primary' },
  icon: { type: String, default: 'Award' },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<ICertificationProgram>('CertificationProgram', CertificationProgramSchema);
