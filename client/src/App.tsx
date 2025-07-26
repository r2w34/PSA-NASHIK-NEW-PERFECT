import { useState } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { Sidebar } from "@/components/layout/sidebar";
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading PSA Nashik...</p>
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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/30">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}
      >
        <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full">
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