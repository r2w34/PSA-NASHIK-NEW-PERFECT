import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  MapPin, 
  Navigation, 
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Filter,
  Download,
  Eye,
  Settings,
  Zap
} from 'lucide-react'

interface GPSLocation {
  id: string
  studentId: string
  studentName: string
  sport: string
  batch: string
  latitude: number
  longitude: number
  address: string
  status: 'on_campus' | 'in_transit' | 'at_home' | 'offline'
  lastUpdate: string
  batteryLevel?: number
  speed?: number
  accuracy?: number
}

const mockLocations: GPSLocation[] = [
  {
    id: 'GPS001',
    studentId: 'STU001',
    studentName: 'Arjun Sharma',
    sport: 'Cricket',
    batch: 'Morning A',
    latitude: 19.9975,
    longitude: 73.7898,
    address: 'PSA Nashik Campus, Nashik',
    status: 'on_campus',
    lastUpdate: '2025-01-26T10:45:00Z',
    batteryLevel: 85,
    speed: 0,
    accuracy: 5
  },
  {
    id: 'GPS002',
    studentId: 'STU002',
    studentName: 'Priya Patel',
    sport: 'Football',
    batch: 'Evening B',
    latitude: 19.9615,
    longitude: 73.7850,
    address: 'College Road, Nashik',
    status: 'in_transit',
    lastUpdate: '2025-01-26T10:42:00Z',
    batteryLevel: 67,
    speed: 25,
    accuracy: 8
  },
  {
    id: 'GPS003',
    studentId: 'STU003',
    studentName: 'Rahul Kumar',
    sport: 'Basketball',
    batch: 'Morning B',
    latitude: 19.9955,
    longitude: 73.7615,
    address: 'Gangapur Road, Nashik',
    status: 'at_home',
    lastUpdate: '2025-01-26T09:30:00Z',
    batteryLevel: 45,
    speed: 0,
    accuracy: 12
  },
  {
    id: 'GPS004',
    studentId: 'STU004',
    studentName: 'Sneha Singh',
    sport: 'Tennis',
    batch: 'Evening A',
    latitude: 19.9728,
    longitude: 73.7804,
    address: 'MG Road, Nashik',
    status: 'offline',
    lastUpdate: '2025-01-26T08:15:00Z',
    batteryLevel: 12,
    speed: 0,
    accuracy: 0
  },
  {
    id: 'GPS005',
    studentId: 'STU005',
    studentName: 'Vikram Joshi',
    sport: 'Cricket',
    batch: 'Morning A',
    latitude: 19.9975,
    longitude: 73.7898,
    address: 'PSA Nashik Campus, Nashik',
    status: 'on_campus',
    lastUpdate: '2025-01-26T10:44:00Z',
    batteryLevel: 92,
    speed: 0,
    accuracy: 3
  }
]

export default function GPSTracking() {
  const [locations] = useState<GPSLocation[]>(mockLocations)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterSport, setFilterSport] = useState<string>('all')

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.sport.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || location.status === filterStatus
    const matchesSport = filterSport === 'all' || location.sport === filterSport
    return matchesSearch && matchesStatus && matchesSport
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_campus': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in_transit': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'at_home': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'offline': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_campus': return <CheckCircle className="h-4 w-4" />
      case 'in_transit': return <Navigation className="h-4 w-4" />
      case 'at_home': return <MapPin className="h-4 w-4" />
      case 'offline': return <XCircle className="h-4 w-4" />
      default: return <MapPin className="h-4 w-4" />
    }
  }

  const formatLastUpdate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-gray-400'
    if (level > 50) return 'text-green-400'
    if (level > 20) return 'text-yellow-400'
    return 'text-red-400'
  }

  const totalStudents = locations.length
  const onCampus = locations.filter(l => l.status === 'on_campus').length
  const inTransit = locations.filter(l => l.status === 'in_transit').length
  const offline = locations.filter(l => l.status === 'offline').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            GPS Tracking
          </h1>
          <p className="text-gray-400 mt-1">
            Real-time location monitoring and student safety tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            <Eye className="h-4 w-4 mr-2" />
            View Map
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Tracked</p>
                <p className="text-2xl font-bold text-white">{totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">On Campus</p>
                <p className="text-2xl font-bold text-white">{onCampus}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">In Transit</p>
                <p className="text-2xl font-bold text-white">{inTransit}</p>
              </div>
              <Navigation className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Offline</p>
                <p className="text-2xl font-bold text-white">{offline}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
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
                placeholder="Search by student name, location, or sport..."
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
                <option value="on_campus">On Campus</option>
                <option value="in_transit">In Transit</option>
                <option value="at_home">At Home</option>
                <option value="offline">Offline</option>
              </select>
              <select
                value={filterSport}
                onChange={(e) => setFilterSport(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-md text-white text-sm"
              >
                <option value="all">All Sports</option>
                <option value="Cricket">Cricket</option>
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Map Placeholder */}
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Live Location Map
          </CardTitle>
          <CardDescription className="text-gray-400">
            Real-time student location tracking on interactive map
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-800/50 rounded-lg border border-gray-700/50 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Interactive Map</h3>
              <p className="text-gray-400 mb-4">
                Real-time GPS tracking map will be displayed here
              </p>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                <Eye className="h-4 w-4 mr-2" />
                Load Map View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location List */}
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Student Locations</CardTitle>
          <CardDescription className="text-gray-400">
            Current location status and tracking information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLocations.map((location) => (
              <div key={location.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-700/30 transition-all duration-200">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {location.studentName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-white">{location.studentName}</h3>
                      <Badge className={getStatusColor(location.status)}>
                        {getStatusIcon(location.status)}
                        <span className="ml-1">
                          {location.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {location.address}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatLastUpdate(location.lastUpdate)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                      <span>Sport: {location.sport}</span>
                      <span>Batch: {location.batch}</span>
                      {location.speed !== undefined && (
                        <span>Speed: {location.speed} km/h</span>
                      )}
                      {location.accuracy !== undefined && (
                        <span>Accuracy: ±{location.accuracy}m</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 lg:mt-0">
                  {/* Battery Level */}
                  {location.batteryLevel !== undefined && (
                    <div className="flex items-center gap-2">
                      <Zap className={`h-4 w-4 ${getBatteryColor(location.batteryLevel)}`} />
                      <span className={`text-sm ${getBatteryColor(location.batteryLevel)}`}>
                        {location.batteryLevel}%
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" title="View on Map">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" title="Location History">
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" title="Settings">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLocations.length === 0 && (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No locations found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm || filterStatus !== 'all' || filterSport !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'No GPS tracking data available'
                }
              </p>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Safety Alerts */}
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Safety Alerts
          </CardTitle>
          <CardDescription className="text-gray-400">
            Important notifications and safety alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <XCircle className="h-5 w-5 text-red-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Device Offline</p>
                <p className="text-xs text-gray-400">Sneha Singh's device has been offline for 2+ hours</p>
              </div>
              <Button variant="outline" size="sm">
                Contact
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <Zap className="h-5 w-5 text-yellow-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Low Battery</p>
                <p className="text-xs text-gray-400">Rahul Kumar's device battery is at 12%</p>
              </div>
              <Button variant="outline" size="sm">
                Notify
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">All Clear</p>
                <p className="text-xs text-gray-400">2 students safely arrived on campus</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}