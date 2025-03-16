
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowToOrder from "./pages/HowToOrder";
import OrderHistory from "./pages/OrderHistory";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";

const queryClient = new QueryClient();

// Determine if we're running in production (GitHub Pages) or development
const isGitHubPages = window.location.hostname !== "localhost";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Use HashRouter for GitHub Pages to avoid 404 issues with client-side routing */}
      {isGitHubPages ? (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-to-order" element={<HowToOrder />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/cart" element={
              <div className="min-h-screen flex flex-col">
                <div className="flex-grow pt-16">
                  <div className="container mx-auto px-4 py-12">
                    <Cart />
                  </div>
                </div>
              </div>
            } />
            <Route path="/checkout" element={
              <div className="min-h-screen flex flex-col">
                <div className="flex-grow pt-16">
                  <div className="container mx-auto px-4 py-12">
                    <CheckoutForm />
                  </div>
                </div>
              </div>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-to-order" element={<HowToOrder />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/cart" element={
              <div className="min-h-screen flex flex-col">
                <div className="flex-grow pt-16">
                  <div className="container mx-auto px-4 py-12">
                    <Cart />
                  </div>
                </div>
              </div>
            } />
            <Route path="/checkout" element={
              <div className="min-h-screen flex flex-col">
                <div className="flex-grow pt-16">
                  <div className="container mx-auto px-4 py-12">
                    <CheckoutForm />
                  </div>
                </div>
              </div>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
