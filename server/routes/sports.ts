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
    // Mock sports data - replace with actual database queries
    const mockSports = [
      {
        id: 1,
        name: 'Cricket',
        description: 'Traditional cricket training with professional coaching',
        category: 'Team Sport',
        equipment: ['Bat', 'Ball', 'Pads', 'Helmet', 'Gloves'],
        ageGroups: ['Under 14', 'Under 16', 'Under 19', 'Senior'],
        isActive: true,
        studentsCount: 85,
        coachesCount: 3
      },
      {
        id: 2,
        name: 'Football',
        description: 'Football training focusing on skills and teamwork',
        category: 'Team Sport',
        equipment: ['Football', 'Cones', 'Goals', 'Jerseys'],
        ageGroups: ['Under 12', 'Under 14', 'Under 16', 'Senior'],
        isActive: true,
        studentsCount: 72,
        coachesCount: 2
      },
      {
        id: 3,
        name: 'Basketball',
        description: 'Basketball training with focus on fundamentals',
        category: 'Team Sport',
        equipment: ['Basketball', 'Hoops', 'Jerseys'],
        ageGroups: ['Under 14', 'Under 16', 'Under 19'],
        isActive: true,
        studentsCount: 45,
        coachesCount: 2
      },
      {
        id: 4,
        name: 'Tennis',
        description: 'Individual tennis coaching for all skill levels',
        category: 'Individual Sport',
        equipment: ['Racket', 'Tennis Balls', 'Net'],
        ageGroups: ['Under 12', 'Under 14', 'Under 16', 'Adult'],
        isActive: true,
        studentsCount: 28,
        coachesCount: 2
      },
      {
        id: 5,
        name: 'Badminton',
        description: 'Badminton training for competitive and recreational play',
        category: 'Individual Sport',
        equipment: ['Racket', 'Shuttlecocks', 'Net'],
        ageGroups: ['Under 12', 'Under 14', 'Under 16', 'Adult'],
        isActive: true,
        studentsCount: 15,
        coachesCount: 1
      }
    ];

    const data = {
      sports: mockSports,
      total: mockSports.length
    };
    
    res.json(data);
  } catch (error) {
    console.error('Sports GET error:', error);
    res.status(500).json({ error: 'Failed to fetch sports data' });
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
