
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
import BottomNavBar from "./components/BottomNavBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

// Determine if we're running in production (GitHub Pages) or development
const isGitHubPages = window.location.hostname !== "localhost";

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
      {/* Use HashRouter for GitHub Pages to avoid 404 issues with client-side routing */}
      {isGitHubPages ? (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={
              <PageLayout>
                <About />
              </PageLayout>
            } />
            <Route path="/contact" element={
              <PageLayout>
                <Contact />
              </PageLayout>
            } />
            <Route path="/how-to-order" element={
              <PageLayout>
                <HowToOrder />
              </PageLayout>
            } />
            <Route path="/order-history" element={
              <PageLayout>
                <OrderHistory />
              </PageLayout>
            } />
            <Route path="/order-confirmation" element={
              <PageLayout>
                <OrderConfirmation />
              </PageLayout>
            } />
            <Route path="/cart" element={
              <PageLayout>
                <Cart />
              </PageLayout>
            } />
            <Route path="/checkout" element={
              <PageLayout>
                <CheckoutForm />
              </PageLayout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={
              <PageLayout>
                <About />
              </PageLayout>
            } />
            <Route path="/contact" element={
              <PageLayout>
                <Contact />
              </PageLayout>
            } />
            <Route path="/how-to-order" element={
              <PageLayout>
                <HowToOrder />
              </PageLayout>
            } />
            <Route path="/order-history" element={
              <PageLayout>
                <OrderHistory />
              </PageLayout>
            } />
            <Route path="/order-confirmation" element={
              <PageLayout>
                <OrderConfirmation />
              </PageLayout>
            } />
            <Route path="/cart" element={
              <PageLayout>
                <Cart />
              </PageLayout>
            } />
            <Route path="/checkout" element={
              <PageLayout>
                <CheckoutForm />
              </PageLayout>
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
