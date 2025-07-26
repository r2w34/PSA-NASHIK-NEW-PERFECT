#!/bin/bash

# PSA Nashik Server Debug Script
# Run this on your VPS to diagnose the ERR_EMPTY_RESPONSE issue

echo "🔍 PSA Nashik Server Diagnostics"
echo "=================================="
echo "Time: $(date)"
echo "Server: $(hostname -I | awk '{print $1}')"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[CHECK]${NC} $1"; }
print_success() { echo -e "${GREEN}[OK]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# 1. Check if Node.js processes are running
print_status "Checking for running Node.js processes..."
NODE_PROCESSES=$(ps aux | grep -v grep | grep node)
if [ -n "$NODE_PROCESSES" ]; then
    print_success "Node.js processes found:"
    echo "$NODE_PROCESSES"
else
    print_error "No Node.js processes running!"
fi
echo ""

# 2. Check PM2 status
print_status "Checking PM2 status..."
if command -v pm2 &> /dev/null; then
    PM2_STATUS=$(pm2 status 2>/dev/null)
    if [ $? -eq 0 ]; then
        print_success "PM2 is available:"
        pm2 status
    else
        print_warning "PM2 available but no processes running"
    fi
else
    print_warning "PM2 not installed"
fi
echo ""

# 3. Check what's listening on port 5000
print_status "Checking what's listening on port 5000..."
PORT_5000=$(netstat -tulpn 2>/dev/null | grep :5000)
if [ -n "$PORT_5000" ]; then
    print_success "Port 5000 is in use:"
    echo "$PORT_5000"
else
    print_error "Nothing is listening on port 5000!"
fi
echo ""

# 4. Check what's listening on port 80
print_status "Checking what's listening on port 80..."
PORT_80=$(netstat -tulpn 2>/dev/null | grep :80)
if [ -n "$PORT_80" ]; then
    print_success "Port 80 is in use:"
    echo "$PORT_80"
else
    print_warning "Nothing is listening on port 80"
fi
echo ""

# 5. Check firewall status
print_status "Checking firewall status..."
if command -v ufw &> /dev/null; then
    UFW_STATUS=$(ufw status 2>/dev/null)
    print_success "UFW firewall status:"
    echo "$UFW_STATUS"
elif command -v iptables &> /dev/null; then
    print_success "iptables rules for port 5000:"
    iptables -L INPUT | grep 5000 || print_warning "No iptables rules for port 5000"
else
    print_warning "No firewall tools found"
fi
echo ""

# 6. Check application directory
print_status "Checking application directory..."
if [ -d "/var/www/psa-nashik-new" ]; then
    print_success "Application directory exists:"
    ls -la /var/www/psa-nashik-new/
    
    if [ -f "/var/www/psa-nashik-new/server.js" ]; then
        print_success "server.js found"
    else
        print_error "server.js not found!"
    fi
    
    if [ -f "/var/www/psa-nashik-new/package.json" ]; then
        print_success "package.json found"
    else
        print_error "package.json not found!"
    fi
else
    print_error "Application directory /var/www/psa-nashik-new does not exist!"
fi
echo ""

# 7. Check recent logs
print_status "Checking recent logs..."
if command -v pm2 &> /dev/null; then
    print_success "PM2 logs (last 20 lines):"
    pm2 logs --lines 20 2>/dev/null || print_warning "No PM2 logs available"
fi

if [ -f "/var/www/psa-nashik-new/app.log" ]; then
    print_success "Application log (last 10 lines):"
    tail -10 /var/www/psa-nashik-new/app.log
fi
echo ""

# 8. Test local connectivity
print_status "Testing local connectivity..."
if command -v curl &> /dev/null; then
    print_status "Testing localhost:5000..."
    CURL_RESULT=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000 2>/dev/null)
    if [ "$CURL_RESULT" = "200" ]; then
        print_success "localhost:5000 responds with HTTP 200"
    else
        print_error "localhost:5000 responds with HTTP $CURL_RESULT or no response"
    fi
    
    print_status "Testing health endpoint..."
    HEALTH_RESULT=$(curl -s http://localhost:5000/health 2>/dev/null)
    if [ -n "$HEALTH_RESULT" ]; then
        print_success "Health endpoint response:"
        echo "$HEALTH_RESULT"
    else
        print_error "Health endpoint not responding"
    fi
else
    print_warning "curl not available for testing"
fi
echo ""

# 9. System resources
print_status "Checking system resources..."
print_success "Memory usage:"
free -h
echo ""
print_success "Disk usage:"
df -h /var/www/
echo ""

# 10. Recommendations
echo "🔧 RECOMMENDATIONS:"
echo "==================="

if [ -z "$NODE_PROCESSES" ]; then
    print_error "ISSUE: No Node.js processes running"
    echo "   SOLUTION: Start the application with:"
    echo "   cd /var/www/psa-nashik-new && node server.js"
    echo "   OR: pm2 start server.js --name psa-nashik"
fi

if [ -z "$PORT_5000" ]; then
    print_error "ISSUE: Nothing listening on port 5000"
    echo "   SOLUTION: The application is not running or crashed"
    echo "   Check logs and restart the application"
fi

if ! command -v pm2 &> /dev/null; then
    print_warning "RECOMMENDATION: Install PM2 for better process management"
    echo "   npm install -g pm2"
fi

echo ""
echo "🚀 QUICK FIX COMMANDS:"
echo "====================="
echo "1. Go to app directory: cd /var/www/psa-nashik-new"
echo "2. Start application: node server.js"
echo "3. Or with PM2: pm2 start server.js --name psa-nashik"
echo "4. Check status: pm2 status"
echo "5. View logs: pm2 logs psa-nashik"
echo ""
echo "🌐 Test URLs:"
echo "============"
echo "Health: curl http://localhost:5000/health"
echo "Main: curl http://localhost:5000"
echo "External: http://$(hostname -I | awk '{print $1}'):5000"