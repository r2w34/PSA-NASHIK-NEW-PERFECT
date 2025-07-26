import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  UserPlus, 
  Banknote, 
  Calendar, 
  FileText, 
  Users, 
  Grid3X3,
  Search,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  UserCheck,
  Trophy,
  Brain,
  RefreshCw
} from 'lucide-react';
import { Link } from 'wouter';
import { formatCurrency } from '@/lib/utils';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      name: 'Add Student',
      href: '/students',
      icon: UserPlus,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Enroll new student'
    },
    {
      name: 'Record Payment',
      href: '/fees',
      icon: Banknote,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Collect fee payment'
    },
    {
      name: 'Mark Attendance',
      href: '/attendance',
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Take daily attendance'
    },
    {
      name: 'Generate Report',
      href: '/reports',
      icon: FileText,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Create detailed reports'
    },
    {
      name: 'View Students',
      href: '/students',
      icon: Users,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      description: 'Manage student records'
    },
    {
      name: 'Manage Batches',
      href: '/batches',
      icon: Grid3X3,
      color: 'bg-pink-600 hover:bg-pink-700',
      description: 'Organize training batches'
    }
  ];

  const aiInsights = [
    {
      title: 'Revenue Growth',
      description: 'Monthly revenue increased by 15% compared to last month',
      confidence: 92,
      type: 'positive'
    },
    {
      title: 'Attendance Alert',
      description: 'Cricket batch attendance dropped by 8% this week',
      confidence: 88,
      type: 'warning'
    },
    {
      title: 'Capacity Optimization',
      description: 'Consider adding evening batch for Football',
      confidence: 95,
      type: 'suggestion'
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Here's what's happening at your academy today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 w-full sm:w-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Link href="/reports">
              <Button 
                variant="outline" 
                size="sm" 
                className="hover:bg-gray-50 dark:hover:bg-gray-700 w-full sm:w-auto"
              >
                <FileText className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Student Search Bar */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search students by name, ID, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white dark:bg-gray-800"
            />
          </div>
          {searchQuery && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Search results for "{searchQuery}" will appear here
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.name} href={action.href}>
                  <Button 
                    variant="outline" 
                    className={`h-20 sm:h-24 w-full flex flex-col items-center justify-center space-y-2 hover:text-white transition-all duration-200 hover:shadow-lg ${action.color}`}
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    <div className="text-center">
                      <div className="text-xs font-medium">{action.name}</div>
                      <div className="text-xs opacity-75 hidden sm:block">{action.description}</div>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {stats?.totalStudents || 245}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Coaches</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {stats?.activeCoaches || 12}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +2 new this month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(stats?.monthlyRevenue || 125000)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {stats?.attendanceRate || 87}%
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -3% from last week
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights and Sports Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="xl:col-span-2">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    AI Insights
                  </CardTitle>
                  <CardDescription>Intelligent recommendations for your academy</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{insight.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{insight.description}</p>
                      <div className="flex items-center mt-2">
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          Confidence: {insight.confidence}%
                        </div>
                        <div className={`ml-2 w-2 h-2 rounded-full ${
                          insight.type === 'positive' ? 'bg-green-500' :
                          insight.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sports Distribution */}
        <div>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                Sports Distribution
              </CardTitle>
              <CardDescription>Student enrollment by sport</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Cricket', students: 85, color: 'bg-blue-500' },
                  { name: 'Football', students: 72, color: 'bg-green-500' },
                  { name: 'Basketball', students: 45, color: 'bg-yellow-500' },
                  { name: 'Tennis', students: 28, color: 'bg-purple-500' },
                  { name: 'Badminton', students: 15, color: 'bg-pink-500' }
                ].map((sport) => (
                  <div key={sport.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${sport.color}`}></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{sport.name}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{sport.students}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}