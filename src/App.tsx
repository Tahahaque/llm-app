import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Import pages
import WelcomePage from "./pages/WelcomePage";
import PrivacyPage from "./pages/PrivacyPage";
import StoryPage from "./pages/StoryPage";
import ClarifyPage from "./pages/ClarifyPage";
import ReportPage from "./pages/ReportPage";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransitions";
const queryClient = new QueryClient();

// Animation wrapper for page transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route
            path="/"
            element={
              <PageTransition>
                <WelcomePage />
              </PageTransition>
            }
          />
          <Route
            path="/privacy"
            element={
              <PageTransition>
                <PrivacyPage />
              </PageTransition>
            }
          />
          <Route
            path="/story"
            element={
              <PageTransition>
                <StoryPage />
              </PageTransition>
            }
          />
          <Route
            path="/clarify"
            element={
              <PageTransition>
                <ClarifyPage />
              </PageTransition>
            }
          />
          <Route
            path="/report"
            element={
              <PageTransition>
                <ReportPage />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
