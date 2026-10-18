import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificateRequest extends Document {
  name: string;
  email: string;
  phone?: string;
  courseName: string;
  batchId: string;
  completionDate?: Date;
  message?: string;
  status: 'new' | 'under_review' | 'approved' | 'rejected';
  rejectionReason?: string;
  linkedCertificateId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateRequestSchema = new Schema<ICertificateRequest>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  courseName: { type: String, required: true, trim: true },
  batchId: { type: String, required: true, trim: true, uppercase: true },
  completionDate: { type: Date },
  message: { type: String },
  status: { type: String, enum: ['new', 'under_review', 'approved', 'rejected'], default: 'new' },
  rejectionReason: { type: String },
  linkedCertificateId: { type: String },
}, { timestamps: true });

export default mongoose.model<ICertificateRequest>('CertificateRequest', CertificateRequestSchema);
