# 🚀 PSA Nashik Deployment Guide

## Current Issue
The application is not loading on http://45.194.46.109 because there's old code running on the server.

## 🧹 Step 1: Clean Up Old Installation

SSH into your server and run these commands:

```bash
ssh root@45.194.46.109
# Password: deskdev@2812

# Stop all PM2 processes
pm2 stop all
pm2 delete all
pm2 kill

# Remove old installations
rm -rf /var/www/psa-nashik*
rm -rf /var/www/PSA-NASHIK*

# Clean up any old processes
pkill -f node
pkill -f npm

# Check if anything is running on port 80 or 5000
netstat -tulpn | grep :80
netstat -tulpn | grep :5000

# Kill any processes on these ports if found
# fuser -k 80/tcp
# fuser -k 5000/tcp
```

## 📦 Step 2: Download and Deploy New Application

```bash
# Create new directory
mkdir -p /var/www/psa-nashik-new
cd /var/www/psa-nashik-new

# Download the deployment package from GitHub
curl -L https://github.com/r2w34/PSA-NASHIK-NEW-PERFECT/archive/main.zip -o psa-nashik.zip
unzip psa-nashik.zip
cd PSA-NASHIK-NEW-PERFECT-main

# Copy deployment files
cp -r deploy-package/* /var/www/psa-nashik-new/
cd /var/www/psa-nashik-new

# Install dependencies
npm install --production

# Start the application
node server.js
```

## 🔄 Step 3: Alternative - Use PM2 for Production

```bash
# Install PM2 globally if not installed
npm install -g pm2

# Start with PM2
pm2 start server.js --name "psa-nashik"

# Save PM2 configuration
pm2 save
pm2 startup

# Check status
pm2 status
pm2 logs psa-nashik
```

## 🌐 Step 4: Configure Nginx (Optional)

If you want to serve on port 80, configure Nginx:

```bash
# Install Nginx if not installed
apt update && apt install -y nginx

# Create Nginx configuration
cat > /etc/nginx/sites-available/psa-nashik << 'EOF'
server {
    listen 80;
    server_name 45.194.46.109;

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
    }
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/psa-nashik /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx
```

## 🔍 Step 5: Verify Deployment

```bash
# Check if the application is running
curl http://localhost:5000/health

# Check if Nginx is working (if configured)
curl http://localhost/health

# Check from outside
curl http://45.194.46.109/health
```

## 📋 Expected Response

You should see:
```json
{
  "status": "OK",
  "timestamp": "2025-01-XX...",
  "version": "1.0.0",
  "service": "PSA Nashik Management System"
}
```

## 🎯 Login Credentials

- **URL**: http://45.194.46.109
- **Email**: admin@psa-nashik.com
- **Password**: admin123

## 🐛 Troubleshooting

### If port 5000 is not accessible:
```bash
# Check firewall
ufw status
ufw allow 5000

# Or use iptables
iptables -A INPUT -p tcp --dport 5000 -j ACCEPT
```

### If application crashes:
```bash
# Check logs
pm2 logs psa-nashik
# or
journalctl -u nginx -f
```

### If old processes are still running:
```bash
# Find and kill all node processes
ps aux | grep node
kill -9 <process_id>

# Or kill all node processes
pkill -f node
```

## 📁 File Structure After Deployment

```
/var/www/psa-nashik-new/
├── index.html              # React app entry point
├── assets/
│   ├── index-*.js          # Main JavaScript bundle (463KB)
│   ├── index-*.css         # Styles (84KB)
│   └── psa-logo-*.png      # PSA logo
├── server.js               # Express.js server
└── package.json            # Dependencies
```

## ✅ Success Indicators

1. **Health Check**: `curl http://45.194.46.109/health` returns JSON
2. **Application**: `curl http://45.194.46.109` returns HTML
3. **Login**: Can access login page and authenticate
4. **Navigation**: All 17 pages load correctly
5. **No Gaps**: Layout spacing is perfect (fixed issue)

## 🚨 Emergency Reset

If everything fails, run this complete reset:

```bash
# Complete cleanup
pm2 kill
pkill -f node
rm -rf /var/www/*
systemctl stop nginx
systemctl disable nginx

# Start fresh
mkdir -p /var/www/psa-nashik-new
# Then follow Step 2 again
```

---

**Note**: The deployment package is ready in the `deploy-package/` directory and has been committed to GitHub. The application includes all 17 pages, fixed layout spacing, and production optimizations.