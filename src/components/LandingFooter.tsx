
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, X, Instagram, Github, Mail, MapPin } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
                Book-Kreate
              </span>
            </Link>
            <p className="text-slate-400 mb-4">
              Transform your ideas into beautifully crafted books with the power of AI.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61574131919351" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/_fan_boi_lm10_" className="text-slate-400 hover:text-white transition-colors" aria-label="X">
                <X size={20} />
              </a>
              <a href="https://www.instagram.com/@_fan_boi_lm10_" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.github.com/MurugesanYT" className="text-slate-400 hover:text-white transition-colors" aria-label="Github">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-slate-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/status" className="text-slate-400 hover:text-white transition-colors">System Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={18} className="text-book-orange mt-1 mr-2" />
                <span className="text-slate-400">youvegottabefreakingkiddingme@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-book-orange mt-1 mr-2" />
                <span className="text-slate-400">We're currently remote-only and hope to establish a physical office soon.</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Book-Kreate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
