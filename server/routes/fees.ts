import express from 'express';

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// GET endpoint
router.get('/', requireAuth, (req, res) => {
  try {
    // Mock fees data - replace with actual database queries
    const mockFees = [
      {
        id: 1,
        studentId: 1,
        studentName: 'Arjun Sharma',
        amount: 2000,
        dueDate: '2025-01-31',
        paidDate: '2025-01-15',
        status: 'paid',
        paymentMethod: 'UPI',
        transactionId: 'TXN001',
        month: 'January 2025',
        sport: 'Cricket',
        batch: 'Cricket A',
        receiptNumber: 'RCP001'
      },
      {
        id: 2,
        studentId: 2,
        studentName: 'Priya Patel',
        amount: 1800,
        dueDate: '2025-01-31',
        paidDate: null,
        status: 'pending',
        paymentMethod: null,
        transactionId: null,
        month: 'January 2025',
        sport: 'Football',
        batch: 'Football B',
        receiptNumber: null
      },
      {
        id: 3,
        studentId: 3,
        studentName: 'Rohit Kumar',
        amount: 2200,
        dueDate: '2024-12-31',
        paidDate: null,
        status: 'overdue',
        paymentMethod: null,
        transactionId: null,
        month: 'December 2024',
        sport: 'Basketball',
        batch: 'Basketball A',
        receiptNumber: null
      },
      {
        id: 4,
        studentId: 4,
        studentName: 'Sneha Desai',
        amount: 2500,
        dueDate: '2025-01-31',
        paidDate: '2025-01-10',
        status: 'paid',
        paymentMethod: 'Cash',
        transactionId: null,
        month: 'January 2025',
        sport: 'Tennis',
        batch: 'Tennis A',
        receiptNumber: 'RCP002'
      },
      {
        id: 5,
        studentId: 5,
        studentName: 'Aditya Singh',
        amount: 1500,
        dueDate: '2025-01-31',
        paidDate: '2025-01-20',
        status: 'paid',
        paymentMethod: 'Bank Transfer',
        transactionId: 'TXN002',
        month: 'January 2025',
        sport: 'Badminton',
        batch: 'Badminton A',
        receiptNumber: 'RCP003'
      }
    ];

    // Apply filters if provided
    const { search, status, month } = req.query;
    let filteredFees = mockFees;

    if (search) {
      const searchTerm = search.toString().toLowerCase();
      filteredFees = filteredFees.filter(fee => 
        fee.studentName.toLowerCase().includes(searchTerm) ||
        fee.sport.toLowerCase().includes(searchTerm) ||
        fee.receiptNumber?.toLowerCase().includes(searchTerm)
      );
    }

    if (status) {
      filteredFees = filteredFees.filter(fee => 
        fee.status === status.toString()
      );
    }

    if (month) {
      filteredFees = filteredFees.filter(fee => 
        fee.month.toLowerCase().includes(month.toString().toLowerCase())
      );
    }

    // Calculate summary statistics
    const totalPaid = filteredFees
      .filter(fee => fee.status === 'paid')
      .reduce((sum, fee) => sum + fee.amount, 0);
    
    const totalPending = filteredFees
      .filter(fee => fee.status === 'pending')
      .reduce((sum, fee) => sum + fee.amount, 0);
    
    const totalOverdue = filteredFees
      .filter(fee => fee.status === 'overdue')
      .reduce((sum, fee) => sum + fee.amount, 0);

    const data = {
      fees: filteredFees,
      summary: {
        totalPaid,
        totalPending,
        totalOverdue,
        totalAmount: totalPaid + totalPending + totalOverdue,
        paidCount: filteredFees.filter(fee => fee.status === 'paid').length,
        pendingCount: filteredFees.filter(fee => fee.status === 'pending').length,
        overdueCount: filteredFees.filter(fee => fee.status === 'overdue').length
      },
      total: filteredFees.length,
      page: 1,
      limit: 50,
      totalPages: 1
    };
    
    res.json(data);
  } catch (error) {
    console.error('Fees GET error:', error);
    res.status(500).json({ error: 'Failed to fetch fees data' });
  }
});

// POST endpoint
router.post('/', requireAuth, (req, res) => {
  try {
    // Mock creation - replace with actual database operations
    const newItem = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    res.status(201).json({
      message: `${route} item created successfully`,
      data: newItem
    });
  } catch (error) {
    console.error(`${route} POST error:`, error);
    res.status(500).json({ error: `Failed to create ${route} item` });
  }
});

// PUT endpoint
router.put('/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock update - replace with actual database operations
    const updatedItem = {
      id: parseInt(id),
      ...req.body,
      updatedAt: new Date()
    };
    
    res.json({
      message: `${route} item updated successfully`,
      data: updatedItem
    });
  } catch (error) {
    console.error(`${route} PUT error:`, error);
    res.status(500).json({ error: `Failed to update ${route} item` });
  }
});

// DELETE endpoint
router.delete('/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock deletion - replace with actual database operations
    res.json({
      message: `${route} item deleted successfully`,
      deletedId: parseInt(id)
    });
  } catch (error) {
    console.error(`${route} DELETE error:`, error);
    res.status(500).json({ error: `Failed to delete ${route} item` });
  }
});

export default router;
