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
    // Mock students data - replace with actual database queries
    const mockStudents = [
      {
        id: 1,
        name: 'Arjun Sharma',
        email: 'arjun.sharma@email.com',
        phone: '+91 9876543210',
        age: 16,
        sport: 'Cricket',
        batch: 'Cricket A',
        feeStatus: 'paid',
        joinDate: '2024-01-15',
        parentName: 'Rajesh Sharma',
        parentPhone: '+91 9876543211',
        address: '123 MG Road, Nashik',
        emergencyContact: '+91 9876543212',
        medicalInfo: 'No known allergies',
        isActive: true
      },
      {
        id: 2,
        name: 'Priya Patel',
        email: 'priya.patel@email.com',
        phone: '+91 9876543213',
        age: 15,
        sport: 'Football',
        batch: 'Football B',
        feeStatus: 'pending',
        joinDate: '2024-02-01',
        parentName: 'Amit Patel',
        parentPhone: '+91 9876543214',
        address: '456 College Road, Nashik',
        emergencyContact: '+91 9876543215',
        medicalInfo: 'Asthma - carries inhaler',
        isActive: true
      },
      {
        id: 3,
        name: 'Rohit Kumar',
        email: 'rohit.kumar@email.com',
        phone: '+91 9876543216',
        age: 17,
        sport: 'Basketball',
        batch: 'Basketball A',
        feeStatus: 'overdue',
        joinDate: '2023-12-10',
        parentName: 'Suresh Kumar',
        parentPhone: '+91 9876543217',
        address: '789 Gandhi Nagar, Nashik',
        emergencyContact: '+91 9876543218',
        medicalInfo: 'Previous knee injury - cleared for sports',
        isActive: true
      },
      {
        id: 4,
        name: 'Sneha Desai',
        email: 'sneha.desai@email.com',
        phone: '+91 9876543219',
        age: 14,
        sport: 'Tennis',
        batch: 'Tennis A',
        feeStatus: 'paid',
        joinDate: '2024-03-01',
        parentName: 'Vikram Desai',
        parentPhone: '+91 9876543220',
        address: '321 Panchavati, Nashik',
        emergencyContact: '+91 9876543221',
        medicalInfo: 'No medical issues',
        isActive: true
      },
      {
        id: 5,
        name: 'Aditya Singh',
        email: 'aditya.singh@email.com',
        phone: '+91 9876543222',
        age: 16,
        sport: 'Badminton',
        batch: 'Badminton A',
        feeStatus: 'paid',
        joinDate: '2024-01-20',
        parentName: 'Ravi Singh',
        parentPhone: '+91 9876543223',
        address: '654 Satpur, Nashik',
        emergencyContact: '+91 9876543224',
        medicalInfo: 'Wears glasses',
        isActive: true
      }
    ];

    // Apply search filter if provided
    const { search, sportId, batchId } = req.query;
    let filteredStudents = mockStudents;

    if (search) {
      const searchTerm = search.toString().toLowerCase();
      filteredStudents = filteredStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.phone.includes(searchTerm) ||
        student.sport.toLowerCase().includes(searchTerm)
      );
    }

    if (sportId) {
      filteredStudents = filteredStudents.filter(student => 
        student.sport.toLowerCase() === sportId.toString().toLowerCase()
      );
    }

    if (batchId) {
      filteredStudents = filteredStudents.filter(student => 
        student.batch.toLowerCase() === batchId.toString().toLowerCase()
      );
    }

    const data = {
      students: filteredStudents,
      total: filteredStudents.length,
      page: 1,
      limit: 50,
      totalPages: 1
    };
    
    res.json(data);
  } catch (error) {
    console.error('Students GET error:', error);
    res.status(500).json({ error: 'Failed to fetch students data' });
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
