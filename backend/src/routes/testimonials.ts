import { Router, Request, Response } from 'express';
import Testimonial from '../models/Testimonial.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// GET /api/v1/testimonials — public
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await Testimonial.find({ published: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/v1/testimonials/all — admin
router.get('/all', protect, async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/v1/testimonials — admin
router.post('/', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/v1/testimonials/:id — admin
router.put('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) { res.status(404).json({ success: false, message: 'Not found' }); return; }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/v1/testimonials/:id — admin
router.delete('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) { res.status(404).json({ success: false, message: 'Not found' }); return; }
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
