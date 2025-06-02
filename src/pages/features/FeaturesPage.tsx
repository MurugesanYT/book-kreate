
import React from 'react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-book-darkText mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
                {" "}Creative Writers
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to bring your stories to life with AI-powered assistance, 
              professional formatting, and seamless publishing.
            </p>
          </div>

          <FeaturesSectionWithHoverEffects />
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default FeaturesPage;
