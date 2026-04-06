import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.get('/api/v1/profile', (req, res) => {
  res.json({ 
    user: { 
      name: 'Hackitise Admin', 
      email: 'admin@hackitise.com',
      role: 'SUPERADMIN' 
    } 
  });
});

app.post('/api/v1/contact', (req, res) => {
  // Simplified mock contact response
  const { name, email, subject, message } = req.body;
  console.log('Contact form submission received:', { name, email, subject, message });
  res.status(201).json({ success: true, message: 'Message received (mock)' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
