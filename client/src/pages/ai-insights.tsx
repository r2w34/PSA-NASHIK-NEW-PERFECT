import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { toast } from '../lib/toast';

interface AIInsight {
  id: string;
  type: 'prediction' | 'alert' | 'optimization' | 'analysis';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  recommendations: string[];
}

interface PredictiveMetric {
  title: string;
  value: string;
  trend: 'up' | 'down';
  description: string;
}

interface QueryResponse {
  answer: string;
  confidence: number;
  suggestions: string[];
}

export default function AIInsights() {
  const [query, setQuery] = useState('');
  const [queryResponse, setQueryResponse] = useState<QueryResponse | null>(null);
  const [isQueryLoading, setIsQueryLoading] = useState(false);

  // Mock data for development
  const mockInsights: AIInsight[] = [
    {
      id: 'revenue-prediction',
      type: 'prediction',
      title: 'Revenue Forecasting',
      description: 'Based on current trends, next month\'s revenue is projected to be ₹3,12,000 (+9.7% from this month).',
      confidence: 87,
      impact: 'high',
      recommendations: [
        'Consider promotional campaigns for low-performing sports',
        'Optimize batch timings for better utilization',
        'Introduce advanced skill levels for popular sports'
      ]
    },
    {
      id: 'retention-risk',
      type: 'alert',
      title: 'Student Retention Risk',
      description: '7 students show patterns indicating potential dropout risk. Early intervention recommended.',
      confidence: 92,
      impact: 'high',
      recommendations: [
        'Schedule individual counseling sessions',
        'Offer skill-appropriate batch transfers',
        'Implement buddy system for struggling students'
      ]
    },
    {
      id: 'schedule-optimization',
      type: 'optimization',
      title: 'Schedule Optimization',
      description: 'Evening batches (5-7 PM) show 15% better attendance rates compared to morning sessions.',
      confidence: 94,
      impact: 'medium',
      recommendations: [
        'Increase evening batch capacity',
        'Consider shifting some morning batches',
        'Offer flexible timing options for working parents'
      ]
    },
    {
      id: 'payment-patterns',
      type: 'analysis',
      title: 'Payment Pattern Analysis',
      description: 'Students paying via UPI show 23% better payment consistency than cash payments.',
      confidence: 89,
      impact: 'medium',
      recommendations: [
        'Promote digital payment adoption',
        'Offer small discounts for digital payments',
        'Implement automated payment reminders'
      ]
    }
  ];

  const predictiveMetrics: PredictiveMetric[] = [
    {
      title: 'Churn Probability',
      value: '12%',
      trend: 'down',
      description: 'Students likely to discontinue next month'
    },
    {
      title: 'Revenue Growth',
      value: '+9.7%',
      trend: 'up',
      description: 'Projected revenue increase'
    },
    {
      title: 'Capacity Utilization',
      value: '73%',
      trend: 'up',
      description: 'Average batch fill rate'
    },
    {
      title: 'Payment Recovery',
      value: '87%',
      trend: 'up',
      description: 'Overdue payment collection rate'
    }
  ];

  const suggestedQueries = [
    'Which sports have the highest dropout rates?',
    'What\'s the optimal batch size for maximum profitability?',
    'Predict next quarter\'s enrollment numbers',
    'Which payment methods show best collection rates?',
    'Identify students at risk of discontinuing',
    'Suggest new sports based on market demand'
  ];

  const retentionForecast = {
    currentRetentionRate: 88,
    predictedRetentionRate: 91,
    atRiskStudents: 7,
    confidenceScore: 94,
    highRiskCriteria: [
      'Attendance below 60% for 3 consecutive weeks',
      'Payment delays exceeding 15 days',
      'No participation in academy events',
      'Negative feedback from coaches'
    ],
    interventionStrategies: [
      'Personalized coaching sessions',
      'Flexible payment plans',
      'Peer mentorship programs',
      'Regular progress tracking'
    ],
    positiveFactors: [
      'Strong coach-student relationships',
      'Regular skill assessments',
      'Parent engagement programs',
      'Achievement recognition system'
    ],
    negativeFactors: [
      'Limited batch timing options',
      'Lack of advanced skill levels',
      'Insufficient individual attention',
      'Competition from nearby academies'
    ],
    actionPlan: [
      'Implement early warning system for at-risk students',
      'Expand evening batch capacity by 25%',
      'Launch parent engagement workshops',
      'Introduce skill-based progression levels',
      'Establish student feedback collection system'
    ]
  };

  const { data: insights = mockInsights } = useQuery({
    queryKey: ['ai-insights'],
    queryFn: () => api.get('/ai-insights'),
    initialData: mockInsights
  });

  const handleSendQuery = async () => {
    if (!query.trim() || isQueryLoading) return;
    
    setIsQueryLoading(true);
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse: QueryResponse = {
        answer: `Based on your query "${query}", here's what the AI analysis reveals: The data shows strong patterns in student engagement and revenue optimization. Current trends indicate positive growth potential with strategic adjustments.`,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        suggestions: [
          'Monitor weekly attendance patterns',
          'Implement targeted retention strategies',
          'Consider expanding popular time slots',
          'Review pricing strategy for optimal revenue'
        ]
      };
      
      setQueryResponse(mockResponse);
      setQuery('');
      toast.success('AI query processed successfully!');
    } catch (error) {
      toast.error('Failed to process AI query. Please try again.');
    } finally {
      setIsQueryLoading(false);
    }
  };

  const handleSuggestedQuery = (suggestedQuery: string) => {
    setQuery(suggestedQuery);
  };

  const getImpactBadge = (impact: string) => {
    const styles = {
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[impact as keyof typeof styles]}`}>
        {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
      </span>
    );
  };

  const getInsightIcon = (type: string) => {
    const icons = {
      prediction: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      alert: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      optimization: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
      analysis: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    };
    return icons[type as keyof typeof icons] || icons.analysis;
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 min-h-screen bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              AI Insights
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                🤖 AI Powered
              </span>
            </h1>
            <p className="text-gray-300 mt-1">Intelligent analytics and predictive insights for your academy</p>
          </div>
        </div>
      </div>

      {/* AI Query Interface */}
      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white">Ask AI Assistant</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Ask me anything about your academy..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
              className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 backdrop-blur-sm"
            />
            <button
              onClick={handleSendQuery}
              disabled={!query.trim() || isQueryLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-purple-500/25"
            >
              {isQueryLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>

          {/* AI Response */}
          {queryResponse && (
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h4 className="font-semibold text-white">AI Assistant Reply</h4>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs">
                  {queryResponse.confidence}% confidence
                </span>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300">{queryResponse.answer}</p>
                
                {queryResponse.suggestions && queryResponse.suggestions.length > 0 && (
                  <div>
                    <h5 className="font-medium text-white mb-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Suggested Actions:
                    </h5>
                    <ul className="space-y-1">
                      {queryResponse.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Suggested Queries */}
          <div>
            <p className="text-sm text-gray-300 mb-3 font-medium">💡 Suggested queries:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuery(suggestion)}
                  className="text-sm px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-white transition-all duration-200 backdrop-blur-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Predictive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {predictiveMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-300 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
                <p className="text-xs text-gray-400">{metric.description}</p>
              </div>
              <div className={`p-3 rounded-full ${
                metric.trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                <svg className={`w-6 h-6 ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400 rotate-180'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Student Retention Forecast */}
      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white">Student Retention Forecast</h3>
        </div>

        {/* Overall Forecast */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h4 className="font-semibold text-blue-400">Current Retention</h4>
            </div>
            <p className="text-2xl font-bold text-blue-400">{retentionForecast.currentRetentionRate}%</p>
          </div>
          
          <div className="bg-green-500/20 border border-green-500/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="font-semibold text-green-400">Predicted Retention</h4>
            </div>
            <p className="text-2xl font-bold text-green-400">{retentionForecast.predictedRetentionRate}%</p>
          </div>
          
          <div className="bg-orange-500/20 border border-orange-500/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h4 className="font-semibold text-orange-400">At-Risk Students</h4>
            </div>
            <p className="text-2xl font-bold text-orange-400">{retentionForecast.atRiskStudents}</p>
          </div>
          
          <div className="bg-purple-500/20 border border-purple-500/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.25-4.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 5.25v13.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V5.25a2.25 2.25 0 00-2.25-2.25H16.5m-3-3V1.5a.75.75 0 00-1.5 0V3M12 3h1.5m-1.5 0h-1.5" />
              </svg>
              <h4 className="font-semibold text-purple-400">Confidence</h4>
            </div>
            <p className="text-2xl font-bold text-purple-400">{retentionForecast.confidenceScore}%</p>
          </div>
        </div>

        {/* Risk Factors and Interventions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              High-Risk Indicators
            </h4>
            <div className="space-y-2">
              {retentionForecast.highRiskCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                  <span className="text-sm text-gray-300">{criteria}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Intervention Strategies
            </h4>
            <div className="space-y-2">
              {retentionForecast.interventionStrategies.map((strategy, index) => (
                <div key={index} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-300">{strategy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Retention Factors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Positive Factors
            </h4>
            <div className="space-y-2">
              {retentionForecast.positiveFactors.map((factor, index) => (
                <div key={index} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">{factor}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              Negative Factors
            </h4>
            <div className="space-y-2">
              {retentionForecast.negativeFactors.map((factor, index) => (
                <div key={index} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm text-gray-300">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Recommended Action Plan
          </h4>
          <div className="space-y-2">
            {retentionForecast.actionPlan.map((action, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-sm text-gray-300">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight) => (
          <div key={insight.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="text-purple-400">
                  {getInsightIcon(insight.type)}
                </div>
                <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                {getImpactBadge(insight.impact)}
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs">
                  {insight.confidence}% confidence
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4">{insight.description}</p>
            
            <div className="space-y-2">
              <h4 className="font-medium text-white flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recommended Actions:
              </h4>
              <ul className="space-y-1">
                {insight.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-600">
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                View Detailed Analysis →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Model Performance */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">AI Model Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">94%</div>
            <div className="text-sm text-gray-400">Prediction Accuracy</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-green-400 h-2 rounded-full w-[94%]"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">87%</div>
            <div className="text-sm text-gray-400">Recommendation Success</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-purple-400 h-2 rounded-full w-[87%]"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">156</div>
            <div className="text-sm text-gray-400">Insights Generated</div>
            <div className="text-xs text-gray-500 mt-1">This month</div>
          </div>
        </div>
      </div>
    </div>
  );
}