const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration (cookie-based authentication)
app.use(session({
  secret: 'psa-nashik-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Users database
const users = [
  {
    id: 1,
    email: 'admin@psa-nashik.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  }
];

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  req.user = req.session.user;
  next();
};

// API Routes
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email, password });
    
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required'
      });
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      console.log('Invalid credentials for:', email);
      return res.status(401).json({ 
        error: 'Invalid credentials'
      });
    }
    
    // Store user in session (cookie-based)
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    console.log('Login successful for:', email);
    console.log('Session created:', req.session.id);
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error'
    });
  }
});

app.post('/api/auth/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).json({ error: 'Logout failed' });
      }
      
      res.clearCookie('connect.sid');
      res.json({ 
        success: true, 
        message: 'Logged out successfully' 
      });
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      error: 'Internal server error'
    });
  }
});

app.get('/api/auth/me', (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    res.json({
      success: true,
      user: req.session.user
    });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ 
      error: 'Internal server error'
    });
  }
});

// Dashboard API
app.get('/api/dashboard/stats', requireAuth, (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        totalStudents: 245,
        activeCoaches: 12,
        monthlyRevenue: 125000,
        attendanceRate: 87,
        recentActivities: [
          {
            id: 1,
            type: 'student_enrolled',
            message: 'New student enrolled: John Doe',
            timestamp: new Date().toISOString()
          },
          {
            id: 2,
            type: 'payment_received',
            message: 'Payment received from Jane Smith',
            timestamp: new Date().toISOString()
          }
        ],
        aiInsights: [
          {
            id: 1,
            title: 'Revenue Growth',
            description: 'Monthly revenue increased by 15% compared to last month',
            confidence: 92,
            type: 'positive'
          }
        ]
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      error: 'Internal server error'
    });
  }
});

// Mock API endpoints for all features
const mockApiResponse = (req, res) => {
  res.json({ 
    success: true, 
    data: [], 
    message: 'API endpoint working',
    endpoint: req.path,
    method: req.method
  });
};

// All API endpoints
app.get('/api/students', requireAuth, mockApiResponse);
app.post('/api/students', requireAuth, mockApiResponse);
app.put('/api/students/:id', requireAuth, mockApiResponse);
app.delete('/api/students/:id', requireAuth, mockApiResponse);
app.get('/api/fees', requireAuth, mockApiResponse);
app.post('/api/fees', requireAuth, mockApiResponse);
app.get('/api/attendance', requireAuth, mockApiResponse);
app.get('/api/sports', requireAuth, mockApiResponse);
app.get('/api/batches', requireAuth, mockApiResponse);
app.get('/api/coaches', requireAuth, mockApiResponse);
app.get('/api/communications', requireAuth, mockApiResponse);
app.get('/api/reports', requireAuth, mockApiResponse);
app.get('/api/ai-insights', requireAuth, mockApiResponse);
app.get('/api/student-badges', requireAuth, mockApiResponse);
app.get('/api/campaigns', requireAuth, mockApiResponse);
app.get('/api/user-management', requireAuth, mockApiResponse);
app.get('/api/gps-tracking', requireAuth, mockApiResponse);
app.get('/api/settings', requireAuth, mockApiResponse);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '2.1.0',
    service: 'PSA Nashik Management System - Complete with Cookie Auth',
    server: '194.238.23.217',
    activeSessions: Object.keys(req.sessionStore.sessions || {}).length,
    uptime: process.uptime()
  });
});

// Serve static files (React app assets)
app.use(express.static(__dirname, {
  maxAge: '1d',
  etag: false
}));

// Catch-all handler - serve React app
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      error: 'Application not found',
      message: 'React application files are missing'
    });
  }
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 PSA Nashik Complete Application running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Application: http://localhost:${PORT}`);
  console.log(`🍪 Cookie-based authentication enabled`);
  console.log(`🎯 Complete React App with all 17 modules`);
  console.log(`🆕 Server: 194.238.23.217`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully');  
  process.exit(0);
});
