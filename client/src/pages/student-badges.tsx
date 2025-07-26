import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Trophy, Star, Target, Medal, Crown, Zap, Shield, Users, Calendar, TrendingUp, Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

interface StudentBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'performance' | 'attendance' | 'behavior' | 'achievement' | 'milestone';
  criteria: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  studentsEarned: number;
  isActive: boolean;
  createdAt: string;
}

interface StudentAchievement {
  id: string;
  studentId: string;
  studentName: string;
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
  badgeColor: string;
  earnedAt: string;
  points: number;
  sport: string;
}

export default function StudentBadges() {
  const [activeTab, setActiveTab] = useState<'badges' | 'achievements' | 'leaderboard'>('badges');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  // Mock data for badges
  const [badges] = useState<StudentBadge[]>([
    {
      id: '1',
      name: 'Perfect Attendance',
      description: 'Attended all sessions for a month without any absence',
      icon: '🎯',
      color: 'bg-green-500',
      category: 'attendance',
      criteria: '100% attendance for 30 days',
      points: 100,
      rarity: 'rare',
      studentsEarned: 23,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Champion',
      description: 'Won first place in academy tournament',
      icon: '🏆',
      color: 'bg-yellow-500',
      category: 'achievement',
      criteria: 'Win academy tournament',
      points: 500,
      rarity: 'legendary',
      studentsEarned: 5,
      isActive: true,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Rising Star',
      description: 'Showed exceptional improvement in skills',
      icon: '⭐',
      color: 'bg-purple-500',
      category: 'performance',
      criteria: '50% skill improvement in 3 months',
      points: 200,
      rarity: 'epic',
      studentsEarned: 12,
      isActive: true,
      createdAt: '2024-01-20'
    },
    {
      id: '4',
      name: 'Team Player',
      description: 'Excellent teamwork and collaboration',
      icon: '🤝',
      color: 'bg-blue-500',
      category: 'behavior',
      criteria: 'Positive peer feedback for 2 months',
      points: 150,
      rarity: 'rare',
      studentsEarned: 18,
      isActive: true,
      createdAt: '2024-01-25'
    },
    {
      id: '5',
      name: 'Milestone Master',
      description: 'Completed 100 training sessions',
      icon: '🎖️',
      color: 'bg-red-500',
      category: 'milestone',
      criteria: 'Complete 100 training sessions',
      points: 300,
      rarity: 'epic',
      studentsEarned: 8,
      isActive: true,
      createdAt: '2024-02-01'
    },
    {
      id: '6',
      name: 'Early Bird',
      description: 'Always arrives early for training',
      icon: '🌅',
      color: 'bg-orange-500',
      category: 'behavior',
      criteria: 'Arrive 15 minutes early for 20 sessions',
      points: 75,
      rarity: 'common',
      studentsEarned: 34,
      isActive: true,
      createdAt: '2024-02-05'
    }
  ]);

  // Mock data for student achievements
  const [achievements] = useState<StudentAchievement[]>([
    {
      id: '1',
      studentId: 'STU001',
      studentName: 'Arjun Sharma',
      badgeId: '1',
      badgeName: 'Perfect Attendance',
      badgeIcon: '🎯',
      badgeColor: 'bg-green-500',
      earnedAt: '2024-02-15',
      points: 100,
      sport: 'Cricket'
    },
    {
      id: '2',
      studentId: 'STU002',
      studentName: 'Priya Patel',
      badgeId: '2',
      badgeName: 'Champion',
      badgeIcon: '🏆',
      badgeColor: 'bg-yellow-500',
      earnedAt: '2024-02-10',
      points: 500,
      sport: 'Badminton'
    },
    {
      id: '3',
      studentId: 'STU003',
      studentName: 'Rahul Kumar',
      badgeId: '3',
      badgeName: 'Rising Star',
      badgeIcon: '⭐',
      badgeColor: 'bg-purple-500',
      earnedAt: '2024-02-12',
      points: 200,
      sport: 'Football'
    },
    {
      id: '4',
      studentId: 'STU001',
      studentName: 'Arjun Sharma',
      badgeId: '4',
      badgeName: 'Team Player',
      badgeIcon: '🤝',
      badgeColor: 'bg-blue-500',
      earnedAt: '2024-02-08',
      points: 150,
      sport: 'Cricket'
    },
    {
      id: '5',
      studentId: 'STU004',
      studentName: 'Sneha Singh',
      badgeId: '5',
      badgeName: 'Milestone Master',
      badgeIcon: '🎖️',
      badgeColor: 'bg-red-500',
      earnedAt: '2024-02-14',
      points: 300,
      sport: 'Tennis'
    }
  ]);

  // Calculate leaderboard
  const leaderboard = achievements.reduce((acc, achievement) => {
    const existing = acc.find(item => item.studentId === achievement.studentId);
    if (existing) {
      existing.totalPoints += achievement.points;
      existing.badgeCount += 1;
      existing.badges.push({
        name: achievement.badgeName,
        icon: achievement.badgeIcon,
        color: achievement.badgeColor
      });
    } else {
      acc.push({
        studentId: achievement.studentId,
        studentName: achievement.studentName,
        totalPoints: achievement.points,
        badgeCount: 1,
        badges: [{
          name: achievement.badgeName,
          icon: achievement.badgeIcon,
          color: achievement.badgeColor
        }]
      });
    }
    return acc;
  }, [] as any[]).sort((a, b) => b.totalPoints - a.totalPoints);

  const filteredBadges = badges.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || badge.category === selectedCategory;
    const matchesRarity = selectedRarity === 'all' || badge.rarity === selectedRarity;
    return matchesSearch && matchesCategory && matchesRarity;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return <TrendingUp className="w-4 h-4" />;
      case 'attendance': return <Calendar className="w-4 h-4" />;
      case 'behavior': return <Users className="w-4 h-4" />;
      case 'achievement': return <Trophy className="w-4 h-4" />;
      case 'milestone': return <Target className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const handleCreateBadge = () => {
    alert('Create Badge modal would open here');
  };

  const handleEditBadge = (badgeId: string) => {
    alert(`Edit badge ${badgeId} modal would open here`);
  };

  const handleDeleteBadge = (badgeId: string) => {
    alert(`Delete badge ${badgeId} confirmation would appear here`);
  };

  const handleViewBadgeDetails = (badgeId: string) => {
    alert(`Badge ${badgeId} details modal would open here`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 min-h-screen bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              Student Badges
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                🏆 Gamification
              </span>
            </h1>
            <p className="text-gray-300 mt-1">Achievement system and student rewards management</p>
          </div>
        </div>
        <Button onClick={handleCreateBadge} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Create Badge
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Badges</p>
                <p className="text-3xl font-bold text-white">{badges.length}</p>
                <p className="text-xs text-gray-400">Active badge types</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-full">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Achievements</p>
                <p className="text-3xl font-bold text-white">{achievements.length}</p>
                <p className="text-xs text-gray-400">Badges earned</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-full">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Active Students</p>
                <p className="text-3xl font-bold text-white">{leaderboard.length}</p>
                <p className="text-xs text-gray-400">With badges</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Points</p>
                <p className="text-3xl font-bold text-white">{achievements.reduce((sum, a) => sum + a.points, 0)}</p>
                <p className="text-xs text-gray-400">Points awarded</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-full">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-1 shadow-xl">
        {[
          { id: 'badges', label: 'Badge Management', icon: Award },
          { id: 'achievements', label: 'Student Achievements', icon: Trophy },
          { id: 'leaderboard', label: 'Leaderboard', icon: Crown }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          {/* Filters */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search badges..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="performance">Performance</option>
                    <option value="attendance">Attendance</option>
                    <option value="behavior">Behavior</option>
                    <option value="achievement">Achievement</option>
                    <option value="milestone">Milestone</option>
                  </select>
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="all">All Rarities</option>
                    <option value="common">Common</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBadges.map((badge) => (
              <Card key={badge.id} className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-yellow-500/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                        {badge.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{badge.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getCategoryIcon(badge.category)}
                          <span className="text-xs text-gray-400 capitalize">{badge.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewBadgeDetails(badge.id)}
                        className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditBadge(badge.id)}
                        className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteBadge(badge.id)}
                        className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{badge.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Criteria:</span>
                      <span className="text-xs text-gray-300">{badge.criteria}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Points:</span>
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        {badge.points} pts
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Rarity:</span>
                      <Badge className={`${getRarityColor(badge.rarity)} capitalize`}>
                        {badge.rarity}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Students Earned:</span>
                      <span className="text-sm font-medium text-white">{badge.studentsEarned}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${achievement.badgeColor} rounded-full flex items-center justify-center text-lg shadow-lg`}>
                        {achievement.badgeIcon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{achievement.studentName}</h4>
                        <p className="text-sm text-gray-400">earned <span className="text-yellow-400">{achievement.badgeName}</span></p>
                        <p className="text-xs text-gray-500">{achievement.sport} • {new Date(achievement.earnedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      +{achievement.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                Student Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((student, index) => (
                  <div key={student.studentId} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{student.studentName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {student.badges.slice(0, 3).map((badge, badgeIndex) => (
                            <div key={badgeIndex} className={`w-6 h-6 ${badge.color} rounded-full flex items-center justify-center text-xs`}>
                              {badge.icon}
                            </div>
                          ))}
                          {student.badges.length > 3 && (
                            <span className="text-xs text-gray-400">+{student.badges.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{student.totalPoints}</p>
                      <p className="text-xs text-gray-400">{student.badgeCount} badges</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}