
import React from 'react';
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

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
