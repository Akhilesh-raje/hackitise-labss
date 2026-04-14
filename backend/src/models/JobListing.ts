import mongoose, { Schema, Document } from 'mongoose';

export interface IJobListing extends Document {
  title: string;
  location: string;
  type: string;
  skills: string[];
  color: string;
  published: boolean;
  order: number;
  createdAt: Date;
}

const JobListingSchema = new Schema<IJobListing>({
  title: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  skills: [{ type: String, trim: true }],
  color: { type: String, default: 'primary' },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IJobListing>('JobListing', JobListingSchema);
