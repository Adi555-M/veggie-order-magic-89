
import { useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType, getCart, saveCart } from '@/utils/localStorage';

interface CartItemProps {
  item: CartItemType;
  onUpdate: () => void;
}

const CartItem = ({ item, onUpdate }: CartItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Update item quantity
  const updateQuantity = (amount: number) => {
    setIsUpdating(true);
    
    // Get current cart
    const currentCart = getCart();
    
    // Find the item
    const itemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (itemIndex !== -1) {
      // Calculate new quantity
      const newQuantity = currentCart[itemIndex].quantity + amount;
      
      // Min quantity check (remove if less than 0.1)
      if (newQuantity < 0.1) {
        currentCart.splice(itemIndex, 1);
      } else {
        // Max quantity check (10 units max)
        if (newQuantity > 10) {
          setIsUpdating(false);
          return;
        }
        
        // Update quantity and recalculate price
        currentCart[itemIndex].quantity = newQuantity;
        currentCart[itemIndex].totalPrice = newQuantity * currentCart[itemIndex].price;
      }
      
      // Save updated cart
      saveCart(currentCart);
      
      // Trigger update in parent
      onUpdate();
    }
    
    setIsUpdating(false);
  };
  
  // Remove item from cart
  const removeItem = () => {
    setIsUpdating(true);
    
    // Get current cart
    const currentCart = getCart();
    
    // Filter out the item
    const updatedCart = currentCart.filter(cartItem => cartItem.id !== item.id);
    
    // Save updated cart
    saveCart(updatedCart);
    
    // Trigger update in parent
    onUpdate();
    
    setIsUpdating(false);
  };
  
  return (
    <div className="flex items-center py-4 border-b last:border-b-0 animate-fade-in">
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h4 className="font-medium text-gray-800">{item.name}</h4>
        <div className="flex items-center mt-1 text-sm text-gray-600">
          <span>₹{item.price.toFixed(2)}/{item.unit}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full" 
              onClick={() => updateQuantity(-0.1)}
              disabled={isUpdating}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="mx-2 text-sm font-medium">
              {item.quantity.toFixed(1)} {item.unit}
            </span>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full" 
              onClick={() => updateQuantity(0.1)}
              disabled={isUpdating}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="font-medium">₹{item.totalPrice.toFixed(2)}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50" 
              onClick={removeItem}
              disabled={isUpdating}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
