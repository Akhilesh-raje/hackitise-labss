import { Router, Request, Response } from 'express';
import BlogPost from '../models/BlogPost.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// GET /api/v1/blog — public (published only)
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/v1/blog/all — admin (all posts)
router.get('/all', protect, async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/v1/blog — admin
router.post('/', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/v1/blog/:id — admin
router.put('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) { res.status(404).json({ success: false, message: 'Not found' }); return; }
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/v1/blog/:id — admin
router.delete('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) { res.status(404).json({ success: false, message: 'Not found' }); return; }
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
