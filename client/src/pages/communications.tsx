import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { toast } from '../lib/toast';

interface Communication {
  id: string;
  type: 'sms' | 'whatsapp' | 'email';
  recipient: string;
  message: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sentAt: string;
  templateId?: string;
}

interface CommunicationStats {
  totalSent: number;
  delivered: number;
  failed: number;
  deliveryRate: number;
}

const MESSAGE_TEMPLATES = {
  sms: [
    { id: "welcome", name: "Welcome Message", content: "Welcome to Parmanand Sports Academy! We're excited to have you join our sports family." },
    { id: "payment_reminder", name: "Payment Reminder", content: "Dear [Name], your monthly fee payment is due. Please make the payment at your earliest convenience." },
    { id: "attendance_low", name: "Low Attendance Alert", content: "Dear [Name], we noticed your attendance has been low. Please ensure regular participation for better progress." },
    { id: "batch_update", name: "Batch Update", content: "Important update about your batch schedule. Please check the updated timings." },
  ],
  whatsapp: [
    { id: "welcome", name: "Welcome Message", content: "🏆 Welcome to Parmanand Sports Academy! We're excited to have you join our sports family." },
    { id: "payment_reminder", name: "Payment Reminder", content: "💰 Dear [Name], your monthly fee payment is due. Please make the payment at your earliest convenience." },
    { id: "attendance_low", name: "Low Attendance Alert", content: "📊 Dear [Name], we noticed your attendance has been low. Please ensure regular participation for better progress." },
    { id: "achievement", name: "Achievement Congratulations", content: "🎉 Congratulations [Name]! Your hard work and dedication have paid off. Keep up the excellent work!" },
  ],
  email: [
    { id: "welcome", name: "Welcome Email", content: "Dear [Name],\n\nWelcome to Parmanand Sports Academy! We're excited to have you join our sports family and begin your journey with us.\n\nBest regards,\nParmanand Sports Academy Team" },
    { id: "payment_receipt", name: "Payment Receipt", content: "Dear [Name],\n\nThank you for your payment of ₹[Amount]. Your payment has been successfully processed.\n\nReceipt Number: [Receipt]\nPayment Date: [Date]\n\nBest regards,\nParmanand Sports Academy" },
    { id: "monthly_report", name: "Monthly Progress Report", content: "Dear [Name],\n\nPlease find your monthly progress report attached. We're proud of your achievements this month.\n\nBest regards,\nParmanand Sports Academy" },
  ],
};

export default function Communications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({
    type: 'sms' as 'sms' | 'whatsapp' | 'email',
    recipient: '',
    message: '',
    templateId: '',
  });

  const queryClient = useQueryClient();

  // Mock data for development
  const mockStats: CommunicationStats = {
    totalSent: 1247,
    delivered: 1189,
    failed: 58,
    deliveryRate: 95.3
  };

  const mockCommunications: Communication[] = [
    {
      id: '1',
      type: 'sms',
      recipient: '+91 9876543210',
      message: 'Welcome to Parmanand Sports Academy! We\'re excited to have you join our sports family.',
      status: 'delivered',
      sentAt: '2024-01-15T10:30:00Z',
      templateId: 'welcome'
    },
    {
      id: '2',
      type: 'whatsapp',
      recipient: '+91 9876543211',
      message: '💰 Dear Rahul, your monthly fee payment is due. Please make the payment at your earliest convenience.',
      status: 'delivered',
      sentAt: '2024-01-15T09:15:00Z',
      templateId: 'payment_reminder'
    },
    {
      id: '3',
      type: 'email',
      recipient: 'student@example.com',
      message: 'Dear Student,\n\nThank you for your payment of ₹2000. Your payment has been successfully processed.',
      status: 'sent',
      sentAt: '2024-01-15T08:45:00Z',
      templateId: 'payment_receipt'
    },
    {
      id: '4',
      type: 'sms',
      recipient: '+91 9876543212',
      message: 'Dear Priya, we noticed your attendance has been low. Please ensure regular participation.',
      status: 'failed',
      sentAt: '2024-01-14T16:20:00Z',
      templateId: 'attendance_low'
    },
    {
      id: '5',
      type: 'whatsapp',
      recipient: '+91 9876543213',
      message: '🎉 Congratulations Arjun! Your hard work and dedication have paid off. Keep up the excellent work!',
      status: 'delivered',
      sentAt: '2024-01-14T14:10:00Z',
      templateId: 'achievement'
    }
  ];

  const { data: communications = mockCommunications, isLoading } = useQuery({
    queryKey: ['communications'],
    queryFn: () => api.get('/communications'),
    initialData: mockCommunications
  });

  const { data: stats = mockStats } = useQuery({
    queryKey: ['communication-stats'],
    queryFn: () => api.get('/communications/stats'),
    initialData: mockStats
  });

  const sendCommunicationMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, id: Date.now().toString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communications'] });
      queryClient.invalidateQueries({ queryKey: ['communication-stats'] });
      setIsModalOpen(false);
      setFormData({ type: 'sms', recipient: '', message: '', templateId: '' });
      setSelectedTemplate('');
      toast.success('Communication sent successfully!');
    },
    onError: () => {
      toast.error('Failed to send communication');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipient || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    sendCommunicationMutation.mutate(formData);
  };

  const handleTemplateSelect = (templateId: string) => {
    const templates = MESSAGE_TEMPLATES[formData.type];
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
      setFormData(prev => ({
        ...prev,
        message: template.content,
        templateId: templateId
      }));
      setSelectedTemplate(templateId);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      delivered: "bg-green-100 text-green-800 border-green-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      sent: "bg-blue-100 text-blue-800 border-blue-200",
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sms':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Communications</h1>
            <p className="text-gray-400">Multi-channel messaging and communication</p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Send Communication
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Sent</p>
              <p className="text-2xl font-bold text-white">{stats.totalSent}</p>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Delivered</p>
              <p className="text-2xl font-bold text-white">{stats.delivered}</p>
            </div>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Failed</p>
              <p className="text-2xl font-bold text-white">{stats.failed}</p>
            </div>
            <div className="p-2 bg-red-500/20 rounded-lg">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Delivery Rate</p>
              <p className="text-2xl font-bold text-white">{stats.deliveryRate}%</p>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Communications Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Communication History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Type</th>
                <th className="text-left p-4 text-gray-300 font-medium">Recipient</th>
                <th className="text-left p-4 text-gray-300 font-medium">Message</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Sent At</th>
              </tr>
            </thead>
            <tbody>
              {communications.map((comm) => (
                <tr key={comm.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-white">
                      {getTypeIcon(comm.type)}
                      {comm.type.toUpperCase()}
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{comm.recipient}</td>
                  <td className="p-4 text-gray-300 max-w-md truncate">{comm.message}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(comm.status)}
                      {getStatusBadge(comm.status)}
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">
                    {new Date(comm.sentAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Send Communication Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Send Communication</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Communication Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Recipient
                  </label>
                  <input
                    type="text"
                    value={formData.recipient}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                    placeholder="Phone number or email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message Templates
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateSelect(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Choose a template (optional)</option>
                  {MESSAGE_TEMPLATES[formData.type].map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter your message..."
                  rows={6}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendCommunicationMutation.isPending}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {sendCommunicationMutation.isPending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}