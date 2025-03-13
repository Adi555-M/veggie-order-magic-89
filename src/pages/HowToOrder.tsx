
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  ListCheck, 
  CreditCard, 
  Phone, 
  Truck, 
  CheckCheck, 
  ChevronRight 
} from 'lucide-react';

const HowToOrder = () => {
  const steps = [
    {
      title: 'Browse Vegetables',
      description: 'Browse our selection of fresh vegetables and add items to your cart.',
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Review Your Cart',
      description: 'Check your selected items, adjust quantities, and proceed to checkout.',
      icon: ListCheck,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      title: 'Enter Your Details',
      description: 'Provide your name, phone number, and delivery address.',
      icon: CreditCard,
      color: 'bg-pink-100 text-pink-700'
    },
    {
      title: 'Confirm via WhatsApp',
      description: 'You\'ll be redirected to WhatsApp to confirm your order with us.',
      icon: Phone,
      color: 'bg-green-100 text-green-700'
    },
    {
      title: 'Delivery',
      description: 'We\'ll deliver your vegetables fresh to your doorstep.',
      icon: Truck,
      color: 'bg-orange-100 text-orange-700'
    },
    {
      title: 'Enjoy!',
      description: 'Enjoy your fresh, high-quality vegetables!',
      icon: CheckCheck,
      color: 'bg-teal-100 text-teal-700'
    }
  ];

  const faqs = [
    {
      question: 'What are your delivery timings?',
      answer: 'We deliver between 9:00 AM and 7:00 PM every day. You\'ll receive your order on the same day if placed before 12 PM, or the next day for later orders.'
    },
    {
      question: 'Is there a minimum order value?',
      answer: 'Yes, our minimum order value is ₹200 for free delivery. Orders below this amount will incur a delivery fee of ₹30.'
    },
    {
      question: 'How can I pay for my order?',
      answer: 'Currently, we accept cash on delivery, UPI payments, and bank transfers.'
    },
    {
      question: 'What if I\'m not satisfied with the quality?',
      answer: 'Customer satisfaction is our priority. If you\'re not happy with the quality of any item, please inform us within 24 hours of delivery, and we\'ll replace it or provide a refund.'
    },
    {
      question: 'Can I modify my order after placing it?',
      answer: 'Yes, you can modify your order by contacting us through WhatsApp before it\'s dispatched for delivery.'
    },
    {
      question: 'What areas do you deliver to?',
      answer: 'We currently deliver to all major areas within the city. You can check if delivery is available to your location during checkout.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <section className="bg-gradient-to-b from-veggie-50 to-white py-12 md:py-16 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How to Order</h1>
              <p className="text-lg text-gray-600 mb-8">
                Ordering fresh vegetables from us is quick and easy. Follow these simple steps to get started.
              </p>
            </div>
          </div>
        </section>
        
        {/* Order Steps */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 animate-fade-slide-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`${step.color} p-4 rounded-full`}>
                      <step.icon className="h-8 w-8" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        <span className="inline-block w-7 h-7 text-sm bg-gray-100 rounded-full text-center leading-7 mr-2">
                          {index + 1}
                        </span>
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className="hidden md:block">
                        <ChevronRight className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button size="lg" asChild>
                  <Link to="/">
                    Start Shopping Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b last:border-0">
                    <details className="group p-6">
                      <summary className="flex justify-between items-center cursor-pointer list-none">
                        <h3 className="text-lg font-medium">{faq.question}</h3>
                        <span className="transition group-open:rotate-180">
                          <ChevronRight className="h-5 w-5" />
                        </span>
                      </summary>
                      <p className="mt-4 text-gray-600">{faq.answer}</p>
                    </details>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-600">Have more questions? Feel free to contact us!</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowToOrder;
