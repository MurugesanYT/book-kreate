
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from 'lucide-react';

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="w-full py-4 px-4 md:px-6 bg-white/95 backdrop-blur-sm fixed top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-book-purple to-book-orange flex items-center justify-center text-white">
            <BookOpen size={24} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
            Book-Kreate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-book-darkText hover:text-book-purple transition-colors duration-200 font-medium">
            Home
          </Link>
          <Link to="/features" className="text-book-darkText hover:text-book-purple transition-colors duration-200 font-medium">
            Features
          </Link>
          <Link to="/pricing" className="text-book-darkText hover:text-book-purple transition-colors duration-200 font-medium">
            Pricing
          </Link>
          <Link to="/about" className="text-book-darkText hover:text-book-purple transition-colors duration-200 font-medium">
            About
          </Link>
          <Link to="/contact" className="text-book-darkText hover:text-book-purple transition-colors duration-200 font-medium">
            Contact
          </Link>
          <Link to="/auth">
            <Button className="bg-book-purple hover:bg-book-purple/90 text-white font-medium">Get Started</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-book-darkText"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-book-darkText hover:text-book-purple transition-colors duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="text-book-darkText hover:text-book-purple transition-colors duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="text-book-darkText hover:text-book-purple transition-colors duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="text-book-darkText hover:text-book-purple transition-colors duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-book-darkText hover:text-book-purple transition-colors duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/auth" 
              className="inline-block" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="bg-book-purple hover:bg-book-purple/90 w-full">Get Started</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
