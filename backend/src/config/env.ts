import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  PORT: parseInt(process.env.PORT || '4000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/hackitise',
  JWT_SECRET: process.env.JWT_SECRET || 'hackitise-dev-secret-change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',

  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'info@hackitiselabs.in',
  HR_EMAIL: process.env.HR_EMAIL || 'Hr@hackitiselabs.in',

  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};
