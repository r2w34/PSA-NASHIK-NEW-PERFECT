#!/bin/bash

# PSA Nashik VPS Deployment Script
# Run this script on your VPS server: bash deploy-to-vps.sh

echo "🚀 PSA Nashik VPS Deployment Starting..."
echo "📍 Server: $(hostname -I | awk '{print $1}')"
echo "⏰ Time: $(date)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Clean up old installations
print_status "Cleaning up old installations..."

# Stop PM2 processes
if command -v pm2 &> /dev/null; then
    print_status "Stopping PM2 processes..."
    pm2 stop all 2>/dev/null || true
    pm2 delete all 2>/dev/null || true
    pm2 kill 2>/dev/null || true
    print_success "PM2 processes stopped"
else
    print_warning "PM2 not found, skipping PM2 cleanup"
fi

# Kill node processes
print_status "Killing any running node processes..."
pkill -f node 2>/dev/null || true
pkill -f npm 2>/dev/null || true

# Remove old directories
print_status "Removing old application directories..."
rm -rf /var/www/psa-nashik* 2>/dev/null || true
rm -rf /var/www/PSA-NASHIK* 2>/dev/null || true

# Check for processes on ports 80 and 5000
print_status "Checking for processes on ports 80 and 5000..."
if netstat -tulpn 2>/dev/null | grep -q ":80 "; then
    print_warning "Port 80 is in use"
fi
if netstat -tulpn 2>/dev/null | grep -q ":5000 "; then
    print_warning "Port 5000 is in use"
    # Kill processes on port 5000
    fuser -k 5000/tcp 2>/dev/null || true
fi

print_success "Cleanup completed"

# Step 2: Create new directory and download application
print_status "Creating application directory..."
mkdir -p /var/www/psa-nashik-new
cd /var/www/psa-nashik-new

print_status "Downloading PSA Nashik application from GitHub..."
if command -v curl &> /dev/null; then
    curl -L https://github.com/r2w34/PSA-NASHIK-NEW-PERFECT/archive/main.zip -o psa-nashik.zip
elif command -v wget &> /dev/null; then
    wget https://github.com/r2w34/PSA-NASHIK-NEW-PERFECT/archive/main.zip -O psa-nashik.zip
else
    print_error "Neither curl nor wget found. Please install one of them."
    exit 1
fi

# Check if download was successful
if [ ! -f "psa-nashik.zip" ]; then
    print_error "Failed to download application. Please check your internet connection."
    exit 1
fi

print_status "Extracting application files..."
if command -v unzip &> /dev/null; then
    unzip -q psa-nashik.zip
else
    print_error "unzip command not found. Please install unzip."
    exit 1
fi

# Copy deployment files
if [ -d "PSA-NASHIK-NEW-PERFECT-main/deploy-package" ]; then
    print_status "Copying deployment files..."
    cp -r PSA-NASHIK-NEW-PERFECT-main/deploy-package/* .
    rm -rf PSA-NASHIK-NEW-PERFECT-main psa-nashik.zip
    print_success "Files copied successfully"
else
    print_error "Deployment package not found in downloaded files"
    exit 1
fi

# Step 3: Install Node.js if not present
if ! command -v node &> /dev/null; then
    print_warning "Node.js not found. Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

if ! command -v npm &> /dev/null; then
    print_error "npm not found even after Node.js installation"
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Step 4: Install dependencies
print_status "Installing application dependencies..."
npm install --production --silent

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

print_success "Dependencies installed successfully"

# Step 5: Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2 process manager..."
    npm install -g pm2 --silent
fi

# Step 6: Start the application
print_status "Starting PSA Nashik application..."

# Start with PM2
pm2 start server.js --name "psa-nashik" --time

if [ $? -eq 0 ]; then
    print_success "Application started successfully with PM2"
    
    # Save PM2 configuration
    pm2 save
    
    # Setup PM2 startup script
    pm2 startup systemd -u root --hp /root 2>/dev/null || true
    
else
    print_error "Failed to start application with PM2"
    print_status "Trying to start with node directly..."
    
    # Try starting with node directly
    nohup node server.js > app.log 2>&1 &
    
    if [ $? -eq 0 ]; then
        print_success "Application started with node"
    else
        print_error "Failed to start application"
        exit 1
    fi
fi

# Step 7: Configure firewall
print_status "Configuring firewall..."
if command -v ufw &> /dev/null; then
    ufw allow 5000 2>/dev/null || true
    print_success "Firewall configured for port 5000"
fi

# Step 8: Test the application
print_status "Testing application..."
sleep 3

# Test health endpoint
if curl -s http://localhost:5000/health > /dev/null; then
    print_success "Health check passed"
else
    print_warning "Health check failed, but application might still be starting"
fi

# Test main page
if curl -s http://localhost:5000 | grep -q "PSA Nashik"; then
    print_success "Main page is accessible"
else
    print_warning "Main page test failed"
fi

# Step 9: Display status
echo ""
echo "🎉 PSA Nashik Deployment Completed!"
echo ""
echo "📊 Application Status:"
if command -v pm2 &> /dev/null; then
    pm2 status
else
    ps aux | grep "node server.js" | grep -v grep || echo "No node processes found"
fi

echo ""
echo "🌐 Access Information:"
echo "   URL: http://$(hostname -I | awk '{print $1}'):5000"
echo "   Health Check: http://$(hostname -I | awk '{print $1}'):5000/health"
echo ""
echo "🔐 Login Credentials:"
echo "   Email: admin@psa-nashik.com"
echo "   Password: admin123"
echo ""
echo "📋 Useful Commands:"
echo "   Check status: pm2 status"
echo "   View logs: pm2 logs psa-nashik"
echo "   Restart app: pm2 restart psa-nashik"
echo "   Stop app: pm2 stop psa-nashik"
echo ""

# Final test
print_status "Performing final connectivity test..."
EXTERNAL_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || echo "Unknown")
echo "🔗 External IP: $EXTERNAL_IP"

if [ "$EXTERNAL_IP" != "Unknown" ]; then
    echo "🌍 Try accessing: http://$EXTERNAL_IP:5000"
fi

print_success "Deployment script completed successfully!"
echo "⚠️  If you can't access the application externally, check your VPS firewall settings."