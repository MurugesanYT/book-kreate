import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter as X, Instagram, Github, Mail, MapPin, BookOpen, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { subscribeToNewsletter } from "@/lib/api/newsletterService";

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await subscribeToNewsletter(email);
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail('');
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-book-purple/90 text-white">
      {/* Wave divider */}
      <div className="relative w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-10 md:h-16 transform rotate-180" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.32,118.92,150.83,82.75,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
      
      {/* Newsletter section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-16">
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-10 mb-16 border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-book-orange/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-book-purple/20 rounded-full blur-2xl"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-book-lightPurple bg-clip-text text-transparent">
                Stay updated with our latest features
              </h3>
              <p className="text-white/80 mb-4 md:mb-0">Join our newsletter and be the first to know about new AI book creation tools and features.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/50 transition-all duration-200"
                disabled={isLoading}
              />
              <Button 
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-book-purple to-book-orange hover:from-book-purple/80 hover:to-book-orange/80 text-white font-medium px-6 transition-all duration-200 group"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-book-purple to-book-orange flex items-center justify-center text-white">
                <BookOpen size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-book-lightPurple to-book-orange bg-clip-text text-transparent">
                Book-Kreate
              </span>
            </Link>
            
            <p className="text-white/80">
              Transform your ideas into beautifully crafted books with the power of AI. Create professionally designed books in minutes.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61574131919351" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/_fan_boi_lm10_" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="X" target="_blank" rel="noopener noreferrer">
                <X size={18} />
              </a>
              <a href="https://www.instagram.com/_fan_boi_lm10_" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={18} />
              </a>
              <a href="https://www.github.com/MurugesanYT" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Github" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-white/20 pb-2">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-white/70 hover:text-white transition-colors inline-flex hover:translate-x-1 transition-transform">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-white transition-colors inline-flex hover:translate-x-1 transition-transform">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors inline-flex hover:translate-x-1 transition-transform">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white transition-colors inline-flex hover:translate-x-1 transition-transform">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-white/20 pb-2">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-white/70 hover:text-white transition-colors inline-flex hover:translate-x-1 transition-transform">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-white transition-colors inline-flex hover:translate-x-1 transition-transform">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors inline-flex hover:translate-x-1 transition-transform">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-white/70 hover:text-white transition-colors inline-flex hover:translate-x-1 transition-transform">
                  System Status
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-white/20 pb-2">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={18} className="text-book-orange mt-1 mr-3 flex-shrink-0" />
                <span className="text-white/70">youvegottabefreakingkiddingme@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-book-orange mt-1 mr-3 flex-shrink-0" />
                <span className="text-white/70">We're currently remote-only and hope to establish a physical office soon.</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Legal</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <Link to="/terms" className="text-white/70 hover:text-white transition-colors">Terms</Link>
                <Link to="/privacy" className="text-white/70 hover:text-white transition-colors">Privacy</Link>
                <Link to="/cookies" className="text-white/70 hover:text-white transition-colors">Cookies</Link>
                <Link to="/licenses" className="text-white/70 hover:text-white transition-colors">Licenses</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">&copy; {currentYear} Book-Kreate. All rights reserved.</p>
          <div className="flex items-center">
            <span className="text-white/60 text-sm mr-2">Made with</span>
            <span className="text-book-orange animate-pulse">♥</span>
            <span className="text-white/60 text-sm ml-2">by a solo developer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
