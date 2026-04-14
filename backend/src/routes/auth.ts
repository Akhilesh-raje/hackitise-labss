import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { ENV } from '../config/env.js';
import { protect, AuthRequest } from '../middleware/auth.js';

const router = Router();

const signToken = (id: string): string => {
  return jwt.sign({ id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN } as jwt.SignOptions);
};

// POST /api/v1/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password required' });
      return;
    }

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password))) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const token = signToken(admin._id.toString());
    res.json({ success: true, token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/v1/auth/me
router.get('/me', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  res.json({ success: true, admin: req.admin });
});

export default router;
