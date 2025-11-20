import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Overview from "./pages/Overview";
import TickerDetail from "./pages/TickerDetail";
import FactorModel from "./pages/FactorModel";
import MacroDashboard from "./pages/MacroDashboard";
import NewsSentiment from "./pages/NewsSentiment";
import Watchlist from "./pages/Watchlist";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import UpstoxAuth from "./pages/UpstoxAuth";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex flex-1 flex-col">
                <header className="flex h-14 items-center justify-between border-b px-6">
                  <SidebarTrigger />
                  <ThemeToggle />
                </header>
                <main className="flex-1 p-6">
                  <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/ticker/:symbol" element={<TickerDetail />} />
                    <Route path="/factor" element={<FactorModel />} />
                    <Route path="/fundamentals/:symbol" element={<div className="text-center text-muted-foreground">Fundamentals Page - Coming Soon</div>} />
                    <Route path="/news/:symbol" element={<NewsSentiment />} />
                    <Route path="/dependencies/:symbol" element={<div className="text-center text-muted-foreground">Supply Chain Network - Coming Soon</div>} />
                    <Route path="/macro" element={<MacroDashboard />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/upstox-auth" element={<UpstoxAuth />} />
                    <Route path="/animations" element={<div className="text-center text-muted-foreground">Animations Demo - Coming Soon</div>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
