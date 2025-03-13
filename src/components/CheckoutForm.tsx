
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getCart, getUserInfo, saveUserInfo, saveOrderHistory, clearCart } from '@/utils/localStorage';
import { toast } from "sonner";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load user info if available
  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setFormData(prevData => ({
        ...prevData,
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address
      }));
    }
  }, []);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }
    
    // Save user info for future orders
    saveUserInfo({
      name: formData.name,
      phone: formData.phone,
      address: formData.address
    });
    
    // Prepare order data
    const cart = getCart();
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      setIsSubmitting(false);
      return;
    }
    
    // Calculate total
    const orderTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    
    // Format cart items for WhatsApp
    const itemsList = cart.map(item => {
      return `${item.name} (${item.quantity} ${item.unit}) - ₹${item.totalPrice.toFixed(2)}`;
    }).join('%0A');
    
    // Create WhatsApp message
    const message = 
      `*New Order*%0A%0A` +
      `*Customer Details*%0A` +
      `Name: ${formData.name}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Address: ${formData.address}%0A%0A` +
      `*Order Items*%0A${itemsList}%0A%0A` +
      `*Total: ₹${orderTotal.toFixed(2)}*%0A%0A` +
      (formData.note ? `*Note:* ${formData.note}%0A%0A` : '');
    
    // Save to order history
    saveOrderHistory({
      customerInfo: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        note: formData.note
      },
      items: cart,
      total: orderTotal
    });
    
    // Clear cart
    clearCart();
    
    // Redirect to WhatsApp
    const whatsappURL = `https://wa.me/919879876030?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Show success message
    toast.success("Order placed successfully!");
    
    // Reset form and redirect
    setIsSubmitting(false);
    navigate('/order-confirmation');
  };
  
  return (
    <Card className="max-w-xl mx-auto shadow-sm animate-fade-in">
      <CardHeader className="border-b">
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Your contact number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Your complete address with landmark"
                value={formData.address}
                onChange={handleChange}
                required
                className="resize-none min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="note">Order Note (Optional)</Label>
              <Textarea
                id="note"
                name="note"
                placeholder="Any special instructions for your order"
                value={formData.note}
                onChange={handleChange}
                className="resize-none"
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                Place Order via WhatsApp
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                By placing this order, you'll be redirected to WhatsApp to confirm your order details.
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
