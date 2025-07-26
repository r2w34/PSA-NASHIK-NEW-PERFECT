import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Trophy, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  IndianRupee, 
  Activity,
  Search,
  Filter
} from 'lucide-react';

export default function Sports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSport, setEditingSport] = useState<any>(null);
  const [sportForm, setSportForm] = useState({
    name: '',
    description: '',
    baseAmount: '',
    beginnerFee: '',
    intermediateFee: '',
    advancedFee: '',
    isActive: true
  });

  // State for sports data
  const [sportsData, setSportsData] = useState([
    {
      id: 1,
      name: 'Cricket',
      description: 'Professional cricket training with experienced coaches',
      studentsCount: 45,
      coachesCount: 3,
      feeStructure: {
        baseAmount: 1000,
        skillLevels: {
          beginner: 1000,
          intermediate: 1500,
          advanced: 2000
        }
      },
      isActive: true,
      equipment: ['Bats', 'Balls', 'Pads', 'Helmets'],
      facilities: ['Cricket Ground', 'Practice Nets', 'Pavilion']
    },
    {
      id: 2,
      name: 'Football',
      description: 'Football training focusing on skills and teamwork',
      studentsCount: 38,
      coachesCount: 2,
      feeStructure: {
        baseAmount: 800,
        skillLevels: {
          beginner: 800,
          intermediate: 1200,
          advanced: 1600
        }
      },
      isActive: true,
      equipment: ['Footballs', 'Cones', 'Goals', 'Jerseys'],
      facilities: ['Football Field', 'Training Ground']
    },
    {
      id: 3,
      name: 'Basketball',
      description: 'Indoor basketball training with focus on fundamentals',
      studentsCount: 28,
      coachesCount: 2,
      feeStructure: {
        baseAmount: 900,
        skillLevels: {
          beginner: 900,
          intermediate: 1300,
          advanced: 1700
        }
      },
      isActive: true,
      equipment: ['Basketballs', 'Hoops', 'Jerseys'],
      facilities: ['Indoor Court', 'Practice Area']
    },
    {
      id: 4,
      name: 'Tennis',
      description: 'Professional tennis coaching for all skill levels',
      studentsCount: 22,
      coachesCount: 2,
      feeStructure: {
        baseAmount: 1200,
        skillLevels: {
          beginner: 1200,
          intermediate: 1800,
          advanced: 2400
        }
      },
      isActive: true,
      equipment: ['Rackets', 'Tennis Balls', 'Nets'],
      facilities: ['Tennis Courts', 'Practice Wall']
    },
    {
      id: 5,
      name: 'Swimming',
      description: 'Swimming lessons and competitive training',
      studentsCount: 35,
      coachesCount: 2,
      feeStructure: {
        baseAmount: 1500,
        skillLevels: {
          beginner: 1500,
          intermediate: 2000,
          advanced: 2500
        }
      },
      isActive: false,
      equipment: ['Kickboards', 'Pool Noodles', 'Goggles'],
      facilities: ['Swimming Pool', 'Changing Rooms']
    }
  ]);

  const mockSportsStats = {
    totalSports: sportsData.length,
    activeSports: sportsData.filter(sport => sport.isActive).length,
    totalStudents: sportsData.reduce((total, sport) => total + sport.studentsCount, 0),
    totalRevenue: 189600
  };

  const filteredSports = sportsData.filter(sport =>
    sport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sport.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSport = () => {
    setSportForm({
      name: '',
      description: '',
      baseAmount: '',
      beginnerFee: '',
      intermediateFee: '',
      advancedFee: '',
      isActive: true
    });
    setEditingSport(null);
    setShowAddModal(true);
  };

  const handleEditSport = (sport: any) => {
    setSportForm({
      name: sport.name,
      description: sport.description,
      baseAmount: sport.feeStructure.baseAmount.toString(),
      beginnerFee: sport.feeStructure.skillLevels.beginner.toString(),
      intermediateFee: sport.feeStructure.skillLevels.intermediate.toString(),
      advancedFee: sport.feeStructure.skillLevels.advanced.toString(),
      isActive: sport.isActive
    });
    setEditingSport(sport);
    setShowAddModal(true);
  };

  const handleDeleteSport = (sportId: number, sportName: string) => {
    if (confirm(`Are you sure you want to delete ${sportName}? This action cannot be undone.`)) {
      console.log(`Deleting sport with ID: ${sportId}`);
      // Here you would make an API call to delete the sport
    }
  };

  const handleSubmitSport = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting sport:', sportForm);
    
    if (editingSport) {
      // Update existing sport
      const updatedSports = sportsData.map(sport => 
        sport.id === editingSport.id 
          ? {
              ...sport,
              name: sportForm.name,
              description: sportForm.description,
              feeStructure: {
                baseAmount: parseInt(sportForm.baseAmount),
                skillLevels: {
                  beginner: parseInt(sportForm.beginnerFee),
                  intermediate: parseInt(sportForm.intermediateFee),
                  advanced: parseInt(sportForm.advancedFee)
                }
              },
              isActive: sportForm.isActive
            }
          : sport
      );
      console.log('Updated sports:', updatedSports);
      setSportsData(updatedSports);
    } else {
      // Add new sport
      const newSport = {
        id: sportsData.length + 1,
        name: sportForm.name,
        description: sportForm.description,
        studentsCount: 0,
        coachesCount: 0,
        feeStructure: {
          baseAmount: parseInt(sportForm.baseAmount),
          skillLevels: {
            beginner: parseInt(sportForm.beginnerFee),
            intermediate: parseInt(sportForm.intermediateFee),
            advanced: parseInt(sportForm.advancedFee)
          }
        },
        isActive: sportForm.isActive,
        equipment: [],
        facilities: []
      };
      setSportsData([...sportsData, newSport]);
      console.log('Added new sport:', newSport);
    }
    
    // Reset form and close modal
    setSportForm({
      name: '',
      description: '',
      baseAmount: '',
      beginnerFee: '',
      intermediateFee: '',
      advancedFee: '',
      isActive: true
    });
    setEditingSport(null);
    setShowAddModal(false);
  };

  const handleToggleStatus = (sportId: number, currentStatus: boolean) => {
    console.log(`Toggling sport ${sportId} status from ${currentStatus} to ${!currentStatus}`);
    // Here you would make an API call to update the sport status
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Trophy className="h-8 w-8 text-blue-600" />
            Sports Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage sports and activities offered at your academy
          </p>
        </div>
        <Button onClick={handleAddSport} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Sport
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sports</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockSportsStats.totalSports}</p>
              </div>
              <Trophy className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Sports</p>
                <p className="text-2xl font-bold text-green-600">{mockSportsStats.activeSports}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-purple-600">{mockSportsStats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-orange-600">₹{mockSportsStats.totalRevenue.toLocaleString()}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Sports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search sports by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSports.map((sport) => (
          <Card key={sport.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  {sport.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sport.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                    {sport.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {sport.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{sport.studentsCount}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Students</p>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Activity className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{sport.coachesCount}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Coaches</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Fee Structure</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="font-medium">Beginner</p>
                    <p className="text-green-600">₹{sport.feeStructure.skillLevels.beginner}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="font-medium">Intermediate</p>
                    <p className="text-blue-600">₹{sport.feeStructure.skillLevels.intermediate}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="font-medium">Advanced</p>
                    <p className="text-purple-600">₹{sport.feeStructure.skillLevels.advanced}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditSport(sport)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleStatus(sport.id, sport.isActive)}
                  className={sport.isActive ? 'text-red-600 border-red-200 hover:bg-red-50' : 'text-green-600 border-green-200 hover:bg-green-50'}
                >
                  {sport.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteSport(sport.id, sport.name)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Sport Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingSport ? 'Edit Sport' : 'Add New Sport'}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </Button>
            </div>

            <form onSubmit={handleSubmitSport} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sport Name *
                  </label>
                  <Input
                    type="text"
                    value={sportForm.name}
                    onChange={(e) => setSportForm({...sportForm, name: e.target.value})}
                    placeholder="Enter sport name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Base Amount (₹) *
                  </label>
                  <Input
                    type="number"
                    value={sportForm.baseAmount}
                    onChange={(e) => setSportForm({...sportForm, baseAmount: e.target.value})}
                    placeholder="Enter base amount"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={sportForm.description}
                  onChange={(e) => setSportForm({...sportForm, description: e.target.value})}
                  placeholder="Enter sport description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Fee Structure by Skill Level</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Beginner Fee (₹) *
                    </label>
                    <Input
                      type="number"
                      value={sportForm.beginnerFee}
                      onChange={(e) => setSportForm({...sportForm, beginnerFee: e.target.value})}
                      placeholder="Beginner fee"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Intermediate Fee (₹) *
                    </label>
                    <Input
                      type="number"
                      value={sportForm.intermediateFee}
                      onChange={(e) => setSportForm({...sportForm, intermediateFee: e.target.value})}
                      placeholder="Intermediate fee"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Advanced Fee (₹) *
                    </label>
                    <Input
                      type="number"
                      value={sportForm.advancedFee}
                      onChange={(e) => setSportForm({...sportForm, advancedFee: e.target.value})}
                      placeholder="Advanced fee"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={sportForm.isActive}
                  onChange={(e) => setSportForm({...sportForm, isActive: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Active Sport
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingSport ? 'Update Sport' : 'Create Sport'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}