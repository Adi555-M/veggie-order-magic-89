
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, User, HelpCircle, Phone } from 'lucide-react';

const BottomNavBar = () => {
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: HelpCircle, path: '/how-to-order', label: 'How to' },
    { icon: ShoppingCart, path: '/cart', label: 'Cart' },
    { icon: Phone, path: '/contact', label: 'Contact' },
    { icon: User, path: '/order-history', label: 'Orders' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:hidden z-50">
      <div className="flex justify-between px-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center text-xs font-medium
              ${isActive ? 'text-veggie-600' : 'text-gray-500'}
            `}
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
