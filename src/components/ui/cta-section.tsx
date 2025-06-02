
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-book-purple via-book-lightPurple to-book-orange relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl text-white mb-8 backdrop-blur-sm">
          <BookOpen className="h-8 w-8" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Write Your Next
          <br />
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Bestseller?
          </span>
        </h2>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of authors who have already discovered the magic of AI-assisted storytelling. 
          Your story deserves to be told.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild size="lg" className="bg-white text-book-purple hover:bg-white/90 text-lg font-semibold px-8 py-6 rounded-2xl shadow-xl group">
            <Link to="/auth">
              Start Writing for Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-lg font-semibold px-8 py-6 rounded-2xl backdrop-blur-sm">
            <Link to="/features">
              Explore Features
            </Link>
          </Button>
        </div>
        
        <div className="flex items-center justify-center space-x-6 text-white/80">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-300 text-yellow-300" />
              ))}
            </div>
            <span className="text-sm font-medium">4.9/5 rating</span>
          </div>
          <div className="h-4 w-px bg-white/30"></div>
          <div className="text-sm font-medium">No credit card required</div>
          <div className="h-4 w-px bg-white/30"></div>
          <div className="text-sm font-medium">Free forever plan</div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
