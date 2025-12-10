import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, LogOut, Phone, Mail } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { storeInfo } from '../lib/data';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Mock B2B user state - in production, this would come from auth context
  const [isB2BLoggedIn, setIsB2BLoggedIn] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <p className="flex items-center gap-2">
              <span className="hidden sm:inline">🏆</span>
              <span>India&apos;s Most Trusted Sports Equipment Store Since 1988</span>
            </p>
            <div className="hidden md:flex gap-4 items-center">
              <a href={`tel:${storeInfo.phone[0].replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-blue-200">
                <Phone className="w-3 h-3" />
                {storeInfo.phone[0]}
              </a>
              <a href={`mailto:${storeInfo.email}`} className="flex items-center gap-1 hover:text-blue-200">
                <Mail className="w-3 h-3" />
                {storeInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-xl">PS</span>
            </div>
            <div>
              <div className="tracking-tight text-xl text-gray-900">Pavilion Sports</div>
              <div className="text-xs text-gray-500">Since 1988</div>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for cricket bats, footballs, equipment..."
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isB2BLoggedIn ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/b2b/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">My Account</span>
                </Link>
                <button
                  onClick={() => setIsB2BLoggedIn(false)}
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/b2b/login"
                className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <User className="w-4 h-4" />
                <span>B2B Login</span>
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center gap-8 py-3">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <MegaMenu />
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link to="/careers" className="text-gray-700 hover:text-blue-600 transition-colors">
              Careers
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-blue-600 transition-colors">
              Gallery
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Search className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </form>
              <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/category/cricket" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
              <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
              <Link to="/careers" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                Careers
              </Link>
              <Link to="/gallery" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                Gallery
              </Link>
              <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                Contact Us
              </Link>
              {!isB2BLoggedIn ? (
                <Link to="/b2b/login" className="block py-2 text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                  B2B Login
                </Link>
              ) : (
                <>
                  <Link to="/b2b/dashboard" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      setIsB2BLoggedIn(false);
                      setMobileMenuOpen(false);
                    }}
                    className="block py-2 text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}