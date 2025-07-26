import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  Shield, 
  Users, 
  UserCheck,
  UserX,
  Settings,
  Eye,
  Edit,
  Trash2,
  Key,
  Mail,
  Phone,
  Calendar,
  Filter,
  Download,
  MoreVertical
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'staff' | 'coach' | 'accountant'
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  createdDate: string
  permissions: string[]
  avatar?: string
}

const mockUsers: User[] = [
  {
    id: 'USR001',
    name: 'Admin User',
    email: 'admin@psa-nashik.com',
    phone: '+91 9999999999',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-01-26T10:30:00Z',
    createdDate: '2024-01-01',
    permissions: ['all']
  },
  {
    id: 'USR002',
    name: 'Rajesh Sharma',
    email: 'rajesh@psa-nashik.com',
    phone: '+91 9876543210',
    role: 'staff',
    status: 'active',
    lastLogin: '2025-01-25T16:45:00Z',
    createdDate: '2024-03-15',
    permissions: ['students', 'attendance', 'reports']
  },
  {
    id: 'USR003',
    name: 'Priya Patel',
    email: 'priya@psa-nashik.com',
    phone: '+91 9876543211',
    role: 'coach',
    status: 'active',
    lastLogin: '2025-01-26T08:15:00Z',
    createdDate: '2024-06-10',
    permissions: ['attendance', 'students_view', 'batches']
  },
  {
    id: 'USR004',
    name: 'Amit Kumar',
    email: 'amit@psa-nashik.com',
    phone: '+91 9876543212',
    role: 'accountant',
    status: 'active',
    lastLogin: '2025-01-24T14:20:00Z',
    createdDate: '2024-02-20',
    permissions: ['fees', 'reports', 'students_view']
  },
  {
    id: 'USR005',
    name: 'Sneha Singh',
    email: 'sneha@psa-nashik.com',
    phone: '+91 9876543213',
    role: 'staff',
    status: 'inactive',
    lastLogin: '2025-01-15T12:00:00Z',
    createdDate: '2024-08-05',
    permissions: ['students', 'communications']
  }
]

export default function UserManagement() {
  const [users] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm)
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'staff': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'coach': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'accountant': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'inactive': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const adminUsers = users.filter(u => u.role === 'admin').length
  const recentLogins = users.filter(u => {
    const lastLogin = new Date(u.lastLogin)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    return lastLogin > oneDayAgo
  }).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-400 mt-1">
            Manage system users, roles, and permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white">{totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-white">{activeUsers}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Administrators</p>
                <p className="text-2xl font-bold text-white">{adminUsers}</p>
              </div>
              <Shield className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Recent Logins</p>
                <p className="text-2xl font-bold text-white">{recentLogins}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
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
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-md text-white text-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="coach">Coach</option>
                <option value="accountant">Accountant</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-md text-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">System Users</CardTitle>
          <CardDescription className="text-gray-400">
            Manage user accounts and their access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-700/30 transition-all duration-200">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {user.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Last login: {formatLastLogin(user.lastLogin)}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-400">
                        Permissions: {user.permissions.includes('all') ? 'Full Access' : user.permissions.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 lg:mt-0">
                  <Button variant="outline" size="sm" title="View Details">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Edit User">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Reset Password">
                    <Key className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Permissions">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-400 border-red-400/30 hover:bg-red-500/10" title="Delete User">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No users found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm || filterRole !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Add your first user to get started'
                }
              </p>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Permissions Reference */}
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Role Permissions</CardTitle>
          <CardDescription className="text-gray-400">
            Default permissions for each user role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-red-400" />
                <h4 className="font-semibold text-red-400">Administrator</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Full system access</li>
                <li>• User management</li>
                <li>• System settings</li>
                <li>• All modules</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-blue-400" />
                <h4 className="font-semibold text-blue-400">Staff</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Student management</li>
                <li>• Attendance tracking</li>
                <li>• Communications</li>
                <li>• Reports viewing</li>
              </ul>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="h-5 w-5 text-green-400" />
                <h4 className="font-semibold text-green-400">Coach</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Attendance marking</li>
                <li>• Student viewing</li>
                <li>• Batch management</li>
                <li>• Performance tracking</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="h-5 w-5 text-purple-400" />
                <h4 className="font-semibold text-purple-400">Accountant</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Fee management</li>
                <li>• Payment tracking</li>
                <li>• Financial reports</li>
                <li>• Student viewing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}