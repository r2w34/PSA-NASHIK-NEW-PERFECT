import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { toast } from '../lib/toast';

interface ReportData {
  id: string;
  name: string;
  description: string;
  type: 'financial' | 'operational' | 'analytics';
  data?: any;
}

interface DateRange {
  start: string;
  end: string;
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'financial' | 'operational' | 'analytics'>('financial');
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  // Mock data for development
  const mockRevenueData = {
    totalRevenue: 125000,
    monthlyGrowth: 12.5,
    dailyCollections: [
      { date: '2024-01-01', amount: 4500 },
      { date: '2024-01-02', amount: 3200 },
      { date: '2024-01-03', amount: 5100 },
      { date: '2024-01-04', amount: 2800 },
      { date: '2024-01-05', amount: 4200 }
    ]
  };

  const mockAttendanceData = {
    overallRate: 87,
    batchWise: [
      { batch: 'Morning A', rate: 92 },
      { batch: 'Morning B', rate: 88 },
      { batch: 'Evening A', rate: 85 },
      { batch: 'Evening B', rate: 83 }
    ]
  };

  const { data: revenueData = mockRevenueData } = useQuery({
    queryKey: ['revenue-report', dateRange],
    queryFn: () => api.get(`/reports/revenue?start=${dateRange.start}&end=${dateRange.end}`),
    initialData: mockRevenueData
  });

  const { data: attendanceData = mockAttendanceData } = useQuery({
    queryKey: ['attendance-report', dateRange],
    queryFn: () => api.get(`/reports/attendance?start=${dateRange.start}&end=${dateRange.end}`),
    initialData: mockAttendanceData
  });

  const generateReport = async (reportType: string) => {
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock CSV data
      const csvData = `Report Type,${reportType}\nDate Range,${dateRange.start} to ${dateRange.end}\nGenerated At,${new Date().toISOString()}\n\nSample Data:\nMetric,Value\nTotal Students,245\nActive Coaches,12\nRevenue,₹125000\nAttendance Rate,87%`;
      
      // Create and download file
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast.success(`${reportType} report generated and downloaded successfully!`);
    } catch (error) {
      toast.error(`Failed to generate ${reportType} report. Please try again.`);
    }
  };

  const financialReports = [
    {
      id: 'daily-collection',
      name: 'Daily Collection Report',
      description: 'Summary of daily payment collections',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'monthly-revenue',
      name: 'Monthly Revenue Analysis',
      description: 'Detailed monthly revenue breakdown',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'outstanding-fees',
      name: 'Outstanding Fees Report',
      description: 'Pending and overdue payments',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
        </svg>
      )
    }
  ];

  const operationalReports = [
    {
      id: 'attendance-summary',
      name: 'Attendance Summary',
      description: 'Batch-wise attendance statistics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
        </svg>
      )
    },
    {
      id: 'enrollment-report',
      name: 'Student Enrollment Report',
      description: 'New joins vs dropouts analysis',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'coach-performance',
      name: 'Coach Performance Report',
      description: 'Coach effectiveness metrics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  const analyticsReports = [
    {
      id: 'sport-popularity',
      name: 'Sport Popularity Trends',
      description: 'Analysis of sport enrollment trends',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        </svg>
      )
    },
    {
      id: 'retention-analysis',
      name: 'Student Retention Analysis',
      description: 'Student retention and dropout patterns',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const tabs = [
    { id: 'financial', name: 'Financial Reports', icon: '💰' },
    { id: 'operational', name: 'Operational Reports', icon: '👥' },
    { id: 'analytics', name: 'Analytics Reports', icon: '📊' }
  ];

  const getCurrentReports = () => {
    switch (activeTab) {
      case 'financial':
        return financialReports;
      case 'operational':
        return operationalReports;
      case 'analytics':
        return analyticsReports;
      default:
        return financialReports;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
            <p className="text-gray-400">Generate comprehensive reports and insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getCurrentReports().map((report) => (
          <div
            key={report.id}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg text-purple-400">
                {report.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">{report.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{report.description}</p>
                <button
                  onClick={() => generateReport(report.id)}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Dashboard */}
      {activeTab === 'financial' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Revenue Overview</h3>
              <button
                onClick={() => generateReport('revenue-overview')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">₹{revenueData.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-green-400 text-sm mt-1">+{revenueData.monthlyGrowth}% from last month</div>
              </div>
              <div className="space-y-3">
                {revenueData.dailyCollections.map((day, index) => (
                  <div key={day.date} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{new Date(day.date).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${(day.amount / 5500) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white w-16">₹{day.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Payment Methods</h3>
              <button
                onClick={() => generateReport('payment-methods')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
            <div className="space-y-4">
              {[
                { method: 'UPI', percentage: 45, amount: 56250 },
                { method: 'Cash', percentage: 30, amount: 37500 },
                { method: 'Bank Transfer', percentage: 20, amount: 25000 },
                { method: 'Card', percentage: 5, amount: 6250 }
              ].map((payment) => (
                <div key={payment.method} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-sm text-white">{payment.method}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${payment.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white w-12">{payment.percentage}%</span>
                    <span className="text-sm text-gray-400 w-16">₹{payment.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'operational' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Attendance Overview</h3>
              <button
                onClick={() => generateReport('attendance-overview')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{attendanceData.overallRate}%</div>
                <div className="text-sm text-gray-400">Overall Attendance Rate</div>
              </div>
              <div className="space-y-3">
                {attendanceData.batchWise.map((batch) => (
                  <div key={batch.batch} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{batch.batch}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${batch.rate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white w-10">{batch.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Student Enrollment</h3>
              <button
                onClick={() => generateReport('enrollment-trends')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
            <div className="space-y-4">
              {[
                { month: 'January', enrolled: 45, dropouts: 3 },
                { month: 'February', enrolled: 38, dropouts: 5 },
                { month: 'March', enrolled: 52, dropouts: 2 },
                { month: 'April', enrolled: 41, dropouts: 4 }
              ].map((data) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{data.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-white">{data.enrolled} enrolled</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-white">{data.dropouts} dropouts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Sport Popularity Trends</h3>
              <button
                onClick={() => generateReport('sport-popularity')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
            <div className="space-y-4">
              {[
                { sport: 'Cricket', popularity: 85, growth: 12 },
                { sport: 'Football', popularity: 72, growth: 8 },
                { sport: 'Basketball', popularity: 65, growth: -3 },
                { sport: 'Tennis', popularity: 58, growth: 15 }
              ].map((sport) => (
                <div key={sport.sport} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-sm text-white">{sport.sport}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${sport.popularity}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${sport.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {sport.growth > 0 ? '+' : ''}{sport.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Retention Analysis</h3>
              <button
                onClick={() => generateReport('retention-analysis')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">92%</div>
                <div className="text-sm text-gray-400">Overall Retention Rate</div>
              </div>
              <div className="space-y-3">
                {[
                  { period: '0-3 months', retention: 98 },
                  { period: '3-6 months', retention: 95 },
                  { period: '6-12 months', retention: 89 },
                  { period: '12+ months', retention: 85 }
                ].map((data) => (
                  <div key={data.period} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{data.period}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${data.retention}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white w-10">{data.retention}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}