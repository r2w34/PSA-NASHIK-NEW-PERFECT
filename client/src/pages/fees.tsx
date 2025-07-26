import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  Plus,
  Eye,
  Send,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function Fees() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [paymentForm, setPaymentForm] = useState({
    studentId: '',
    amount: '',
    month: '',
    paymentMethod: '',
    transactionRef: '',
    notes: ''
  });

  const { data: feesData, isLoading, refetch, error } = useQuery({
    queryKey: ['/api/fees', { search: searchQuery, status: selectedStatus, month: selectedMonth }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedStatus) params.append('status', selectedStatus);
      if (selectedMonth) params.append('month', selectedMonth);
      
      const response = await fetch(`/api/fees?${params}`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch fees data');
      }
      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const mockFeesData = {
    fees: [
      {
        id: 1,
        studentName: 'Arjun Sharma',
        studentId: 'STU001',
        amount: 2000,
        month: 'January 2025',
        status: 'paid',
        paidDate: '2025-01-15',
        paymentMethod: 'UPI',
        receiptNumber: 'RCP001'
      },
      {
        id: 2,
        studentName: 'Priya Patel',
        studentId: 'STU002',
        amount: 1800,
        month: 'January 2025',
        status: 'pending',
        dueDate: '2025-01-31',
        paymentMethod: null,
        receiptNumber: null
      },
      {
        id: 3,
        studentName: 'Rohit Kumar',
        studentId: 'STU003',
        amount: 2200,
        month: 'December 2024',
        status: 'overdue',
        dueDate: '2024-12-31',
        paymentMethod: null,
        receiptNumber: null
      },
      {
        id: 4,
        studentName: 'Sneha Desai',
        studentId: 'STU004',
        amount: 2500,
        month: 'January 2025',
        status: 'paid',
        paidDate: '2025-01-10',
        paymentMethod: 'Cash',
        receiptNumber: 'RCP002'
      },
      {
        id: 5,
        studentName: 'Aditya Singh',
        studentId: 'STU005',
        amount: 1500,
        month: 'January 2025',
        status: 'paid',
        paidDate: '2025-01-20',
        paymentMethod: 'Bank Transfer',
        receiptNumber: 'RCP003'
      }
    ],
    summary: {
      totalPaid: 6000,
      totalPending: 1800,
      totalOverdue: 2200,
      totalAmount: 10000,
      paidCount: 3,
      pendingCount: 1,
      overdueCount: 1
    },
    total: 5
  };

  const fees = feesData || mockFeesData;

  const handleRecordPayment = () => {
    setShowRecordPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowRecordPaymentModal(false);
    setSelectedStudent(null);
    setPaymentForm({
      studentId: '',
      amount: '',
      month: '',
      paymentMethod: '',
      transactionRef: '',
      notes: ''
    });
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recording payment:', paymentForm);
    // Here you would typically make an API call to record the payment
    handleCloseModal();
  };

  const handleSendReminder = (studentId: string) => {
    console.log('Sending reminder to student:', studentId);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
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
            Fees & Payments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage student fees and payment collection
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={() => refetch()} variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleRecordPayment} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <CreditCard className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Collected</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(fees.summary.totalPaid)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Amount</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(fees.summary.totalPending)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                  <Users className="h-4 w-4 mr-1" />
                  {fees.summary.pendingCount} students
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue Amount</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(fees.summary.totalOverdue)}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fees.summary.overdueCount} students
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Collection Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {Math.round((fees.summary.totalPaid / fees.summary.totalAmount) * 100)}%
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -3% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Search for Payment Recording */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Payment Recording</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search student by name, ID, or phone to record payment..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleRecordPayment}>
              <Plus className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payments..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">All Months</option>
              <option value="2025-01">January 2025</option>
              <option value="2024-12">December 2024</option>
              <option value="2024-11">November 2024</option>
            </select>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Payments Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {fees.fees.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {payment.studentName.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {payment.studentName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {payment.studentId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(payment.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{payment.month}</div>
                      {payment.dueDate && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Due: {new Date(payment.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        payment.status === 'paid' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {payment.paymentMethod || '-'}
                      </div>
                      {payment.receiptNumber && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {payment.receiptNumber}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {payment.status !== 'paid' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                              <CreditCard className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-orange-600 hover:text-orange-700"
                              onClick={() => handleSendReminder(payment.studentId)}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Record Payment Modal */}
      {showRecordPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Record Payment
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitPayment} className="space-y-4">
              {/* Student Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search student by name or ID..."
                    className="pl-10"
                    value={paymentForm.studentId}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, studentId: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
                  required
                />
              </div>

              {/* Month */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Month
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={paymentForm.month}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, month: e.target.value }))}
                  required
                >
                  <option value="">Select month</option>
                  <option value="January 2025">January 2025</option>
                  <option value="February 2025">February 2025</option>
                  <option value="March 2025">March 2025</option>
                  <option value="April 2025">April 2025</option>
                  <option value="May 2025">May 2025</option>
                  <option value="June 2025">June 2025</option>
                  <option value="July 2025">July 2025</option>
                  <option value="August 2025">August 2025</option>
                  <option value="September 2025">September 2025</option>
                  <option value="October 2025">October 2025</option>
                  <option value="November 2025">November 2025</option>
                  <option value="December 2025">December 2025</option>
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Method
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={paymentForm.paymentMethod}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Card">Card</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              {/* Transaction Reference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Transaction Reference (Optional)
                </label>
                <Input
                  type="text"
                  placeholder="Enter transaction ID or reference"
                  value={paymentForm.transactionRef}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, transactionRef: e.target.value }))}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  rows={3}
                  placeholder="Add any additional notes..."
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Record Payment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}