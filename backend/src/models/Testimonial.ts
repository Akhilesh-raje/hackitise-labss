import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  text: string;
  rating: number;
  color: string;
  published: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  color: { type: String, default: 'theme-primary' },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
