import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import AnalyzePage from "@/pages/analyze";
import ChartsPage from "@/pages/charts";
import AdminUsersPage from "@/pages/admin-users";
import NotFound from "@/pages/not-found";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={Dashboard} />
      <Route path="/analyze" component={AnalyzePage} />
      <Route path="/charts" component={ChartsPage} />
      <Route path="/admin/users" component={AdminUsersPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthenticatedApp() {
  const [isAuthenticated] = useState(true);
  const [userRole] = useState<"user" | "admin">("admin");

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar userRole={userRole} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthenticatedApp />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
