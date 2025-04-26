import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  Settings,
  Users,
  SplitSquareVertical
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
    closeDropdown();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-primary-600 transition-colors hover:text-primary-700"
            >
              <SplitSquareVertical size={28} className="text-primary-600" />
              <span className="text-xl font-display font-bold">SubSplit</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === '/services' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Services
            </Link>
            {user && (
              <Link 
                to="/groups" 
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname.startsWith('/groups') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                My Groups
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notification icon */}
                <button 
                  className="rounded-full p-1 text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600"
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                </button>
                
                {/* User dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-700">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'User'}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <UserIcon size={16} />
                      )}
                    </div>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          <div className="font-medium">{user.displayName}</div>
                          <div className="text-xs text-gray-500 truncate">{user.email}</div>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <UserIcon size={16} className="mr-3" />
                          Profile
                        </Link>
                        <Link
                          to="/groups"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Users size={16} className="mr-3" />
                          My Groups
                        </Link>
                        <Link
                          to="/profile/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings size={16} className="mr-3" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut size={16} className="mr-3" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="btn btn-outline"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600 md:hidden"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                location.pathname === '/'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                location.pathname === '/services'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Services
            </Link>
            {user && (
              <Link
                to="/groups"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  location.pathname.startsWith('/groups')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                My Groups
              </Link>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-md"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;