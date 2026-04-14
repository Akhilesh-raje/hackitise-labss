import { Router, Request, Response } from 'express';
import Application from '../models/Application.js';
import { upload } from '../middleware/upload.js';
import { sendApplicationNotification } from '../utils/mailer.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// POST /api/v1/applications — public (with file upload)
router.post('/', upload.single('resume'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message, role } = req.body;
    if (!name || !email) {
      res.status(400).json({ success: false, message: 'Name and email are required' });
      return;
    }

    const resumePath = req.file?.path;
    const application = await Application.create({ name, email, resumePath, message, role });
    await sendApplicationNotification({ name, email, message, role }, resumePath);
    res.status(201).json({ success: true, message: 'Application received', id: application._id });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/v1/applications — admin only
router.get('/', protect, async (_req: Request, res: Response): Promise<void> => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/v1/applications/:id — admin update status
router.put('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!app) { res.status(404).json({ success: false, message: 'Not found' }); return; }
    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
