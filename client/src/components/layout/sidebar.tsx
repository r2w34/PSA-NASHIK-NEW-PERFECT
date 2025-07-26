import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Calendar, 
  Trophy,
  UserCheck,
  MessageSquare,
  Settings,
  Megaphone,
  BarChart3,
  Brain,
  X,
  Shield,
  MapPin,
  Award,
  GraduationCap
} from "lucide-react";
import psaLogo from "@/assets/psa-logo.png";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

const navigationItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, color: "from-blue-500 to-cyan-500" },
  { name: "Students", href: "/students", icon: Users, color: "from-green-500 to-emerald-500" },
  { name: "Fees", href: "/fees", icon: CreditCard, color: "from-yellow-500 to-orange-500" },
  { name: "Attendance", href: "/attendance", icon: Calendar, color: "from-purple-500 to-pink-500" },
  { name: "Sports", href: "/sports", icon: Trophy, color: "from-red-500 to-rose-500" },
  { name: "Batches", href: "/batches", icon: GraduationCap, color: "from-indigo-500 to-blue-500" },
  { name: "Coaches", href: "/coaches", icon: UserCheck, color: "from-teal-500 to-cyan-500" },
  { name: "Communications", href: "/communications", icon: MessageSquare, color: "from-violet-500 to-purple-500" },
  { name: "Reports", href: "/reports", icon: BarChart3, color: "from-pink-500 to-rose-500" },
  { name: "AI Insights", href: "/ai-insights", icon: Brain, color: "from-cyan-500 to-blue-500" },
  { name: "Student Badges", href: "/student-badges", icon: Award, color: "from-amber-500 to-yellow-500" },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone, color: "from-lime-500 to-green-500" },
  { name: "User Management", href: "/user-management", icon: Shield, color: "from-slate-500 to-gray-500" },
  { name: "GPS Tracking", href: "/gps-tracking", icon: MapPin, color: "from-emerald-500 to-teal-500" },
  { name: "Settings", href: "/settings", icon: Settings, color: "from-gray-500 to-slate-500" },
];

export default function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileToggle }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 
        ${isCollapsed ? 'w-20' : 'w-72'} 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-all duration-300 ease-in-out
        bg-gradient-to-b from-gray-900/95 via-gray-900/95 to-purple-900/95
        backdrop-blur-xl border-r border-white/10
        flex flex-col
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                  <img 
                    src={psaLogo} 
                    alt="PSA Logo" 
                    className="relative h-12 w-12 rounded-xl shadow-2xl ring-2 ring-white/20"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Parmanand Sports
                  </h1>
                  <p className="text-purple-300/80 text-sm font-medium">Academy Management</p>
                </div>
              </div>
            )}
            
            {/* Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="hidden lg:flex p-2 rounded-xl hover:bg-white/10 text-purple-300 hover:text-white transition-all duration-200"
            >
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>

            {/* Mobile Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileToggle}
              className="lg:hidden p-2 rounded-xl hover:bg-white/10 text-purple-300 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.name} href={item.href}>
                <div className={`
                  group relative flex items-center space-x-4 px-4 py-3 rounded-xl
                  transition-all duration-300 cursor-pointer
                  ${isActive 
                    ? `bg-gradient-to-r ${item.color} shadow-lg shadow-purple-500/25 text-white` 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }
                `}>
                  
                  {/* Icon */}
                  <div className={`
                    relative p-2 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-white/20 shadow-lg' 
                      : 'bg-white/5 group-hover:bg-white/10'
                    }
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Label */}
                  {!isCollapsed && (
                    <span className="font-medium text-sm truncate">
                      {item.name}
                    </span>
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                  )}

                  {/* Hover Glow Effect */}
                  {!isActive && (
                    <div className={`
                      absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                      bg-gradient-to-r ${item.color} blur-xl -z-10
                      transition-opacity duration-300
                    `} style={{ filter: 'blur(20px)' }}></div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className={`
            flex items-center space-x-4 p-4 rounded-xl
            bg-gradient-to-r from-purple-500/10 to-pink-500/10
            border border-white/10 backdrop-blur-sm
            hover:bg-white/10 transition-all duration-300
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
              <div className="relative h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-white text-sm font-bold">A</span>
              </div>
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">Admin User</p>
                <p className="text-purple-300/80 text-xs truncate">System Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}