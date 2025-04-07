
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-book-purple/10 to-book-orange/5 p-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-book-purple/10 text-book-purple text-sm font-medium mb-6">
          <Sparkles size={16} className="mr-2" />
          <span>AI-Powered Book Creation</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-book-purple via-book-lightPurple to-book-orange bg-clip-text text-transparent leading-tight">
          Welcome to Book-Kreate
        </h1>
        
        <p className="text-xl text-slate-700 mb-8">
          Your AI-powered platform for creating beautiful books from your ideas.
          Get started today and transform your concepts into professionally crafted books in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-gradient-to-r from-book-purple to-book-orange hover:opacity-90 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/auth">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="px-8 py-6 text-lg border-book-purple text-book-purple hover:bg-book-purple/10">
            <Link to="/dashboard">
              <BookOpen className="mr-2 h-5 w-5" /> View Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-book-purple/20 inline-block">
          <p className="text-slate-500">
            Already have an account? <Link to="/auth" className="text-book-purple hover:text-book-purple/80 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Book-Kreate. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Index;
