import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initializeStorage } from "@/lib/storage";

// Pages
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import OnboardingPage from "./pages/auth/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import SOSPage from "./pages/SOSPage";
import TownSquarePage from "./pages/TownSquarePage";
import PetProfilePage from "./pages/PetProfilePage";
import ResourceMapPage from "./pages/ResourceMapPage";
import ActivityPage from "./pages/ActivityPage";
import KnowledgePage from "./pages/KnowledgePage";
import AIAssistantPage from "./pages/AIAssistantPage";
import AdoptionPage from "./pages/AdoptionPage";
import CirclesPage from "./pages/CirclesPage";
import JournalPage from "./pages/JournalPage";
import HelpPage from "./pages/HelpPage";
import AdminPage from "./pages/AdminPage";
import RemindersPage from "./pages/RemindersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" richColors />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            
            {/* Main App Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/sos" element={<SOSPage />} />
            <Route path="/town-square" element={<TownSquarePage />} />
            <Route path="/pet-profile" element={<PetProfilePage />} />
            <Route path="/map" element={<ResourceMapPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/adoption" element={<AdoptionPage />} />
            <Route path="/circles" element={<CirclesPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
