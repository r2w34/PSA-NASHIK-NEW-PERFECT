import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail
} from 'lucide-react';

export default function Students() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    sport: '',
    batch: '',
    parentName: '',
    parentPhone: '',
    address: '',
    emergencyContact: '',
    medicalInfo: ''
  });

  const { data: studentsData, isLoading, refetch } = useQuery({
    queryKey: ['/api/students', { search: searchQuery, sport: selectedSport, batch: selectedBatch }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedSport) params.append('sportId', selectedSport);
      if (selectedBatch) params.append('batchId', selectedBatch);
      
      const response = await fetch(`/api/students?${params}`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      return response.json();
    },
  });

  const { data: sports } = useQuery({
    queryKey: ['/api/sports'],
    queryFn: async () => {
      const response = await fetch('/api/sports', { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch sports');
      return response.json();
    },
  });

  const { data: batches } = useQuery({
    queryKey: ['/api/batches'],
    queryFn: async () => {
      const response = await fetch('/api/batches', { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch batches');
      return response.json();
    },
  });

  const handleExport = () => {
    // Export functionality
    console.log('Exporting students data...');
  };

  const mockStudents = [
    {
      id: 1,
      studentId: 'STU001',
      name: 'Arjun Sharma',
      email: 'arjun.sharma@email.com',
      phone: '+91 9876543210',
      sport: 'Cricket',
      batch: 'Morning A',
      joiningDate: '2024-01-15',
      feeStatus: 'Paid',
      isActive: true
    },
    {
      id: 2,
      studentId: 'STU002',
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      phone: '+91 9876543211',
      sport: 'Football',
      batch: 'Evening B',
      joiningDate: '2024-02-01',
      feeStatus: 'Pending',
      isActive: true
    },
    {
      id: 3,
      studentId: 'STU003',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      phone: '+91 9876543212',
      sport: 'Basketball',
      batch: 'Morning C',
      joiningDate: '2024-01-20',
      feeStatus: 'Overdue',
      isActive: true
    }
  ];

  const students = studentsData?.students || mockStudents;

  const handleAddStudent = () => {
    setShowAddStudentModal(true);
  };

  const handleCloseModal = () => {
    setShowAddStudentModal(false);
    setStudentForm({
      name: '',
      email: '',
      phone: '',
      age: '',
      sport: '',
      batch: '',
      parentName: '',
      parentPhone: '',
      address: '',
      emergencyContact: '',
      medicalInfo: ''
    });
  };

  const handleSubmitStudent = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding student:', studentForm);
    // Here you would typically make an API call to add the student
    handleCloseModal();
    refetch(); // Refresh the students list
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Students Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {students.length} students enrolled
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={() => refetch()} variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleAddStudent} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="">All Sports</option>
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="">All Batches</option>
              <option value="morning-a">Morning A</option>
              <option value="evening-b">Evening B</option>
              <option value="morning-c">Morning C</option>
            </select>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sport & Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Fee Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {student.studentId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {student.email}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {student.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{student.sport}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{student.batch}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.feeStatus === 'Paid' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : student.feeStatus === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {student.feeStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Student</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitStudent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                    placeholder="Enter student's full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age *
                  </label>
                  <Input
                    type="number"
                    value={studentForm.age}
                    onChange={(e) => setStudentForm({...studentForm, age: e.target.value})}
                    placeholder="Enter age"
                    min="5"
                    max="25"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({...studentForm, phone: e.target.value})}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sport *
                  </label>
                  <select
                    value={studentForm.sport}
                    onChange={(e) => setStudentForm({...studentForm, sport: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">Select sport</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Badminton">Badminton</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Batch *
                  </label>
                  <select
                    value={studentForm.batch}
                    onChange={(e) => setStudentForm({...studentForm, batch: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">Select batch</option>
                    <option value="Morning A">Morning A (6:00 AM - 8:00 AM)</option>
                    <option value="Morning B">Morning B (8:00 AM - 10:00 AM)</option>
                    <option value="Evening A">Evening A (4:00 PM - 6:00 PM)</option>
                    <option value="Evening B">Evening B (6:00 PM - 8:00 PM)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <Input
                    type="text"
                    value={studentForm.parentName}
                    onChange={(e) => setStudentForm({...studentForm, parentName: e.target.value})}
                    placeholder="Enter parent/guardian name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Parent Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={studentForm.parentPhone}
                    onChange={(e) => setStudentForm({...studentForm, parentPhone: e.target.value})}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <textarea
                  value={studentForm.address}
                  onChange={(e) => setStudentForm({...studentForm, address: e.target.value})}
                  placeholder="Enter complete address"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Contact
                </label>
                <Input
                  type="tel"
                  value={studentForm.emergencyContact}
                  onChange={(e) => setStudentForm({...studentForm, emergencyContact: e.target.value})}
                  placeholder="Emergency contact number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medical Information
                </label>
                <textarea
                  value={studentForm.medicalInfo}
                  onChange={(e) => setStudentForm({...studentForm, medicalInfo: e.target.value})}
                  placeholder="Any medical conditions, allergies, or special requirements"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Add Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}