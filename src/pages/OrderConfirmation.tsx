
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { CheckCircle, Home, History } from 'lucide-react';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 animate-scale-in">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-slide-in">
              Order Placed Successfully!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 animate-fade-slide-in" style={{ animationDelay: '100ms' }}>
              Thank you for your order. Your vegetables are on their way to WhatsApp for confirmation!
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8 animate-fade-slide-in" style={{ animationDelay: '200ms' }}>
              <h3 className="font-medium text-gray-800 mb-3">What's Next?</h3>
              <p className="text-gray-600 text-sm mb-4">
                We've redirected you to WhatsApp to confirm your order. If you didn't complete the WhatsApp message, please contact us at:
              </p>
              <div className="text-veggie-600 font-medium">+91 9879876030</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-slide-in" style={{ animationDelay: '300ms' }}>
              <Button variant="outline" asChild className="flex-1">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              
              <Button asChild className="flex-1">
                <Link to="/order-history">
                  <History className="mr-2 h-4 w-4" />
                  View Order History
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
