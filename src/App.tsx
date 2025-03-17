
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNavBar from "./components/BottomNavBar";

// Use lazy loading for components to reduce initial load time
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const HowToOrder = lazy(() => import("./pages/HowToOrder"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Cart = lazy(() => import("./components/Cart"));
const CheckoutForm = lazy(() => import("./components/CheckoutForm"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Only retry failed queries once
      refetchOnWindowFocus: false, // Disable refetching on window focus
    },
  },
});

// Determine if we're running in production (GitHub Pages) or development
const isGitHubPages = window.location.hostname !== "localhost";

// Loading fallback for lazy-loaded components
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-500">Loading...</p>
  </div>
);

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col pb-16 md:pb-0">
    <Navbar />
    <div className="flex-grow pt-16">
      <div className="container mx-auto px-4 py-12">
        {children}
      </div>
    </div>
    <BottomNavBar />
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Suspense fallback={<LoadingFallback />}>
        {/* Use HashRouter for GitHub Pages to avoid 404 issues with client-side routing */}
        {isGitHubPages ? (
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<PageLayout><About /></PageLayout>} />
              <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
              <Route path="/how-to-order" element={<PageLayout><HowToOrder /></PageLayout>} />
              <Route path="/order-history" element={<PageLayout><OrderHistory /></PageLayout>} />
              <Route path="/order-confirmation" element={<PageLayout><OrderConfirmation /></PageLayout>} />
              <Route path="/cart" element={<PageLayout><Cart /></PageLayout>} />
              <Route path="/checkout" element={<PageLayout><CheckoutForm /></PageLayout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<PageLayout><About /></PageLayout>} />
              <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
              <Route path="/how-to-order" element={<PageLayout><HowToOrder /></PageLayout>} />
              <Route path="/order-history" element={<PageLayout><OrderHistory /></PageLayout>} />
              <Route path="/order-confirmation" element={<PageLayout><OrderConfirmation /></PageLayout>} />
              <Route path="/cart" element={<PageLayout><Cart /></PageLayout>} />
              <Route path="/checkout" element={<PageLayout><CheckoutForm /></PageLayout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
