import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Clock, 
  Calendar, 
  Trophy, 
  Target, 
  User,
  Search,
  Filter
} from 'lucide-react';

export default function Batches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState<any>(null);
  const [batchForm, setBatchForm] = useState({
    name: '',
    sport: '',
    coach: '',
    skillLevel: 'beginner',
    maxCapacity: 20,
    schedule: {
      days: [] as string[],
      time: ''
    },
    isActive: true
  });

  // Mock data for batches
  const [batchesData, setBatchesData] = useState([
    {
      id: 1,
      name: 'Morning Cricket Batch',
      sport: 'Cricket',
      coach: 'Rahul Sharma',
      skillLevel: 'intermediate',
      currentStudents: 18,
      maxCapacity: 20,
      schedule: {
        days: ['monday', 'wednesday', 'friday'],
        time: '6:00 AM - 7:00 AM'
      },
      isActive: true,
      fees: 1500
    },
    {
      id: 2,
      name: 'Evening Football Batch',
      sport: 'Football',
      coach: 'Amit Kumar',
      skillLevel: 'beginner',
      currentStudents: 15,
      maxCapacity: 25,
      schedule: {
        days: ['tuesday', 'thursday', 'saturday'],
        time: '5:00 PM - 6:00 PM'
      },
      isActive: true,
      fees: 1200
    },
    {
      id: 3,
      name: 'Advanced Basketball',
      sport: 'Basketball',
      coach: 'Priya Singh',
      skillLevel: 'advanced',
      currentStudents: 12,
      maxCapacity: 15,
      schedule: {
        days: ['monday', 'tuesday', 'thursday', 'friday'],
        time: '4:00 PM - 5:00 PM'
      },
      isActive: true,
      fees: 1800
    },
    {
      id: 4,
      name: 'Tennis Beginners',
      sport: 'Tennis',
      coach: 'Suresh Patel',
      skillLevel: 'beginner',
      currentStudents: 8,
      maxCapacity: 12,
      schedule: {
        days: ['wednesday', 'saturday', 'sunday'],
        time: '7:00 AM - 8:00 AM'
      },
      isActive: true,
      fees: 2000
    },
    {
      id: 5,
      name: 'Swimming Advanced',
      sport: 'Swimming',
      coach: 'Neha Gupta',
      skillLevel: 'advanced',
      currentStudents: 6,
      maxCapacity: 10,
      schedule: {
        days: ['monday', 'wednesday', 'friday', 'sunday'],
        time: '8:00 AM - 9:00 AM'
      },
      isActive: false,
      fees: 2500
    }
  ]);

  const batchStats = {
    totalBatches: batchesData.length,
    activeBatches: batchesData.filter(batch => batch.isActive).length,
    totalStudents: batchesData.reduce((total, batch) => total + batch.currentStudents, 0),
    avgCapacity: Math.round(batchesData.reduce((total, batch) => total + (batch.currentStudents / batch.maxCapacity * 100), 0) / batchesData.length)
  };

  const filteredBatches = batchesData.filter(batch =>
    batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.coach.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBatch = () => {
    setBatchForm({
      name: '',
      sport: '',
      coach: '',
      skillLevel: 'beginner',
      maxCapacity: 20,
      schedule: {
        days: [],
        time: ''
      },
      isActive: true
    });
    setEditingBatch(null);
    setShowAddModal(true);
  };

  const handleEditBatch = (batch: any) => {
    setBatchForm({
      name: batch.name,
      sport: batch.sport,
      coach: batch.coach,
      skillLevel: batch.skillLevel,
      maxCapacity: batch.maxCapacity,
      schedule: batch.schedule,
      isActive: batch.isActive
    });
    setEditingBatch(batch);
    setShowAddModal(true);
  };

  const handleSubmitBatch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting batch:', batchForm);
    
    if (editingBatch) {
      // Update existing batch
      const updatedBatches = batchesData.map(batch => 
        batch.id === editingBatch.id 
          ? {
              ...batch,
              name: batchForm.name,
              sport: batchForm.sport,
              coach: batchForm.coach,
              skillLevel: batchForm.skillLevel,
              maxCapacity: batchForm.maxCapacity,
              schedule: batchForm.schedule,
              isActive: batchForm.isActive
            }
          : batch
      );
      setBatchesData(updatedBatches);
    } else {
      // Add new batch
      const newBatch = {
        id: batchesData.length + 1,
        name: batchForm.name,
        sport: batchForm.sport,
        coach: batchForm.coach,
        skillLevel: batchForm.skillLevel,
        currentStudents: 0,
        maxCapacity: batchForm.maxCapacity,
        schedule: batchForm.schedule,
        isActive: batchForm.isActive,
        fees: 1500 // Default fee
      };
      setBatchesData([...batchesData, newBatch]);
    }
    
    // Reset form and close modal
    setBatchForm({
      name: '',
      sport: '',
      coach: '',
      skillLevel: 'beginner',
      maxCapacity: 20,
      schedule: {
        days: [],
        time: ''
      },
      isActive: true
    });
    setEditingBatch(null);
    setShowAddModal(false);
  };

  const handleDeleteBatch = (batchId: number, batchName: string) => {
    if (confirm(`Are you sure you want to delete ${batchName}? This action cannot be undone.`)) {
      setBatchesData(batchesData.filter(batch => batch.id !== batchId));
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const formatDays = (days: string[]) => {
    const dayMap: { [key: string]: string } = {
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun'
    };
    return days.map(day => dayMap[day]).join(', ');
  };

  const timeSlots = [
    '5:00 AM - 6:00 AM',
    '6:00 AM - 7:00 AM',
    '7:00 AM - 8:00 AM',
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM'
  ];

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            Batch Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize and manage training batches
          </p>
        </div>
        <Button onClick={handleAddBatch} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Batch
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Batches</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{batchStats.totalBatches}</p>
              </div>
              <Trophy className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Batches</p>
                <p className="text-2xl font-bold text-green-600">{batchStats.activeBatches}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-purple-600">{batchStats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Capacity</p>
                <p className="text-2xl font-bold text-orange-600">{batchStats.avgCapacity}%</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Batches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search batches by name, sport, or coach..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBatches.map((batch) => (
          <Card key={batch.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    {batch.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getSkillLevelColor(batch.skillLevel)}>
                      {batch.skillLevel}
                    </Badge>
                    <Badge variant={batch.isActive ? "default" : "secondary"}>
                      {batch.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{batch.sport}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{batch.coach}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className={`text-sm font-medium ${getCapacityColor(batch.currentStudents, batch.maxCapacity)}`}>
                    {batch.currentStudents}/{batch.maxCapacity} Students
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{formatDays(batch.schedule.days)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{batch.schedule.time}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-lg font-semibold text-gray-900">₹{batch.fees}/month</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditBatch(batch)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteBatch(batch.id, batch.name)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Batch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {editingBatch ? 'Edit Batch' : 'Add New Batch'}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </Button>
            </div>
            
            <form onSubmit={handleSubmitBatch} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Batch Name</Label>
                  <Input
                    id="name"
                    value={batchForm.name}
                    onChange={(e) => setBatchForm({...batchForm, name: e.target.value})}
                    placeholder="e.g., Morning Cricket Batch"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maxCapacity">Max Capacity</Label>
                  <Input
                    id="maxCapacity"
                    type="number"
                    value={batchForm.maxCapacity}
                    onChange={(e) => setBatchForm({...batchForm, maxCapacity: parseInt(e.target.value)})}
                    placeholder="20"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sport">Sport</Label>
                  <select
                    id="sport"
                    value={batchForm.sport}
                    onChange={(e) => setBatchForm({...batchForm, sport: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select sport</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Swimming">Swimming</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="coach">Coach</Label>
                  <select
                    id="coach"
                    value={batchForm.coach}
                    onChange={(e) => setBatchForm({...batchForm, coach: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select coach</option>
                    <option value="Rahul Sharma">Rahul Sharma</option>
                    <option value="Amit Kumar">Amit Kumar</option>
                    <option value="Priya Singh">Priya Singh</option>
                    <option value="Suresh Patel">Suresh Patel</option>
                    <option value="Neha Gupta">Neha Gupta</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="skillLevel">Skill Level</Label>
                  <select
                    id="skillLevel"
                    value={batchForm.skillLevel}
                    onChange={(e) => setBatchForm({...batchForm, skillLevel: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="time">Training Time</Label>
                  <select
                    id="time"
                    value={batchForm.schedule.time}
                    onChange={(e) => setBatchForm({
                      ...batchForm, 
                      schedule: {...batchForm.schedule, time: e.target.value}
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <Label>Training Days</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {daysOfWeek.map((day) => (
                    <div key={day.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={day.value}
                        checked={batchForm.schedule.days.includes(day.value)}
                        onChange={(e) => {
                          const currentDays = batchForm.schedule.days;
                          if (e.target.checked) {
                            setBatchForm({
                              ...batchForm,
                              schedule: {
                                ...batchForm.schedule,
                                days: [...currentDays, day.value]
                              }
                            });
                          } else {
                            setBatchForm({
                              ...batchForm,
                              schedule: {
                                ...batchForm.schedule,
                                days: currentDays.filter(d => d !== day.value)
                              }
                            });
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={day.value} className="text-sm">
                        {day.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={batchForm.isActive}
                  onChange={(e) => setBatchForm({...batchForm, isActive: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBatch ? 'Update' : 'Create'} Batch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}