import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  Send, 
  Users, 
  MessageSquare, 
  Mail, 
  Phone,
  Calendar,
  Target,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download
} from 'lucide-react'

interface Campaign {
  id: string
  name: string
  type: 'sms' | 'email' | 'whatsapp'
  status: 'draft' | 'active' | 'completed' | 'paused'
  targetAudience: string
  totalRecipients: number
  sent: number
  delivered: number
  opened: number
  clicked: number
  createdDate: string
  scheduledDate?: string
  description: string
}

const mockCampaigns: Campaign[] = [
  {
    id: 'CAM001',
    name: 'Summer Training Registration',
    type: 'email',
    status: 'active',
    targetAudience: 'All Students',
    totalRecipients: 245,
    sent: 245,
    delivered: 238,
    opened: 156,
    clicked: 89,
    createdDate: '2025-01-15',
    scheduledDate: '2025-01-20',
    description: 'Promote summer training programs and early bird discounts'
  },
  {
    id: 'CAM002',
    name: 'Fee Payment Reminder',
    type: 'sms',
    status: 'completed',
    targetAudience: 'Overdue Students',
    totalRecipients: 23,
    sent: 23,
    delivered: 23,
    opened: 23,
    clicked: 12,
    createdDate: '2025-01-10',
    description: 'Monthly fee payment reminder for overdue students'
  },
  {
    id: 'CAM003',
    name: 'New Batch Announcement',
    type: 'whatsapp',
    status: 'draft',
    targetAudience: 'Cricket Students',
    totalRecipients: 85,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    createdDate: '2025-01-18',
    scheduledDate: '2025-01-25',
    description: 'Announce new evening cricket batch starting next month'
  },
  {
    id: 'CAM004',
    name: 'Achievement Celebration',
    type: 'email',
    status: 'paused',
    targetAudience: 'Parents',
    totalRecipients: 180,
    sent: 90,
    delivered: 87,
    opened: 45,
    clicked: 23,
    createdDate: '2025-01-12',
    description: 'Celebrate student achievements and upcoming tournaments'
  }
]

export default function Campaigns() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus
    const matchesType = filterType === 'all' || campaign.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'paused': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'sms': return <MessageSquare className="h-4 w-4" />
      case 'whatsapp': return <Phone className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  const calculateEngagementRate = (campaign: Campaign) => {
    if (campaign.sent === 0) return 0
    return Math.round((campaign.clicked / campaign.sent) * 100)
  }

  const totalCampaigns = campaigns.length
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length
  const totalRecipients = campaigns.reduce((sum, c) => sum + c.totalRecipients, 0)
  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0)
  const avgEngagement = Math.round(campaigns.reduce((sum, c) => sum + calculateEngagementRate(c), 0) / campaigns.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Marketing Campaigns
          </h1>
          <p className="text-gray-400 mt-1">
            Manage and track your marketing campaigns across multiple channels
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Campaigns</p>
                <p className="text-2xl font-bold text-white">{totalCampaigns}</p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Campaigns</p>
                <p className="text-2xl font-bold text-white">{activeCampaigns}</p>
              </div>
              <Send className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Recipients</p>
                <p className="text-2xl font-bold text-white">{totalRecipients.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Messages Sent</p>
                <p className="text-2xl font-bold text-white">{totalSent.toLocaleString()}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Engagement</p>
                <p className="text-2xl font-bold text-white">{avgEngagement}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-pink-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-md text-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
                <option value="paused">Paused</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-md text-white text-sm"
              >
                <option value="all">All Types</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns List */}
      <div className="grid gap-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(campaign.type)}
                      <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{campaign.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {campaign.targetAudience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Created: {new Date(campaign.createdDate).toLocaleDateString()}
                    </span>
                    {campaign.scheduledDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Scheduled: {new Date(campaign.scheduledDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                  {/* Campaign Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-400">Recipients</p>
                      <p className="text-sm font-semibold text-white">{campaign.totalRecipients}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Sent</p>
                      <p className="text-sm font-semibold text-white">{campaign.sent}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Delivered</p>
                      <p className="text-sm font-semibold text-white">{campaign.delivered}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Engagement</p>
                      <p className="text-sm font-semibold text-white">{calculateEngagementRate(campaign)}%</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-400 border-red-400/30 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No campaigns found</h3>
            <p className="text-gray-400 mb-4">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first marketing campaign to get started'
              }
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}