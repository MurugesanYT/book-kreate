
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from 'lucide-react';
import { EnhancedNavbar } from './EnhancedNavbar';
import { cn } from "@/lib/utils";

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <>
      {/* Enhanced Navbar for Desktop */}
      <div className="hidden md:block">
        <EnhancedNavbar />
      </div>
      
      {/* Original Header for Mobile and Branding */}
      <header 
        className={cn(
          "w-full py-4 px-4 md:px-8 fixed top-0 z-40 transition-all duration-300 md:bg-transparent",
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-10">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-book-purple to-book-orange flex items-center justify-center text-white">
              <BookOpen size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
              Book-Kreate
            </span>
          </Link>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link to="/auth">
              <Button className="bg-book-purple hover:bg-book-purple/90 text-white font-medium px-6">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-book-darkText z-20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-10 pt-20">
            <nav className="flex flex-col space-y-6 p-8">
              <Link 
                to="/" 
                className="text-2xl font-medium text-book-darkText hover:text-book-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/features" 
                className="text-2xl font-medium text-book-darkText hover:text-book-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className="text-2xl font-medium text-book-darkText hover:text-book-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/about" 
                className="text-2xl font-medium text-book-darkText hover:text-book-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-2xl font-medium text-book-darkText hover:text-book-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/auth" 
                className="inline-block" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="bg-book-purple hover:bg-book-purple/90 w-full text-lg py-6">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default LandingHeader;
