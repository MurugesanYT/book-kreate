import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave';
import { ArrowRight, BookOpen, Sparkles, Check, Star, Github, Heart, Scroll, Code, Coffee } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-book-purple/10 to-book-orange/5 p-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-book-purple/10 text-book-purple text-sm font-medium mb-6 animate-pulse">
          <Sparkles size={16} className="mr-2" />
          <span>AI-Powered Book Creation</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <TextShimmerWave
            className="[--base-color:#8B5CF6] [--base-gradient-color:#F97316]"
            duration={2}
            spread={0.5}
            zDistance={20}
            scaleDistance={1.15}
            rotateYDistance={30}
          >
            Welcome to Book-Kreate
          </TextShimmerWave>
        </h1>
        
        <p className="text-xl text-slate-700 mb-8">
          Your AI-powered platform for creating beautiful books from your ideas.
          Get started today and transform your concepts into professionally crafted books in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-gradient-to-r from-book-purple to-book-orange hover:opacity-90 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Link to="/auth">
              Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="px-8 py-6 text-lg border-book-purple text-book-purple hover:bg-book-purple/10 group">
            <Link to="/dashboard">
              <BookOpen className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> View Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-center mt-8 mb-4 gap-4">
          <div className="flex items-center text-slate-700 bg-white/50 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">
            <Check size={16} className="mr-1.5 text-book-orange" />
            <span className="text-sm">AI-Powered</span>
          </div>
          <div className="flex items-center text-slate-700 bg-white/50 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">
            <Check size={16} className="mr-1.5 text-book-orange" />
            <span className="text-sm">Easy to Use</span>
          </div>
          <div className="flex items-center text-slate-700 bg-white/50 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">
            <Check size={16} className="mr-1.5 text-book-orange" />
            <span className="text-sm">Pro Templates</span>
          </div>
          <div className="flex items-center text-slate-700 bg-white/50 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">
            <Check size={16} className="mr-1.5 text-book-orange" />
            <span className="text-sm">Export Ready</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center mt-4 mb-6 gap-4">
          <div className="flex items-center text-slate-700 bg-white/50 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">
            <Coffee size={16} className="mr-1.5 text-book-orange" />
            <span className="text-sm">Solo Project</span>
          </div>
          <div className="flex items-center text-slate-700 bg-white/50 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">
            <Heart size={16} className="mr-1.5 text-book-orange" />
            <span className="text-sm">Made with Love</span>
          </div>
          <div className="flex items-center text-slate-700 bg-white/50 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">
            <Code size={16} className="mr-1.5 text-book-orange" />
            <span className="text-sm">Clean Code</span>
          </div>
          <div className="flex items-center text-slate-700 bg-white/50 px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors">
            <Scroll size={16} className="mr-1.5 text-book-orange" />
            <span className="text-sm">Detailed Documentation</span>
          </div>
        </div>
        
        <div className="mt-6 p-6 bg-white/70 backdrop-blur-sm rounded-lg border border-book-purple/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star key={index} size={18} className="text-book-orange fill-book-orange" />
              ))}
            </div>
          </div>
          <p className="text-slate-700 mb-4">
            Already have an account? <Link to="/auth" className="text-book-purple hover:text-book-purple/80 font-medium">Sign in</Link>
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=61574131919351" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-book-purple transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://x.com/_fan_boi_lm10_" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-book-purple transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://www.instagram.com/@_fan_boi_lm10_" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-book-purple transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.github.com/MurugesanYT" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-book-purple transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-book-purple/10 text-book-purple text-sm font-medium mb-2">
          <Heart size={14} className="mr-2 text-book-orange animate-pulse" />
          <span>Solo project created by M.Kabilan</span>
        </div>
        <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Book-Kreate. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Index;
