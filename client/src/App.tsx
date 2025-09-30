import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { FirebaseSetupNotice } from "@/components/FirebaseSetupNotice";
import { SearchCommand } from "@/components/SearchCommand";
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import AnalyzePage from "@/pages/analyze";
import ChartsPage from "@/pages/charts";
import AdminUsersPage from "@/pages/admin-users";
import SettingsPage from "@/pages/settings";
import NotFound from "@/pages/not-found";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { databaseError } from "@/lib/firebase";
import { useState, useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={Dashboard} />
      <Route path="/analyze" component={AnalyzePage} />
      <Route path="/charts" component={ChartsPage} />
      <Route path="/admin/users" component={AdminUsersPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthenticatedApp() {
  const { currentUser, loading } = useFirebaseAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (databaseError) {
    return <FirebaseSetupNotice />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthPage />;
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar userRole={currentUser.role} userName={currentUser.name} userEmail={currentUser.email} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-2 p-4 border-b sticky top-0 bg-background/80 backdrop-blur-lg z-50">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSearchOpen(true)}
                className="gap-2"
                data-testid="button-open-search"
                aria-label="Search (⌘K)"
                aria-keyshortcuts="Meta+K Control+K"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Router />
          </main>
        </div>
      </div>
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
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
