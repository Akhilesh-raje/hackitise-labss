import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudy extends Document {
  title: string;
  problem: string;
  action: string;
  result: string;
  icon: string;
  color: string;
  published: boolean;
  order: number;
  createdAt: Date;
}

const CaseStudySchema = new Schema<ICaseStudy>({
  title: { type: String, required: true, trim: true },
  problem: { type: String, required: true },
  action: { type: String, required: true },
  result: { type: String, required: true },
  icon: { type: String, default: 'Building2' },
  color: { type: String, default: 'primary' },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
