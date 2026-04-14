import { Router, Request, Response } from 'express';
import Contact from '../models/Contact.js';
import { sendContactNotification } from '../utils/mailer.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// POST /api/v1/contact — public
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: 'Name, email, and message are required' });
      return;
    }

    const contact = await Contact.create({ name, email, phone, message });
    await sendContactNotification({ name, email, phone, message });
    res.status(201).json({ success: true, message: 'Message received', id: contact._id });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/v1/contact — admin only
router.get('/', protect, async (_req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/v1/contact/:id — admin update status
router.put('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!contact) { res.status(404).json({ success: false, message: 'Not found' }); return; }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
