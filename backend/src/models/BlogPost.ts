import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  description: string;
  icon: string;
  color: string;
  slug: string;
  content?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'BookOpen' },
  color: { type: String, default: 'theme-primary' },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
