import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { 
  Menu, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  User, 
  LogOut,
  Settings,
  UserPlus,
  CreditCard
} from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();

  const handleAddStudent = () => {
    // Navigate to students page and trigger add student modal
    window.location.href = '/students?action=add';
  };

  const handleRecordPayment = () => {
    // Navigate to fees page and trigger record payment modal
    window.location.href = '/fees?action=record-payment';
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const notifications = [
    { id: 1, title: 'New student enrollment', message: 'John Doe has enrolled in Cricket batch', time: '5 min ago', unread: true },
    { id: 2, title: 'Payment received', message: 'Fee payment of ₹2,000 received from Jane Smith', time: '10 min ago', unread: true },
    { id: 3, title: 'Batch capacity alert', message: 'Football batch A is 90% full', time: '1 hour ago', unread: false },
  ];

  return (
    <header className="bg-gray-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 shadow-2xl">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu and search */}
        <div className="flex items-center space-x-6 flex-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden p-2 h-10 w-10 hover:bg-white/10 text-purple-300 hover:text-white rounded-xl"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Global search */}
          <div className="relative max-w-lg w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
            <Input
              type="text"
              placeholder="Search students, payments, batches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-purple-300/60 focus:bg-white/10 focus:border-purple-500/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side - Quick actions and user menu */}
        <div className="flex items-center space-x-3">
          {/* Quick action buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddStudent}
              className="h-11 px-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 text-blue-300 border border-blue-500/30 hover:border-blue-400/50 rounded-xl backdrop-blur-sm transition-all duration-200"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRecordPayment}
              className="h-11 px-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 text-green-300 border border-green-500/30 hover:border-green-400/50 rounded-xl backdrop-blur-sm transition-all duration-200"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-3 h-11 w-11 relative hover:bg-white/10 text-purple-300 hover:text-white rounded-xl transition-all duration-200"
            >
              <Bell className="h-5 w-5" />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-lg"></span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 z-50">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-white/5 hover:bg-white/5 transition-all duration-200 ${
                        notification.unread ? 'bg-purple-500/10' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-purple-500' : 'bg-gray-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{notification.title}</p>
                          <p className="text-xs text-purple-300/80 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-white/10">
                  <Button variant="ghost" size="sm" className="w-full text-sm text-purple-300 hover:text-white hover:bg-white/10 rounded-xl">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="p-3 h-11 w-11 hover:bg-white/10 text-purple-300 hover:text-white rounded-xl transition-all duration-200"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* User menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 h-11 flex items-center space-x-3 hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
                <div className="relative w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-sm font-bold text-white">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
              <span className="hidden md:block text-sm font-medium text-white">
                {user?.name || 'Admin'}
              </span>
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 z-50">
                <div className="p-4 border-b border-white/10">
                  <p className="text-sm font-semibold text-white">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-purple-300/80">{user?.email || 'admin@psa-nashik.com'}</p>
                </div>
                <div className="py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start px-4 py-3 text-sm text-purple-300 hover:text-white hover:bg-white/10 rounded-xl mx-2 transition-all duration-200"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start px-4 py-3 text-sm text-purple-300 hover:text-white hover:bg-white/10 rounded-xl mx-2 transition-all duration-200"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Button>
                </div>
                <div className="py-2 border-t border-white/10">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl mx-2 transition-all duration-200"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
}