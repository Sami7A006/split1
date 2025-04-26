import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  SplitSquareVertical
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <SplitSquareVertical size={28} className="text-primary-400" />
              <span className="text-xl font-display font-bold text-white">SubSplit</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Connect with fellow students to share subscription costs. Save money together and enjoy premium services without breaking the bank.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:hello@subsplit.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/groups" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Find Groups
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-primary-400 transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Resources</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-primary-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Legal</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} SubSplit. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Made with ❤️ for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;