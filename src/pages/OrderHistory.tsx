
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getOrderHistory } from '@/utils/localStorage';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface OrderHistoryItem {
  orderId: string;
  orderDate: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
    unit: string;
  }>;
  total: number;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  
  useEffect(() => {
    const orderHistory = getOrderHistory();
    setOrders(orderHistory);
  }, []);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP'); // Long format: March 20, 2023
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12 md:py-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Order History</h1>
              <p className="text-lg text-gray-600">
                View all your past orders and their details
              </p>
            </div>
            
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-8">You haven't placed any orders with us yet.</p>
                <Button asChild>
                  <Link to="/">
                    Start Shopping
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <Card key={index} className="shadow-sm animate-fade-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardHeader className="bg-gray-50 rounded-t-lg">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          Order #{order.orderId.slice(-6)}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDate(order.orderDate)}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Delivery Address</h3>
                          <div className="text-sm text-gray-600">
                            <p>{order.customerInfo.name}</p>
                            <p>{order.customerInfo.phone}</p>
                            <p>{order.customerInfo.address}</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium text-gray-700 mb-3">Order Items</h3>
                          <ul className="space-y-2">
                            {order.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex justify-between text-sm">
                                <div>
                                  <span className="text-gray-800">{item.name}</span>
                                  <span className="text-gray-500 ml-2">
                                    {item.quantity} {item.unit} × ₹{item.price.toFixed(2)}
                                  </span>
                                </div>
                                <span className="font-medium">₹{item.totalPrice.toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Order Total</span>
                          <span className="font-bold text-lg">₹{order.total.toFixed(2)}</span>
                        </div>
                        
                        <div className="pt-4">
                          <Button variant="outline" className="w-full" asChild>
                            <Link to="/">
                              Reorder
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderHistory;
