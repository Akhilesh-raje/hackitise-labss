import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import Admin from '../models/Admin.js';

export interface AuthRequest extends Request {
  admin?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string };
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      res.status(401).json({ success: false, message: 'Admin not found' });
      return;
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};
