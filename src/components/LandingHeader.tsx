
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const LandingHeader = () => {
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-book-purple to-book-orange flex items-center justify-center text-white mr-2">
              <span className="text-lg font-bold">BK</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
              Book-Kreate
            </span>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link to="/features" className="text-slate-700 hover:text-book-purple transition-colors font-medium">
              Features
            </Link>
            <Link to="/pricing" className="text-slate-700 hover:text-book-purple transition-colors font-medium">
              Pricing
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-book-purple transition-colors font-medium">
              About
            </Link>
            <Link to="/blog" className="text-slate-700 hover:text-book-purple transition-colors font-medium">
              Blog
            </Link>
            <Link to="/help" className="text-slate-700 hover:text-book-purple transition-colors font-medium">
              Help
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Button asChild variant="ghost">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/account/settings">Settings</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-book-purple to-book-orange hover:opacity-90">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-book-purple to-book-orange flex items-center justify-center text-white mr-2">
              <span className="text-lg font-bold">BK</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
              Book-Kreate
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <Button asChild size="sm" className="text-xs px-3">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="text-xs px-3">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
            <Link 
              to="/features" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/help" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            {currentUser && (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <Link 
                  to="/account/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account Settings
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
