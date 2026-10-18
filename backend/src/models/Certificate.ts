import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  certificateId: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  courseCode: string;
  batchId: string;
  issueDate: Date;
  expiryDate?: Date;
  instructorName: string;
  grade?: string;
  verificationHash: string;
  status: 'pending' | 'issued' | 'revoked';
  certificateUrl?: string;
  metadata: {
    duration: string;
    completionDate: Date;
    score?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>({
  certificateId: { type: String, required: true, unique: true, uppercase: true },
  studentName: { type: String, required: true, trim: true },
  studentEmail: { type: String, required: true, trim: true, lowercase: true },
  courseName: { type: String, required: true, trim: true },
  courseCode: { type: String, required: true, trim: true, uppercase: true },
  batchId: { type: String, required: true, trim: true, uppercase: true },
  issueDate: { type: Date, required: true, default: Date.now },
  expiryDate: { type: Date },
  instructorName: { type: String, required: true, trim: true },
  grade: { type: String, trim: true },
  verificationHash: { type: String, required: true },
  status: { type: String, enum: ['pending', 'issued', 'revoked'], default: 'issued' },
  certificateUrl: { type: String },
  metadata: {
    duration: { type: String, required: true },
    completionDate: { type: Date, required: true },
    score: { type: Number, min: 0, max: 100 },
  },
}, { timestamps: true });

// Index for fast verification lookups
CertificateSchema.index({ certificateId: 1 });
CertificateSchema.index({ studentEmail: 1 });

export default mongoose.model<ICertificate>('Certificate', CertificateSchema);
