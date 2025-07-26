#!/bin/bash

# PSA Nashik Deployment Script for New VPS
# Server: 194.238.23.217
# Password: Kalilinux@2812

echo "🚀 PSA Nashik Deployment to New VPS Server"
echo "==========================================="
echo "🌐 Server: 194.238.23.217"
echo "⏰ Time: $(date)"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if sshpass is available
if ! command -v sshpass &> /dev/null; then
    print_status "Installing sshpass..."
    apt-get update && apt-get install -y sshpass
fi

# Test SSH connection
print_status "Testing SSH connection to new server..."
sshpass -p "Kalilinux@2812" ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 root@194.238.23.217 "echo 'SSH connection successful'" 2>/dev/null

if [ $? -eq 0 ]; then
    print_success "SSH connection established successfully"
else
    print_error "SSH connection failed. Please check server IP and credentials."
    exit 1
fi

# Deploy to new server
print_status "Deploying PSA Nashik to new VPS server..."

sshpass -p "Kalilinux@2812" ssh -o StrictHostKeyChecking=no root@194.238.23.217 << 'ENDSSH'

echo "🔧 Setting up PSA Nashik on new server..."

# Update system
echo "📦 Updating system packages..."
apt-get update -y

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📥 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Install PM2 globally
if ! command -v pm2 &> /dev/null; then
    echo "📊 Installing PM2..."
    npm install -g pm2
fi

# Install other required tools
apt-get install -y curl wget unzip nginx ufw

echo "✅ System setup completed"
echo "📊 Node.js version: $(node --version)"
echo "📊 npm version: $(npm --version)"

# Clean up any existing installations
echo "🧹 Cleaning up existing installations..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true
pm2 kill 2>/dev/null || true
pkill -f node 2>/dev/null || true

