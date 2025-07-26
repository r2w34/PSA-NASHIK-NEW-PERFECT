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
  Trophy, 
  Calendar,
  Search,
  Phone,
  Mail,
  Award,
  User,
  UserCheck,
  GraduationCap
} from 'lucide-react';

export default function Coaches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCoach, setEditingCoach] = useState<any>(null);
  const [coachForm, setCoachForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: 0,
    qualifications: '',
    isActive: true
  });

  // Mock data for coaches
  const [coachesData, setCoachesData] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@psa.com',
      phone: '+91 9876543210',
      specialization: 'Cricket',
      experience: 8,
      qualifications: 'Level 2 Coaching Certificate',
      isActive: true,
      studentsCount: 25,
      batchesCount: 2,
      joinedDate: '2020-03-15'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya.patel@psa.com',
      phone: '+91 9876543211',
      specialization: 'Swimming',
      experience: 6,
      qualifications: 'B.P.Ed, Swimming Instructor Certificate',
      isActive: true,
      studentsCount: 18,
      batchesCount: 2,
      joinedDate: '2021-01-20'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit.kumar@psa.com',
      phone: '+91 9876543212',
      specialization: 'Football',
      experience: 10,
      qualifications: 'UEFA B License',
      isActive: true,
      studentsCount: 30,
      batchesCount: 3,
      joinedDate: '2019-08-10'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@psa.com',
      phone: '+91 9876543213',
      specialization: 'Badminton',
      experience: 5,
      qualifications: 'State Level Player, Coaching Diploma',
      isActive: true,
      studentsCount: 22,
      batchesCount: 2,
      joinedDate: '2022-02-14'
    },
    {
      id: 5,
      name: 'Vikash Singh',
      email: 'vikash.singh@psa.com',
      phone: '+91 9876543214',
      specialization: 'Basketball',
      experience: 7,
      qualifications: 'Former Professional Player',
      isActive: false,
      studentsCount: 7,
      batchesCount: 1,
      joinedDate: '2020-11-05'
    }
  ]);

  const filteredCoaches = coachesData.filter(coach =>
    coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: coachesData.length,
    active: coachesData.filter(c => c.isActive).length,
    totalStudents: coachesData.reduce((sum, c) => sum + c.studentsCount, 0),
    avgExperience: Math.round(coachesData.reduce((sum, c) => sum + c.experience, 0) / coachesData.length)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCoach) {
      // Update existing coach
      setCoachesData(coachesData.map(coach => 
        coach.id === editingCoach.id 
          ? { ...coach, ...coachForm }
          : coach
      ));
      setEditingCoach(null);
    } else {
      // Add new coach
      const newCoach = {
        id: Date.now(),
        ...coachForm,
        joinedDate: new Date().toISOString().split('T')[0],
        studentsCount: 0,
        batchesCount: 0
      };
      setCoachesData([...coachesData, newCoach]);
    }
    
    setShowAddModal(false);
    setCoachForm({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: 0,
      qualifications: '',
      isActive: true
    });
  };

  const handleEdit = (coach: any) => {
    setEditingCoach(coach);
    setCoachForm({
      name: coach.name,
      email: coach.email,
      phone: coach.phone,
      specialization: coach.specialization,
      experience: coach.experience,
      qualifications: coach.qualifications,
      isActive: coach.isActive
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this coach?')) {
      setCoachesData(coachesData.filter(coach => coach.id !== id));
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 gradient-card rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            Coach Management
          </h1>
          <p className="text-gray-400 mt-2">Manage coach profiles and assignments</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Coach
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="stat-card gradient-card-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Coaches</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="stat-card gradient-card-green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active Coaches</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{stats.active}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="stat-card gradient-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Students</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{stats.totalStudents}</p>
            </div>
            <GraduationCap className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        
        <div className="stat-card gradient-card-orange">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Avg. Experience</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{stats.avgExperience} <span className="text-sm font-normal">years</span></p>
            </div>
            <Award className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-4 lg:p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-purple-400" />
          Search Coaches
        </h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search coaches by name, specialization, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredCoaches.map((coach) => (
          <div key={coach.id} className="glass-card rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
            <div className="p-4 lg:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-card rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{coach.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        className={`px-2 py-1 text-xs rounded-full ${
                          coach.isActive 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}
                      >
                        {coach.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-1 text-xs rounded-full">
                        Expert
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Award className="h-4 w-4 text-purple-400" />
                  <span>{coach.specialization}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span className="truncate">{coach.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Phone className="h-4 w-4 text-purple-400" />
                  <span>{coach.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span>{coach.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span>{coach.studentsCount} students, {coach.batchesCount} batches</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span>Joined: {new Date(coach.joinedDate).toLocaleDateString()}</span>
                </div>
                <div className="mt-3 p-3 bg-white/5 rounded-lg">
                  <p className="text-sm text-gray-300">{coach.qualifications}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button
                  onClick={() => handleEdit(coach)}
                  className="btn-secondary flex items-center gap-2 flex-1"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(coach.id)}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Coach Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingCoach ? 'Edit Coach' : 'Add New Coach'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCoach(null);
                  setCoachForm({
                    name: '',
                    email: '',
                    phone: '',
                    specialization: '',
                    experience: 0,
                    qualifications: '',
                    isActive: true
                  });
                }}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Full Name</Label>
                  <input
                    type="text"
                    value={coachForm.name}
                    onChange={(e) => setCoachForm({ ...coachForm, name: e.target.value })}
                    className="form-input"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <Label className="text-white mb-2 block">Email</Label>
                  <input
                    type="email"
                    value={coachForm.email}
                    onChange={(e) => setCoachForm({ ...coachForm, email: e.target.value })}
                    className="form-input"
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Phone Number</Label>
                  <input
                    type="tel"
                    value={coachForm.phone}
                    onChange={(e) => setCoachForm({ ...coachForm, phone: e.target.value })}
                    className="form-input"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <Label className="text-white mb-2 block">Specialization</Label>
                  <select
                    value={coachForm.specialization}
                    onChange={(e) => setCoachForm({ ...coachForm, specialization: e.target.value })}
                    className="form-select"
                    required
                  >
                    <option value="">Select specialization</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Athletics">Athletics</option>
                    <option value="Volleyball">Volleyball</option>
                    <option value="Table Tennis">Table Tennis</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Experience (Years)</Label>
                  <input
                    type="number"
                    min="0"
                    value={coachForm.experience}
                    onChange={(e) => setCoachForm({ ...coachForm, experience: parseInt(e.target.value) || 0 })}
                    className="form-input"
                    placeholder="Years of experience"
                    required
                  />
                </div>
                <div>
                  <Label className="text-white mb-2 block">Qualifications</Label>
                  <select
                    value={coachForm.qualifications}
                    onChange={(e) => setCoachForm({ ...coachForm, qualifications: e.target.value })}
                    className="form-select"
                    required
                  >
                    <option value="">Select qualification</option>
                    <option value="B.P.Ed (Bachelor of Physical Education)">B.P.Ed (Bachelor of Physical Education)</option>
                    <option value="M.P.Ed (Master of Physical Education)">M.P.Ed (Master of Physical Education)</option>
                    <option value="Diploma in Sports Coaching">Diploma in Sports Coaching</option>
                    <option value="Certificate in Sports Training">Certificate in Sports Training</option>
                    <option value="Level 1 Coaching Certificate">Level 1 Coaching Certificate</option>
                    <option value="Level 2 Coaching Certificate">Level 2 Coaching Certificate</option>
                    <option value="Former Professional Player">Former Professional Player</option>
                    <option value="State Level Player">State Level Player</option>
                    <option value="Fitness Trainer Certification">Fitness Trainer Certification</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={coachForm.isActive}
                  onChange={(e) => setCoachForm({ ...coachForm, isActive: e.target.checked })}
                  className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                />
                <Label htmlFor="isActive" className="text-white">Active</Label>
              </div>
              
              <div className="flex gap-3 pt-6">
                <Button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCoach(null);
                    setCoachForm({
                      name: '',
                      email: '',
                      phone: '',
                      specialization: '',
                      experience: 0,
                      qualifications: '',
                      isActive: true
                    });
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary flex-1">
                  {editingCoach ? 'Update Coach' : 'Create Coach'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}