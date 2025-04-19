import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ItineraryProvider } from "./contexts/ItineraryContext";

// Page Imports
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import TravelGuides from "./pages/TravelGuides";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// New Component Imports
import BudgetTracker from "./components/BudgetTracker";
import TravelAlerts from "./components/TravelAlerts";
import VoiceGuide from "./components/VoiceGuide";
import LiveInstructions from "./components/LiveInstructions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <ItineraryProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Index />
                    <BudgetTracker destination="Default" /> {/* Default destination, update dynamically */}
                    <TravelAlerts />
                    <LiveInstructions destination="Default" />
                  </>
                }
              />
              <Route
                path="/destinations"
                element={
                  <>
                    <Destinations />
                    <BudgetTracker destination="SelectedDestination" /> {/* Update with dynamic destination */}
                    <TravelAlerts />
                    <LiveInstructions destination="SelectedDestination" />
                  </>
                }
              />
              <Route
                path="/guides"
                element={
                  <>
                    <TravelGuides />
                    <VoiceGuide destination="SelectedDestination" /> {/* Add voice guide for guides page */}
                    <LiveInstructions destination="SelectedDestination" />
                  </>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ItineraryProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;