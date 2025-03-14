
import { useState } from 'react';
import { Trash2, Edit, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CartItem as CartItemType, getCart, saveCart } from '@/utils/localStorage';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemType;
  onUpdate: () => void;
}

const CartItem = ({ item, onUpdate }: CartItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedImage, setEditedImage] = useState<string>(item.image);
  const [editedName, setEditedName] = useState<string>(item.name);
  
  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseFloat(e.target.value);
    
    if (isNaN(newQuantity) || newQuantity < 0) return;
    if (newQuantity > 10) return; // Maximum 10 kg/pieces
    
    setQuantity(newQuantity);
    updateCartQuantity(newQuantity);
  };
  
  // Update item quantity in cart
  const updateCartQuantity = (newQuantity: number) => {
    setIsUpdating(true);
    
    // Get current cart
    const currentCart = getCart();
    
    // Find the item
    const itemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (itemIndex !== -1) {
      // Min quantity check (remove if less than 0.1)
      if (newQuantity < 0.1) {
        currentCart.splice(itemIndex, 1);
      } else {
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

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Save edited cart item
  const saveEditedItem = () => {
    setIsUpdating(true);
    
    // Get current cart
    const currentCart = getCart();
    
    // Find the item
    const itemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (itemIndex !== -1) {
      // Update item details
      currentCart[itemIndex].name = editedName;
      currentCart[itemIndex].image = editedImage;
      
      // Save updated cart
      saveCart(currentCart);
      
      // Trigger update in parent
      onUpdate();
      toast.success("Item updated successfully");
    }
    
    setIsEditDialogOpen(false);
    setIsUpdating(false);
  };
  
  return (
    <>
      <div className="flex items-center py-4 border-b last:border-b-0 animate-fade-in">
        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 relative group">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <button 
            onClick={() => setIsEditDialogOpen(true)} 
            className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
          >
            <Edit className="h-5 w-5 text-white" />
          </button>
        </div>
        
        <div className="ml-4 flex-grow">
          <h4 className="font-medium text-gray-800">{item.name}</h4>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <span>₹{item.price.toFixed(2)}/{item.unit}</span>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <div className="relative w-24">
                <Input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="pr-8 h-8 text-sm"
                  step={0.1}
                  min={0.1}
                  max={10}
                  disabled={isUpdating}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  {item.unit}
                </div>
              </div>
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

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Item Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input 
                value={editedName} 
                onChange={(e) => setEditedName(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Image</label>
              <div className="mt-1">
                <Input 
                  type="file" 
                  onChange={handleImageChange}
                  accept="image/*"
                  filePreview={editedImage}
                />
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={saveEditedItem} disabled={isUpdating}>
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartItem;
