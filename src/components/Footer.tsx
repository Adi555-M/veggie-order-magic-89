
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Fresh vegetables By Parshv Food's</h3>
            <p className="text-sm text-gray-600">
              Fresh vegetables delivered straight to your doorstep. Quality produce at affordable prices.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-veggie-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-to-order" className="text-sm text-gray-600 hover:text-veggie-600 transition-colors">
                  How to Order
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-veggie-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-veggie-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-800">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-veggie-600 mr-2 mt-0.5" />
                <span className="text-sm text-gray-600">+91 9879876030</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-veggie-600 mr-2 mt-0.5" />
                <span className="text-sm text-gray-600">info@parshvfoods.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-veggie-600 mr-2 mt-0.5" />
                <span className="text-sm text-gray-600">123 Market Street, City, State, 123456</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-800">Business Hours</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-veggie-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Monday - Saturday</p>
                  <p className="text-sm text-gray-600">8:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start mt-2">
                <Clock className="h-5 w-5 text-veggie-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Sunday</p>
                  <p className="text-sm text-gray-600">8:00 AM - 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} Fresh vegetables By Parshv Food's. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
