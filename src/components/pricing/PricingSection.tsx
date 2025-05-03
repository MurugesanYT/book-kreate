
import React from 'react';
import { toast } from 'sonner';
import { setUserPlan, getUserPlan, PLANS, PlanKey } from '@/lib/api/planService';
import PricingHeader from './PricingHeader';
import PlanCard from './PlanCard';
import EnterpriseSection from './EnterpriseSection';

const PricingSection = () => {
  const currentPlan = getUserPlan();
  
  const handleSelectPlan = (planName: PlanKey) => {
    if (planName === currentPlan) {
      toast.info(`You are already on the ${planName} plan`);
      return;
    }
    
    setUserPlan(planName);
  };
  
  return (
    <section id="pricing" className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-book-lightPurple/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-book-orange/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-book-purple/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <PricingHeader />
        
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(PLANS).map(([planName, planDetails], index) => {
            const isPlanActive = planName === currentPlan;
            const isPlanPopular = planName === 'Pro';
            
            return (
              <PlanCard
                key={planName}
                planName={planName}
                planDetails={planDetails}
                isPlanActive={isPlanActive}
                isPlanPopular={isPlanPopular}
                onSelectPlan={handleSelectPlan}
              />
            );
          })}
        </div>
        
        <EnterpriseSection />
      </div>
    </section>
  );
};

export default PricingSection;
