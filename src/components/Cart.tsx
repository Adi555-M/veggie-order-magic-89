
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import CartItem from './CartItem';
import { CartItem as CartItemType, getCart } from '@/utils/localStorage';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  
  // Load cart data
  const loadCart = () => {
    const cart = getCart();
    setCartItems(cart);
    calculateTotal(cart);
  };
  
  // Calculate cart total
  const calculateTotal = (items: CartItemType[]) => {
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    setCartTotal(total);
  };
  
  // Initial load
  useEffect(() => {
    loadCart();
  }, []);
  
  return (
    <div className="animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Your Cart
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some items to your cart to proceed.</p>
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="px-6">
                  <CartItem item={item} onUpdate={loadCart} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
        
        {cartItems.length > 0 && (
          <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-center p-6 bg-gray-50 rounded-b-lg space-y-4 sm:space-y-0">
            <div className="text-lg font-medium">
              Total: ₹{cartTotal.toFixed(2)}
            </div>
            <Button 
              className="w-full sm:w-auto"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Cart;
