
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getCart } from '@/utils/localStorage';
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      setCartItemCount(cart.length);
    };
    
    // Initial count
    updateCartCount();
    
    // Listen for storage events (cart updates)
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'How to Order', path: '/how-to-order' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Order History', path: '/order-history' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="text-veggie-700 font-bold text-xl md:text-2xl transition-all duration-300 hover:text-veggie-600">
              Veggie Express
            </div>
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink 
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `font-medium text-sm transition-all duration-200 hover:text-veggie-600 ${
                    isActive ? 'text-veggie-600' : 'text-gray-700'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          
          {/* Cart Button */}
          <div className="flex items-center">
            <NavLink to="/cart" className="relative p-2 mr-2">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-veggie-600 transition-colors" />
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </NavLink>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-slide-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink 
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => 
                    `font-medium text-sm transition-all duration-200 hover:text-veggie-600 ${
                      isActive ? 'text-veggie-600' : 'text-gray-700'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
