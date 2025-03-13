
import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VegetableItem } from '@/data/vegetables';
import { CartItem, getCart, saveCart } from '@/utils/localStorage';
import { toast } from "sonner";

interface VegetableCardProps {
  vegetable: VegetableItem;
}

const VegetableCard = ({ vegetable }: VegetableCardProps) => {
  const [quantity, setQuantity] = useState(0.5);
  const [unit, setUnit] = useState<'kg' | 'g' | 'piece'>(vegetable.unit);
  const [isAdding, setIsAdding] = useState(false);
  
  // Handle quantity change
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    
    // Minimum quantity check
    if (newQuantity < 0.1) return;
    
    // Maximum quantity check (10 units max)
    if (newQuantity > 10) return;
    
    setQuantity(newQuantity);
  };
  
  // Handle unit change (kg to g)
  const handleUnitChange = (newUnit: 'kg' | 'g' | 'piece') => {
    if (newUnit === unit) return;
    
    if (newUnit === 'g' && unit === 'kg') {
      setQuantity(quantity * 1000);
    } else if (newUnit === 'kg' && unit === 'g') {
      setQuantity(quantity / 1000);
    }
    
    setUnit(newUnit);
  };
  
  // Calculate total price
  const calculateTotalPrice = () => {
    if (unit === 'g') {
      return (vegetable.price * quantity) / 1000; // Convert g price to kg price
    }
    return vegetable.price * quantity;
  };
  
  // Add to cart functionality
  const addToCart = () => {
    if (quantity <= 0) return;
    
    setIsAdding(true);
    
    // Prepare cart item
    const cartItem: CartItem = {
      id: vegetable.id,
      name: vegetable.name,
      price: vegetable.price,
      image: vegetable.image,
      quantity: unit === 'g' ? quantity / 1000 : quantity, // Always store in kg or pieces
      unit: unit === 'g' ? 'kg' : unit, // Normalize unit to kg
      totalPrice: calculateTotalPrice(),
    };
    
    // Get current cart
    const currentCart = getCart();
    
    // Check if item already exists
    const existingItemIndex = currentCart.findIndex(item => item.id === vegetable.id);
    
    if (existingItemIndex !== -1) {
      // Update existing item
      currentCart[existingItemIndex].quantity += cartItem.quantity;
      currentCart[existingItemIndex].totalPrice += cartItem.totalPrice;
    } else {
      // Add new item
      currentCart.push(cartItem);
    }
    
    // Save updated cart
    saveCart(currentCart);
    
    // Dispatch cart updated event
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show toast
    toast.success(`Added ${vegetable.name} to cart`);
    
    // Reset state
    setQuantity(0.5);
    setIsAdding(false);
  };
  
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover-scale">
      <div className="overflow-hidden h-48 relative">
        <img
          src={vegetable.image}
          alt={vegetable.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-white/90 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
            ₹{vegetable.price}/{vegetable.unit}
          </span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-lg text-gray-800 mb-1">{vegetable.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{vegetable.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center border rounded p-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full" 
              onClick={() => handleQuantityChange(-0.1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="mx-2 text-sm font-medium">{quantity.toFixed(1)}</span>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full" 
              onClick={() => handleQuantityChange(0.1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Unit selector (only show for items that can be kg/g) */}
          {vegetable.unit !== 'piece' && (
            <div className="flex text-xs">
              <Button
                variant={unit === 'kg' ? "secondary" : "outline"}
                size="sm"
                className="rounded-l-md rounded-r-none h-7 px-2"
                onClick={() => handleUnitChange('kg')}
              >
                KG
              </Button>
              <Button
                variant={unit === 'g' ? "secondary" : "outline"}
                size="sm"
                className="rounded-r-md rounded-l-none h-7 px-2"
                onClick={() => handleUnitChange('g')}
              >
                G
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="font-medium">₹{calculateTotalPrice().toFixed(2)}</div>
          <Button 
            size="sm" 
            className="bg-veggie-600 hover:bg-veggie-700 text-white"
            onClick={addToCart}
            disabled={isAdding}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VegetableCard;
