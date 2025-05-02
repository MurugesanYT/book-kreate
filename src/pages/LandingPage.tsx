
import React, { useEffect } from 'react';
import LandingHeader from '../components/LandingHeader';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import LandingFooter from '../components/LandingFooter';
import FAQSection from '../components/FAQSection';
import StatsSection from '../components/StatsSection';
import PricingSection from '../components/PricingSection';
import ThreeDModel from '../components/ThreeDModel';

const LandingPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-white via-book-lightPurple/5 to-white">
      <LandingHeader />
      <main className="flex-1">
        <div className="relative">
          <HeroSection />
          <div className="absolute top-20 right-0 lg:right-20 w-full md:w-1/2 lg:w-1/3 h-full pointer-events-none opacity-50 md:opacity-80">
            <ThreeDModel />
          </div>
        </div>
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
