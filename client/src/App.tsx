import { useState } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import Sidebar from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Students from "@/pages/students";
import Fees from "@/pages/fees";
import Attendance from "@/pages/attendance";
import Sports from "@/pages/sports";
import Batches from "@/pages/batches";
import Coaches from "@/pages/coaches";
import Communications from "@/pages/communications";
import Reports from "@/pages/reports";
import AIInsights from "@/pages/ai-insights";
import StudentBadges from "@/pages/student-badges";
import Campaigns from "@/pages/campaigns";
import UserManagement from "@/pages/user-management";
import GPSTracking from "@/pages/gps-tracking";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

function Router() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading, checkAuth } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative text-center space-y-6 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 mx-auto">
              <div className="absolute inset-2 bg-gray-900 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              PSA Nashik
            </h2>
            <p className="text-purple-300/80">Loading Sports Academy Management...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Login 
        onLoginSuccess={() => {
          checkAuth();
        }} 
      />
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out relative z-10 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
        }`}
      >
        <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full backdrop-blur-sm">
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/students" component={Students} />
              <Route path="/fees" component={Fees} />
              <Route path="/attendance" component={Attendance} />
              <Route path="/sports" component={Sports} />
              <Route path="/batches" component={Batches} />
              <Route path="/coaches" component={Coaches} />
              <Route path="/communications" component={Communications} />
              <Route path="/reports" component={Reports} />
              <Route path="/ai-insights" component={AIInsights} />
              <Route path="/student-badges" component={StudentBadges} />
              <Route path="/campaigns" component={Campaigns} />
              <Route path="/user-management" component={UserManagement} />
              <Route path="/gps-tracking" component={GPSTracking} />
              <Route path="/settings" component={Settings} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;