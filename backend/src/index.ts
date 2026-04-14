import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

// Route imports
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import applicationRoutes from './routes/applications.js';
import blogRoutes from './routes/blog.js';
import testimonialRoutes from './routes/testimonials.js';
import jobRoutes from './routes/jobs.js';
import faqRoutes from './routes/faqs.js';
import caseStudyRoutes from './routes/caseStudies.js';

const app = express();

// ──────────────────────────────────────────────────────────
// MIDDLEWARE
// ──────────────────────────────────────────────────────────

// Security headers
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

// CORS
app.use(cors({
  origin: ENV.NODE_ENV === 'production'
    ? [ENV.FRONTEND_URL]
    : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Stricter rate limit for form submissions
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 submissions per hour per IP
  message: { success: false, message: 'Too many submissions. Please try again later.' },
});

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure uploads directory exists
const uploadsDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// ──────────────────────────────────────────────────────────
// HEALTH CHECK
// ──────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: ENV.NODE_ENV,
    uptime: process.uptime(),
  });
});

// ──────────────────────────────────────────────────────────
// API ROUTES
// ──────────────────────────────────────────────────────────
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/faqs', faqRoutes);
app.use('/api/v1/case-studies', caseStudyRoutes);

// ──────────────────────────────────────────────────────────
// SERVE FRONTEND IN PRODUCTION
// ──────────────────────────────────────────────────────────
if (ENV.NODE_ENV === 'production') {
  const frontendBuild = path.resolve(__dirname, '../../frontend/dist');
  app.use(express.static(frontendBuild));

  // SPA fallback — serve index.html for all non-API routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendBuild, 'index.html'));
  });
}

// ──────────────────────────────────────────────────────────
// GLOBAL ERROR HANDLER
// ──────────────────────────────────────────────────────────
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('❌ Unhandled error:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: ENV.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    ...(ENV.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// ──────────────────────────────────────────────────────────
// START SERVER
// ──────────────────────────────────────────────────────────
const startServer = async () => {
  await connectDB();

  app.listen(ENV.PORT, () => {
    console.log(`\n🚀 Hackitise Labs Backend`);
    console.log(`   Environment: ${ENV.NODE_ENV}`);
    console.log(`   Server:      http://localhost:${ENV.PORT}`);
    console.log(`   Health:      http://localhost:${ENV.PORT}/health`);
    console.log(`   API:         http://localhost:${ENV.PORT}/api/v1\n`);
  });
};

startServer().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
