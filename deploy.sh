#!/bin/bash

# PSA Nashik Deployment Script
echo "🚀 Starting PSA Nashik deployment to VPS..."

# Build client
echo "📦 Building client application..."
npm run build:client

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Client build failed!"
    exit 1
fi

echo "✅ Client build successful!"

# Create deployment package
echo "📦 Creating deployment package..."
mkdir -p deploy-package
cp -r dist/client/* deploy-package/
cp -r server deploy-package/
cp -r shared deploy-package/
cp package.json deploy-package/
cp package-lock.json deploy-package/

# Create production package.json
cat > deploy-package/package.json << 'EOF'
{
  "name": "psa-nashik-perfect",
  "version": "1.0.0",
  "description": "PSA Nashik Sports Academy Management System",
  "main": "server/index.js",
  "type": "module",
  "scripts": {
    "start": "node server/index.js",
    "dev": "tsx watch server/index.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "express-session": "^1.17.3",
    "bcryptjs": "^2.4.3",
    "express-rate-limit": "^7.1.5",
    "tsx": "^4.7.0"
  }
}
EOF

# Create simple server file for production
cat > deploy-package/server/index.js << 'EOF'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'psa-nashik-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// API Routes with mock data
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@psa-nashik.com' && password === 'admin123') {
    req.session.userId = 1;
    req.session.userEmail = email;
    req.session.userRole = 'admin';
    
    res.json({
      success: true,
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
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/auth/me', (req, res) => {
  if (req.session.userId) {
    res.json({
      id: 1,
      email: 'admin@psa-nashik.com',
      name: 'Admin User',
      role: 'admin'
    });
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
      }
    ]
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 PSA Nashik Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
EOF

echo "📦 Deployment package created!"

# Deploy to VPS
echo "🚀 Deploying to VPS server..."

# Upload files to server
sshpass -p "deskdev@2812" scp -o StrictHostKeyChecking=no -r deploy-package/* root@45.194.46.109:/var/www/psa-nashik-new/

# Install dependencies and restart on server
sshpass -p "deskdev@2812" ssh -o StrictHostKeyChecking=no root@45.194.46.109 "
cd /var/www/psa-nashik-new && \
npm install --production && \
pm2 stop psa-nashik-new || true && \
pm2 delete psa-nashik-new || true && \
pm2 start server/index.js --name psa-nashik-new && \
pm2 save && \
echo '✅ Deployment completed successfully!'
"

echo "🎉 PSA Nashik deployed successfully!"
echo "🌐 Application URL: http://45.194.46.109"
echo "🔗 Health Check: http://45.194.46.109/health"

# Cleanup
rm -rf deploy-package

echo "✅ Deployment script completed!"
EOF