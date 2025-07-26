import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Mock user data - in production, this would come from database
const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@psa-nashik.com',
    password: '$2a$10$3/3J8TeBOAHwOCX2KJolZe7UJfeaM9PO22p3nYuBgXQ7zO11djTYW', // password: admin123
    role: 'admin',
    permissions: ['all'],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  }
];

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // Find user by email
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Account is deactivated. Please contact administrator.'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Create session
    req.session.userId = user.id;
    req.session.userEmail = user.email;
    req.session.userRole = user.role;

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Internal server error during login'
    });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destruction error:', err);
        return res.status(500).json({
          error: 'Failed to logout'
        });
      }
      
      res.clearCookie('connect.sid');
      res.json({
        message: 'Logout successful'
      });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Internal server error during logout'
    });
  }
});

// Get current user endpoint
router.get('/me', (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: 'Not authenticated'
      });
    }

    // Find user by session ID
    const user = mockUsers.find(u => u.id === req.session.userId);
    
    if (!user || !user.isActive) {
      // Clear invalid session
      req.session.destroy(() => {});
      return res.status(401).json({
        error: 'User not found or inactive'
      });
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    res.json(userWithoutPassword);

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Change password endpoint
router.post('/change-password', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: 'Not authenticated'
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: 'New password must be at least 6 characters long'
      });
    }

    // Find user
    const userIndex = mockUsers.findIndex(u => u.id === req.session.userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const user = mockUsers[userIndex];

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    
    if (!isValidPassword) {
      return res.status(400).json({
        error: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    mockUsers[userIndex].password = hashedNewPassword;
    mockUsers[userIndex].updatedAt = new Date();

    res.json({
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      error: 'Internal server error during password change'
    });
  }
});

// Refresh session endpoint
router.post('/refresh', (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: 'Not authenticated'
      });
    }

    // Find user
    const user = mockUsers.find(u => u.id === req.session.userId);
    
    if (!user || !user.isActive) {
      req.session.destroy(() => {});
      return res.status(401).json({
        error: 'User not found or inactive'
      });
    }

    // Extend session
    req.session.touch();

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Session refreshed',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Refresh session error:', error);
    res.status(500).json({
      error: 'Internal server error during session refresh'
    });
  }
});

export default router;