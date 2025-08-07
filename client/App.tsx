import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Critical pages - loaded immediately
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

// Lazy-loaded pages for better performance
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Warranty = lazy(() => import("./pages/Warranty"));
const Support = lazy(() => import("./pages/Support"));
const RequestFreeSample = lazy(() => import("./pages/RequestFreeSample"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

// Product Pages - lazy loaded
const SmartWalls = lazy(() => import("./pages/SmartWalls"));
const SmartDevices = lazy(() => import("./pages/SmartDevices"));
const LuxuryWallpapers = lazy(() => import("./pages/LuxuryWallpapers"));
const AcousticPanels = lazy(() => import("./pages/AcousticPanels"));
const CarbonRockBoards = lazy(() => import("./pages/CarbonRockBoards"));
const SmartWallConstructionPage = lazy(() => import('./pages/SmartWallConstructionPage'));

// Wall Panel Pages - lazy loaded
const WallPanels = lazy(() => import("./pages/WallPanels"));
const WPCWallPanels = lazy(() => import("./pages/WPCWallPanels"));
const AntiCollisionWallPanels = lazy(() => import("./pages/AntiCollisionWallPanels"));
const WPCSplicingBoards = lazy(() => import("./pages/WPCSplicingBoards"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b69777] mx-auto mb-4"></div>
      <p className="text-[#6b5c47] font-medium">Loading...</p>
    </div>
  </div>
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
            
            {/* Wall Panel Routes */}
            <Route path="/wall-panels" element={<WallPanels />} />
            <Route path="/wall-panels/wpc" element={<WPCWallPanels />} />
            <Route path="/wall-panels/anti-collision" element={<AntiCollisionWallPanels />} />
            <Route path="/wall-panels/wpc-splicing" element={<WPCSplicingBoards />} />

            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
