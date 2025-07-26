import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware (simple in-memory for demo)
const sessions = new Map();

// Serve static files
app.use(express.static(__dirname));

// API Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@psa-nashik.com' && password === 'admin123') {
    const sessionId = Math.random().toString(36).substring(7);
    sessions.set(sessionId, {
      userId: 1,
      email: email,
      name: 'Admin User',
      role: 'admin'
    });
    
    res.json({
      success: true,
      sessionId: sessionId,
      user: {
        id: 1,
        email: email,
        name: 'Admin User',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  const sessionId = req.headers.authorization;
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.json({ success: true });
});

app.get('/api/auth/me', (req, res) => {
  const sessionId = req.headers.authorization;
  const session = sessions.get(sessionId);
  
  if (session) {
    res.json(session);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    totalStudents: 245,
    activeCoaches: 12,
    monthlyRevenue: 125000,
    attendanceRate: 87,
    recentActivities: [],
    aiInsights: [
      {
        id: 1,
        title: 'Revenue Growth',
        description: 'Monthly revenue increased by 15% compared to last month',
        confidence: 92,
        type: 'positive'
      },
      {
        id: 2,
        title: 'Attendance Alert',
        description: 'Cricket batch attendance dropped by 8% this week',
        confidence: 88,
        type: 'warning'
      },
      {
        id: 3,
        title: 'Capacity Optimization',
        description: 'Consider adding evening batch for Football',
        confidence: 95,
        type: 'info'
      }
    ]
  });
});

// Mock API endpoints for all other routes
const mockResponse = (req, res) => {
  res.json({ 
    success: true, 
    data: [], 
    message: 'Mock API response',
    endpoint: req.path 
  });
};

app.get('/api/students', mockResponse);
app.post('/api/students', mockResponse);
app.put('/api/students/:id', mockResponse);
app.delete('/api/students/:id', mockResponse);

app.get('/api/fees', mockResponse);
app.post('/api/fees', mockResponse);

app.get('/api/attendance', mockResponse);
app.post('/api/attendance', mockResponse);

app.get('/api/sports', mockResponse);
app.get('/api/batches', mockResponse);
app.get('/api/coaches', mockResponse);
app.get('/api/communications', mockResponse);
app.get('/api/reports', mockResponse);
app.get('/api/ai-insights', mockResponse);
app.get('/api/student-badges', mockResponse);
app.get('/api/campaigns', mockResponse);
app.get('/api/user-management', mockResponse);
app.get('/api/gps-tracking', mockResponse);
app.get('/api/settings', mockResponse);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'PSA Nashik Management System'
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 PSA Nashik Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Application: http://localhost:${PORT}`);
});