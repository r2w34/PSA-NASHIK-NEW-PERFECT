import express from 'express';

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// Get dashboard statistics
router.get('/stats', requireAuth, (req, res) => {
  try {
    // Mock dashboard statistics - in production, this would come from database
    const stats = {
      totalStudents: 245,
      activeCoaches: 12,
      monthlyRevenue: 125000,
      attendanceRate: 87,
      pendingFees: 25000,
      overduePayments: 8,
      activeBatches: 15,
      totalSports: 5,
      
      // Recent activities
      recentActivities: [
        {
          id: 1,
          type: 'enrollment',
          message: 'New student Arjun Sharma enrolled in Cricket batch',
          timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          icon: 'user-plus',
          color: 'blue'
        },
        {
          id: 2,
          type: 'payment',
          message: 'Fee payment of ₹2,000 received from Priya Patel',
          timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          icon: 'credit-card',
          color: 'green'
        },
        {
          id: 3,
          type: 'attendance',
          message: 'Attendance marked for Football batch A (18/20 present)',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          icon: 'calendar',
          color: 'purple'
        },
        {
          id: 4,
          type: 'alert',
          message: 'Basketball batch B is 90% full - consider adding new batch',
          timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
          icon: 'alert-circle',
          color: 'orange'
        },
        {
          id: 5,
          type: 'coach',
          message: 'Coach Rajesh Kumar assigned to new Tennis batch',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          icon: 'user-check',
          color: 'indigo'
        }
      ],

      // Sports distribution
      sportsDistribution: [
        { name: 'Cricket', students: 85, percentage: 34.7, color: '#3B82F6' },
        { name: 'Football', students: 72, percentage: 29.4, color: '#10B981' },
        { name: 'Basketball', students: 45, percentage: 18.4, color: '#F59E0B' },
        { name: 'Tennis', students: 28, percentage: 11.4, color: '#8B5CF6' },
        { name: 'Badminton', students: 15, percentage: 6.1, color: '#EC4899' }
      ],

      // Monthly revenue trend (last 6 months)
      revenueData: [
        { month: 'Aug 2024', revenue: 98000, growth: 5.2 },
        { month: 'Sep 2024', revenue: 105000, growth: 7.1 },
        { month: 'Oct 2024', revenue: 112000, growth: 6.7 },
        { month: 'Nov 2024', revenue: 108000, growth: -3.6 },
        { month: 'Dec 2024', revenue: 118000, growth: 9.3 },
        { month: 'Jan 2025', revenue: 125000, growth: 5.9 }
      ],

      // Attendance trends (last 7 days)
      attendanceData: [
        { date: '2025-01-20', rate: 89 },
        { date: '2025-01-21', rate: 92 },
        { date: '2025-01-22', rate: 85 },
        { date: '2025-01-23', rate: 88 },
        { date: '2025-01-24', rate: 91 },
        { date: '2025-01-25', rate: 87 },
        { date: '2025-01-26', rate: 90 }
      ],

      // Quick stats for cards
      quickStats: {
        newStudentsThisMonth: 18,
        paymentsToday: 12,
        attendanceToday: 89,
        overduePayments: 8,
        activeBatches: 15,
        availableSlots: 45
      },

      // Upcoming events
      upcomingEvents: [
        {
          id: 1,
          title: 'Cricket Tournament Registration',
          date: '2025-02-01',
          type: 'tournament',
          description: 'Annual inter-batch cricket tournament'
        },
        {
          id: 2,
          title: 'Parent-Teacher Meeting',
          date: '2025-02-05',
          type: 'meeting',
          description: 'Monthly progress discussion'
        },
        {
          id: 3,
          title: 'New Batch Orientation',
          date: '2025-02-10',
          type: 'orientation',
          description: 'Welcome session for new students'
        }
      ],

      // Performance metrics
      performanceMetrics: {
        studentRetentionRate: 94.5,
        averageAttendance: 87.2,
        feeCollectionRate: 92.8,
        coachUtilization: 85.6,
        facilityUtilization: 78.3
      }
    };

    res.json(stats);

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard statistics'
    });
  }
});

// Get recent activities with pagination
router.get('/activities', requireAuth, (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const type = req.query.type as string;

    // Mock activities data
    let activities = [
      {
        id: 1,
        type: 'enrollment',
        title: 'New Student Enrollment',
        message: 'Arjun Sharma enrolled in Cricket batch A',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        user: 'Admin User',
        metadata: { studentId: 'STU001', batchId: 'BAT001' }
      },
      {
        id: 2,
        type: 'payment',
        title: 'Fee Payment Received',
        message: 'Payment of ₹2,000 received from Priya Patel',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        user: 'Admin User',
        metadata: { amount: 2000, studentId: 'STU002', method: 'UPI' }
      },
      // Add more activities as needed
    ];

    // Filter by type if specified
    if (type) {
      activities = activities.filter(activity => activity.type === type);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedActivities = activities.slice(startIndex, endIndex);

    res.json({
      activities: paginatedActivities,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(activities.length / limit),
        totalItems: activities.length,
        hasNext: endIndex < activities.length,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Dashboard activities error:', error);
    res.status(500).json({
      error: 'Failed to fetch activities'
    });
  }
});

// Get system health metrics
router.get('/health-metrics', requireAuth, (req, res) => {
  try {
    const healthMetrics = {
      systemStatus: 'healthy',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      timestamp: new Date(),
      
      // Application-specific metrics
      applicationMetrics: {
        activeUsers: 1,
        totalSessions: 1,
        databaseConnections: 1,
        apiResponseTime: 45, // ms
        errorRate: 0.02, // 2%
        throughput: 150 // requests per minute
      },

      // Service status
      services: {
        database: { status: 'healthy', responseTime: 12 },
        redis: { status: 'healthy', responseTime: 3 },
        email: { status: 'healthy', responseTime: 250 },
        sms: { status: 'healthy', responseTime: 180 },
        storage: { status: 'healthy', responseTime: 8 }
      }
    };

    res.json(healthMetrics);

  } catch (error) {
    console.error('Health metrics error:', error);
    res.status(500).json({
      error: 'Failed to fetch health metrics'
    });
  }
});

export default router;