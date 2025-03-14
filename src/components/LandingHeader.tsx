
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="w-full py-4 px-4 md:px-6 bg-white/95 backdrop-blur-sm fixed top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
            Book-Kreate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-book-darkText hover:text-book-purple transition-colors duration-200">
            Home
          </Link>
          <Link to="/features" className="text-book-darkText hover:text-book-purple transition-colors duration-200">
            Features
          </Link>
          <Link to="/pricing" className="text-book-darkText hover:text-book-purple transition-colors duration-200">
            Pricing
          </Link>
          <Link to="/about" className="text-book-darkText hover:text-book-purple transition-colors duration-200">
            About
          </Link>
          <Link to="/auth">
            <Button className="btn-primary">Get Started</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-book-darkText"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-book-darkText hover:text-book-purple transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="text-book-darkText hover:text-book-purple transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="text-book-darkText hover:text-book-purple transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="text-book-darkText hover:text-book-purple transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/auth" 
              className="inline-block" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="btn-primary w-full">Get Started</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
