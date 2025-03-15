
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
          Welcome to Book-Kreate
        </h1>
        
        <p className="text-xl text-slate-700 mb-8">
          Your AI-powered platform for creating beautiful books from your ideas.
          Get started today and transform your concepts into professionally crafted books.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg">
            <Link to="/auth">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="px-8 py-6 text-lg">
            <Link to="/dashboard">
              View Dashboard
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-slate-500">
          Already have an account? <Link to="/auth" className="text-purple-600 hover:text-purple-700 underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Index;