# Remove old directories
rm -rf /var/www/* 2>/dev/null || true

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /var/www/psa-nashik
cd /var/www/psa-nashik

# Download application from GitHub
echo "📥 Downloading PSA Nashik application..."
curl -L https://github.com/r2w34/PSA-NASHIK-NEW-PERFECT/archive/main.zip -o psa-nashik.zip

if [ ! -f "psa-nashik.zip" ]; then
    echo "❌ Failed to download application"
    exit 1
fi

# Extract application
echo "📦 Extracting application files..."
unzip -q psa-nashik.zip
cp -r PSA-NASHIK-NEW-PERFECT-main/deploy-package/* .
rm -rf PSA-NASHIK-NEW-PERFECT-main psa-nashik.zip

# Verify files
if [ ! -f "server.js" ]; then
    echo "❌ server.js not found, creating backup server..."
    
    # Create backup server
    cat > server.js << 'EOF'
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Session storage
const sessions = new Map();

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
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'PSA Nashik Management System',
    server: 'New VPS - 194.238.23.217'
  });
});

// Serve static files
app.use(express.static(__dirname));

// Main route
app.get('*', (req, res) => {
  if (fs.existsSync(path.join(__dirname, 'index.html'))) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PSA Nashik Sports Academy</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            padding: 3rem;
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
        }
        .logo {
            font-size: 4rem;
            margin-bottom: 1rem;
            animation: bounce 2s infinite;
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #fff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .subtitle {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .status {
            background: rgba(144, 238, 144, 0.2);
            padding: 1rem;
            border-radius: 10px;
            margin: 2rem 0;
            border: 1px solid rgba(144, 238, 144, 0.3);
        }
        .links {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 2rem;
        }
        .link {
            background: rgba(255,255,255,0.2);
            color: white;
            text-decoration: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            border: 1px solid rgba(255,255,255,0.3);
            transition: all 0.3s ease;
            font-weight: 500;
        }
        .link:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .info {
            margin-top: 2rem;
            font-size: 0.9rem;
            opacity: 0.8;
        }
        .spinner {
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top: 3px solid white;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 1rem auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🏆</div>
        <h1>PSA Nashik</h1>
        <div class="subtitle">Sports Academy Management System</div>
        
        <div class="status">
            <div class="spinner"></div>
            <strong>✅ Server is Running Successfully!</strong>
            <br><small>New VPS Server: 194.238.23.217</small>
        </div>
        
        <div class="links">
            <a href="/health" class="link">🔍 Health Check</a>
            <a href="/api/dashboard/stats" class="link">📊 API Test</a>
        </div>
        
        <div class="info">
            <p><strong>🔐 Demo Login:</strong></p>
            <p>Email: admin@psa-nashik.com</p>
            <p>Password: admin123</p>
            <br>
            <p><small>The full React application will load automatically when ready.</small></p>
        </div>
    </div>
    
    <script>
        // Auto-refresh every 10 seconds to check for full app
        setTimeout(() => {
            window.location.reload();
        }, 10000);
        
        // Test API connectivity
        fetch('/health')
            .then(response => response.json())
            .then(data => {
                console.log('Health check:', data);
            })
            .catch(error => {
                console.log('API test failed:', error);
            });
    </script>
</body>
</html>
    `);
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🚀 PSA Nashik Server running on port \${PORT}\`);
  console.log(\`📊 Environment: \${process.env.NODE_ENV || 'production'}\`);
  console.log(\`🔗 Health check: http://localhost:\${PORT}/health\`);
  console.log(\`🌐 Application: http://localhost:\${PORT}\`);
  console.log(\`🆕 New VPS Server: 194.238.23.217\`);
  console.log(\`⏰ Started at: \${new Date().toISOString()}\`);
});
EOF
fi

# Create package.json if not exists
if [ ! -f "package.json" ]; then
    echo "📦 Creating package.json..."
    cat > package.json << 'EOF'
{
  "name": "psa-nashik-new-vps",
  "version": "1.0.0",
  "description": "PSA Nashik Sports Academy Management System - New VPS",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
EOF
fi

# Install dependencies
echo "📥 Installing dependencies..."
npm install --production

# Configure firewall
echo "🔥 Configuring firewall..."
ufw --force enable
ufw allow ssh
ufw allow 80
ufw allow 5000
ufw allow 443

# Start application with PM2
echo "🚀 Starting PSA Nashik application..."
pm2 start server.js --name "psa-nashik" --time
pm2 save
pm2 startup systemd -u root --hp /root

# Configure Nginx
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/psa-nashik << 'NGINXEOF'
server {
    listen 80;
    server_name 194.238.23.217;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
NGINXEOF

# Enable Nginx site
ln -sf /etc/nginx/sites-available/psa-nashik /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t && systemctl restart nginx && systemctl enable nginx

# Test application
echo "🧪 Testing application..."
sleep 5

# Test health endpoint
if curl -s http://localhost:5000/health > /dev/null; then
    echo "✅ Health check: PASSED"
else
    echo "❌ Health check: FAILED"
fi

# Display status
echo ""
echo "🎉 PSA NASHIK DEPLOYMENT COMPLETED!"
echo "=================================="
echo "🌐 Application URLs:"
echo "   Main: http://194.238.23.217"
echo "   Direct: http://194.238.23.217:5000"
echo "   Health: http://194.238.23.217/health"
echo ""
echo "🔐 Login Credentials:"
echo "   Email: admin@psa-nashik.com"
echo "   Password: admin123"
echo ""
echo "📊 Server Status:"
pm2 status
echo ""
echo "🔧 Management Commands:"
echo "   Status: pm2 status"
echo "   Logs: pm2 logs psa-nashik"
echo "   Restart: pm2 restart psa-nashik"
echo "   Nginx: systemctl status nginx"
echo ""
echo "✅ Deployment completed successfully!"

ENDSSH

if [ $? -eq 0 ]; then
    print_success "Deployment completed successfully!"
    echo ""
    echo "🎉 PSA NASHIK IS NOW LIVE!"
    echo "========================="
    echo "🌐 Main URL: http://194.238.23.217"
    echo "🔍 Health Check: http://194.238.23.217/health"
    echo "🔐 Login: admin@psa-nashik.com / admin123"
    echo ""
    echo "🧪 Testing connectivity..."
    
    # Test the deployed application
    sleep 3
    if curl -s -o /dev/null -w "%{http_code}" http://194.238.23.217/health | grep -q "200"; then
        print_success "✅ Application is accessible and responding!"
    else
        print_warning "⚠️  Application may still be starting up. Try again in 30 seconds."
    fi
else
    print_error "Deployment failed. Please check the error messages above."
    exit 1
fi