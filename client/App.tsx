import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop"; // adjust path if needed
import NotFound from "./pages/NotFound";
// import SmartWallInquiry from "./pages/SmartWallInquiry";
// Legal Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Warranty from "./pages/Warranty";
import Support from "./pages/Support";
import RequestFreeSample from "./pages/RequestFreeSample";
import ContactUs from "./pages/ContactUs";

// Product Pages
import SmartWalls from "./pages/SmartWalls";
import SmartDevices from "./pages/SmartDevices";
import LuxuryWallpapers from "./pages/LuxuryWallpapers";
import AcousticPanels from "./pages/AcousticPanels";
import CarbonRockBoards from "./pages/CarbonRockBoards";
import SmartWallConstructionPage from './pages/SmartWallConstructionPage';
const queryClient = new QueryClient();

const App = () => (
  
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop /> {/* 👈 Add this here */}
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/support" element={<Support />} />
          <Route path="/request-free-sample" element={<RequestFreeSample />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Static Pages */}
          {/* <Route path="/smart-wall-inquiry" element={<SmartWallInquiry />} /> */}
           <Route 
          path="/smart-wall-construction" 
          element={<SmartWallConstructionPage />} 
        />
          {/* Product Pages */}
          <Route path="/smart-walls" element={<SmartWalls />} />
          <Route path="/luxury-wallpapers" element={<LuxuryWallpapers />} />
          <Route path="/acoustic-panels" element={<AcousticPanels />} />
          <Route path="/carbon-rock-boards" element={<CarbonRockBoards />} />
          <Route path="/smart-devices" element={<SmartDevices />} />
          

          {/* Catch-all for 404 */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
