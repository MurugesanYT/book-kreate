
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-book-purple to-book-lightPurple text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Create Your Own Book?
        </h2>
        <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
          Join thousands of users who are turning their ideas into beautiful books. 
          Start creating today with our AI-powered platform.
        </p>
        
        <Link to="/auth">
          <Button className="btn-accent text-base font-medium h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-300">
            Get Started Free
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </Link>
        
        <p className="mt-6 text-white/80">
          No credit card required • Free tier available
        </p>
      </div>
    </section>
  );
};

export default CTASection;
