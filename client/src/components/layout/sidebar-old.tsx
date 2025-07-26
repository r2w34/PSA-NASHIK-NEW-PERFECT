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

export function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileToggle }: SidebarProps) {
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Students", href: "/students", icon: Users },
    { name: "Fees", href: "/fees", icon: CreditCard },
    { name: "Attendance", href: "/attendance", icon: Calendar },
    { name: "Sports", href: "/sports", icon: Trophy },
    { name: "Batches", href: "/batches", icon: UserCheck },
    { name: "Coaches", href: "/coaches", icon: Users },
    { name: "Communications", href: "/communications", icon: MessageSquare },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "AI Insights", href: "/ai-insights", icon: Brain },
    { name: "Student Badges", href: "/student-badges", icon: Award },
    { name: "Campaigns", href: "/campaigns", icon: Megaphone },
    { name: "User Management", href: "/user-management", icon: Shield },
    { name: "GPS Tracking", href: "/gps-tracking", icon: MapPin },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
          transition-all duration-300 ease-in-out flex flex-col shadow-xl
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'px-2' : ''}`}>
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2 shadow-lg">
                <img 
                  src={psaLogo} 
                  alt="PSA Logo" 
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div className="hidden lg:block">
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Parmanand Sports</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Academy</p>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2 shadow-lg mx-auto">
              <img 
                src={psaLogo} 
                alt="PSA Logo" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
          )}
          
          {/* Desktop toggle button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="hidden lg:flex p-1.5 h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileToggle}
            className="lg:hidden p-1.5 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    className={`
                      w-full justify-start gap-3 h-11 px-3 font-medium transition-all duration-200
                      ${isCollapsed ? 'px-2 justify-center' : ''}
                      ${active 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                      }
                    `}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onMobileToggle();
                      }
                    }}
                  >
                    <Icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : ''}`} />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.name}</span>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Administrator</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}