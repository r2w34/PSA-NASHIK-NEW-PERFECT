import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download
} from 'lucide-react';

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for attendance
  const mockAttendanceStats = {
    totalStudents: 45,
    presentToday: 38,
    absentToday: 7,
    attendanceRate: 84.4,
    lateArrivals: 3
  };

  const mockBatches = [
    { id: 1, name: 'Morning A (6:00 AM - 8:00 AM)', sport: 'Cricket' },
    { id: 2, name: 'Morning B (8:00 AM - 10:00 AM)', sport: 'Football' },
    { id: 3, name: 'Evening A (4:00 PM - 6:00 PM)', sport: 'Basketball' },
    { id: 4, name: 'Evening B (6:00 PM - 8:00 PM)', sport: 'Tennis' }
  ];

  const mockAttendanceData = [
    {
      id: 1,
      studentId: 'STU001',
      name: 'Arjun Sharma',
      batch: 'Morning A (6:00 AM - 8:00 AM)',
      sport: 'Cricket',
      status: 'Present',
      checkInTime: '06:15 AM',
      avatar: 'AS'
    },
    {
      id: 2,
      studentId: 'STU002',
      name: 'Priya Patel',
      batch: 'Morning A (6:00 AM - 8:00 AM)',
      sport: 'Cricket',
      status: 'Present',
      checkInTime: '06:10 AM',
      avatar: 'PP'
    },
    {
      id: 3,
      studentId: 'STU003',
      name: 'Rahul Kumar',
      batch: 'Morning A (6:00 AM - 8:00 AM)',
      sport: 'Cricket',
      status: 'Absent',
      checkInTime: '-',
      avatar: 'RK'
    },
    {
      id: 4,
      studentId: 'STU004',
      name: 'Sneha Singh',
      batch: 'Evening A (4:00 PM - 6:00 PM)',
      sport: 'Basketball',
      status: 'Present',
      checkInTime: '04:05 PM',
      avatar: 'SS'
    },
    {
      id: 5,
      studentId: 'STU005',
      name: 'Vikram Joshi',
      batch: 'Evening A (4:00 PM - 6:00 PM)',
      sport: 'Basketball',
      status: 'Late',
      checkInTime: '04:25 PM',
      avatar: 'VJ'
    }
  ];

  const filteredAttendance = mockAttendanceData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = !selectedBatch || student.batch === selectedBatch;
    return matchesSearch && matchesBatch;
  });

  const handleMarkAttendance = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    console.log(`Marking ${studentId} as ${status}`);
    // Here you would make an API call to update attendance
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Absent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'Late': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle className="h-4 w-4" />;
      case 'Absent': return <XCircle className="h-4 w-4" />;
      case 'Late': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            Attendance Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage daily student attendance
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockAttendanceStats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Present Today</p>
                <p className="text-2xl font-bold text-green-600">{mockAttendanceStats.presentToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Absent Today</p>
                <p className="text-2xl font-bold text-red-600">{mockAttendanceStats.absentToday}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance Rate</p>
                <p className="text-2xl font-bold text-blue-600">{mockAttendanceStats.attendanceRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Late Arrivals</p>
                <p className="text-2xl font-bold text-yellow-600">{mockAttendanceStats.lateArrivals}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Batch
              </label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Batches</option>
                {mockBatches.map(batch => (
                  <option key={batch.id} value={batch.name}>{batch.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Student
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance - {selectedDate}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Student</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Batch</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Sport</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Check-in Time</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                            {student.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{student.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{student.batch}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{student.sport}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                        {getStatusIcon(student.status)}
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{student.checkInTime}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAttendance(student.studentId, 'Present')}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAttendance(student.studentId, 'Absent')}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Absent
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAttendance(student.studentId, 'Late')}
                          className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                        >
                          Late
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
    </div>
  );
}