
import { useState, useEffect } from 'react';
import { ShoppingCart, Weight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  
  // Predefined quantity options (in grams or kg)
  const quantityOptions = unit === 'g' 
    ? [100, 150, 250, 500, 750, 1000] 
    : [0.1, 0.25, 0.5, 0.75, 1, 2];
  
  // Handle quantity change from manual input
  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    
    if (isNaN(value)) return;
    
    // Apply limits to the entered value
    if (value < 0) return;
    if (value > 10 && unit === 'kg') return;
    if (value > 10000 && unit === 'g') return;
    
    setQuantity(value);
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
  
  // Handle predefined quantity option selection
  const handleQuantityOptionClick = (value: number) => {
    setQuantity(value);
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
        
        <div className="flex flex-col gap-3 mb-3">
          {/* Unit selector (only show for items that can be kg/g) */}
          {vegetable.unit !== 'piece' && (
            <div className="flex text-xs">
              <Button
                variant={unit === 'kg' ? "secondary" : "outline"}
                size="sm"
                className="rounded-l-md rounded-r-none h-7 px-2 flex-1"
                onClick={() => handleUnitChange('kg')}
              >
                KG
              </Button>
              <Button
                variant={unit === 'g' ? "secondary" : "outline"}
                size="sm"
                className="rounded-r-md rounded-l-none h-7 px-2 flex-1"
                onClick={() => handleUnitChange('g')}
              >
                G
              </Button>
            </div>
          )}
          
          {/* Manual quantity input with unit indicator */}
          <div className="flex items-center">
            <div className="relative flex-1">
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityInputChange}
                className="pr-8 h-9"
                step={unit === 'g' ? 50 : 0.1}
                min={0}
                max={unit === 'g' ? 10000 : 10}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                {unit}
              </div>
            </div>
          </div>
          
          {/* Quick quantity select buttons */}
          <div className="grid grid-cols-3 gap-1">
            {quantityOptions.map((option) => (
              <Button
                key={option}
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleQuantityOptionClick(option)}
              >
                {option} {unit}
              </Button>
            ))}
          </div>
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
