
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
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
    <header 
      className={cn(
        "w-full py-4 px-4 md:px-8 fixed top-0 z-50 transition-all duration-300",
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

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-book-purple/20 to-book-orange/20 p-6 no-underline outline-none focus:shadow-md"
                          to="/features"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            AI-Powered Book Creation
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Turn your ideas into beautifully crafted books with the power of AI in minutes.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem to="/features" title="Customizable Templates">
                      Choose from over 20 different book types and templates
                    </ListItem>
                    <ListItem to="/features" title="AI Content Generation">
                      Let our AI generate engaging content based on your ideas
                    </ListItem>
                    <ListItem to="/features" title="Export Options">
                      Export your books in multiple formats for any platform
                    </ListItem>
                    <ListItem to="/features" title="Collaboration Tools">
                      Work together on book projects with team members
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pricing">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] md:grid-cols-2">
                    <ListItem to="/about" title="Our Story">
                      Learn about our mission and vision
                    </ListItem>
                    <ListItem to="/about" title="How It Works">
                      See how our AI technology creates books
                    </ListItem>
                    <ListItem to="/blog" title="Blog">
                      Read the latest news and articles
                    </ListItem>
                    <ListItem to="/contact" title="Contact Us">
                      Get in touch with our team
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA Button */}
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
  );
};

// ListItem component for navigation dropdown menus
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { to: string; title: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          to={to}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default LandingHeader;
