
import React from 'react';
import LandingHeader from '@/components/LandingHeader';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/ui/stats-section';
import HowItWorksSection from '@/components/ui/how-it-works-section';
import FeaturesGridSection from '@/components/ui/features-grid-section';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/ui/cta-section';
import LandingFooter from '@/components/LandingFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesGridSection />
      <TestimonialsSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
};

export default Index;
