import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, User } from 'lucide-react';

function FreelancerNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Primary Nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo here */}
              <Link to="/" className="font-bold text-xl text-blue-600">DesignMatch</Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link 
                to="/freelancer/profile" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/freelancer/profile') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Profile
              </Link>
              <Link 
                to="/freelancer/portfolio" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/freelancer/portfolio') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Portfolio
              </Link>
              <Link 
                to="/freelancer/services" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/freelancer/services') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Services
              </Link>
              <Link 
                to="/freelancer/chat" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/freelancer/chat') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Messages
              </Link>
            </div>
          </div>

          {/* Right side navigation items */}
          <div className="hidden md:flex items-center">
            {/* Notifications */}
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 relative">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 bg-white rounded-full focus:outline-none"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">Jane Designer</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </div>

              {isProfileDropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to="/freelancer/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/freelancer/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/signout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/freelancer/profile"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/freelancer/profile')
                  ? 'border-blue-500 text-blue-700 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Profile
            </Link>
            <Link
              to="/freelancer/portfolio"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/freelancer/portfolio')
                  ? 'border-blue-500 text-blue-700 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Portfolio
            </Link>
            <Link
              to="/freelancer/services"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/freelancer/services')
                  ? 'border-blue-500 text-blue-700 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Services
            </Link>
            <Link
              to="/chat"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/chat')
                  ? 'border-blue-500 text-blue-700 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Messages
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={24} className="text-gray-500" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Jane Designer</div>
                <div className="text-sm font-medium text-gray-500">jane@example.com</div>
              </div>
              <button className="ml-auto p-1 rounded-full text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                to="/freelancer/profile"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Your Profile
              </Link>
              <Link
                to="/freelancer/settings"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Settings
              </Link>
              <Link
                to="/signout"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default FreelancerNavbar;
