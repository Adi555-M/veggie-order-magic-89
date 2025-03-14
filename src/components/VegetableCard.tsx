import { useState, useEffect } from 'react';
import { ShoppingCart, Weight, Edit, Check, X } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { VegetableItem } from '@/data/vegetables';
import { CartItem, getCart, saveCart } from '@/utils/localStorage';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface VegetableCardProps {
  vegetable: VegetableItem;
  onVegetableUpdate?: (updatedVegetable: VegetableItem) => void;
  isEditable?: boolean;
}

// Form schema for vegetable editing
const vegetableFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean().default(true),
});

type VegetableFormValues = z.infer<typeof vegetableFormSchema>;

const VegetableCard = ({ vegetable, onVegetableUpdate, isEditable = false }: VegetableCardProps) => {
  const [quantity, setQuantity] = useState(0.5);
  const [unit, setUnit] = useState<'kg' | 'g' | 'piece'>(vegetable.unit);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(vegetable.image);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Form for editing vegetable details
  const form = useForm<VegetableFormValues>({
    resolver: zodResolver(vegetableFormSchema),
    defaultValues: {
      name: vegetable.name,
      price: vegetable.price,
      description: vegetable.description || "",
      category: vegetable.category,
      inStock: vegetable.inStock,
    },
  });

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

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle vegetable update
  const onSubmit = (data: VegetableFormValues) => {
    if (!onVegetableUpdate) {
      toast.error("Update functionality is not available");
      return;
    }

    const updatedVegetable: VegetableItem = {
      ...vegetable,
      ...data,
      image: imagePreview || vegetable.image,
    };

    onVegetableUpdate(updatedVegetable);
    setIsEditDialogOpen(false);
    toast.success("Vegetable details updated successfully");
  };
  
  return (
    <>
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
          {isEditable && (
            <button 
              onClick={() => setIsEditDialogOpen(true)}
              className="absolute top-2 left-2 bg-white/90 p-1.5 rounded-full text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
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

      {/* Edit Vegetable Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Vegetable Details</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹/{vegetable.unit})</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">In Stock</FormLabel>
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  filePreview={imagePreview}
                />
              </div>
              
              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VegetableCard;
