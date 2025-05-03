
import React from 'react';
import { Check, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { setUserPlan, getUserPlan, PLANS, PlanKey } from '@/lib/api/planService';
import { toast } from 'sonner';

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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include free access during our testing phase.
          </p>
          <Badge variant="outline" className="mt-4 bg-white border-book-purple text-book-purple px-3 py-1">
            Early Access - Free Testing Period
          </Badge>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(PLANS).map(([planName, planDetails], index) => {
            const isPlanActive = planName === currentPlan;
            const isPlanPopular = planName === 'Pro';
            
            return (
              <div 
                key={planName} 
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 group hover:shadow-2xl ${
                  isPlanPopular 
                    ? "border-2 border-book-purple shadow-lg transform md:-translate-y-2" 
                    : "border border-slate-200 shadow-md hover:-translate-y-1"
                }`}
              >
                {isPlanPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-book-purple text-white text-center py-2 font-medium">
                    Most Popular
                  </div>
                )}
                
                {isPlanActive && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-green-50 border border-green-200 text-green-700">
                      Current Plan
                    </Badge>
                  </div>
                )}
                
                <div className={`p-8 bg-white backdrop-blur-sm ${isPlanPopular ? "pt-14" : ""}`}>
                  <h3 className="text-2xl font-bold text-book-darkText mb-2">
                    {planName}
                  </h3>
                  
                  <div className="mb-4 flex items-end">
                    <span className="text-4xl font-bold">{planDetails.price}</span>
                    <span className="text-slate-500 ml-1">per month</span>
                  </div>
                  
                  <p className="text-slate-600 mb-6">
                    {planName === 'Basic' 
                      ? "Perfect for beginners to try out our platform" 
                      : planName === 'Pro' 
                        ? "Ideal for regular content creators"
                        : "For professional authors and publishers"}
                  </p>
                  
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 mb-6">
                    <h4 className="font-semibold text-book-darkText mb-3">Plan Limits:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Books per month:</span> 
                        <span className="font-medium">{planDetails.books === Infinity ? "Unlimited" : planDetails.books}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chapters per book:</span> 
                        <span className="font-medium">{planDetails.chapters === Infinity ? "Unlimited" : planDetails.chapters}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      `${planDetails.books === Infinity ? "Unlimited" : planDetails.books} books per month`,
                      `${planDetails.chapters === Infinity ? "Unlimited" : planDetails.chapters} chapters per book`,
                      `${planName === 'Basic' ? "Basic" : planName === 'Pro' ? "Advanced" : "Premium"} AI generation`,
                      `${planName === 'Basic' ? "Standard" : "All"} book templates`,
                      `Export to ${planDetails.exportFormats.length === 1 ? "PDF only" : "multiple formats"}`,
                      `${planName === 'Basic' ? "Email" : planName === 'Pro' ? "Priority" : "24/7 dedicated"} support`,
                      ...(planName !== 'Basic' ? ["Custom book styles", "Collaboration tools"] : []),
                      ...(planName === 'Ultimate' ? ["Team management", "API access", "White-labeling options"] : [])
                    ].map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-book-purple flex-shrink-0 mr-2 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-book-darkText mb-3 flex items-center">
                      Export Formats 
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-slate-400 ml-2" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Available formats for exporting your books</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {planDetails.exportFormats.map((format, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600">
                          .{format}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {isPlanActive ? (
                    <Button 
                      className="w-full bg-slate-100 text-book-darkText py-6"
                      disabled
                    >
                      <Check className="h-4 w-4 mr-2" /> Current Plan
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleSelectPlan(planName as PlanKey)}
                      className={`w-full ${
                        isPlanPopular 
                          ? "bg-gradient-to-r from-book-purple to-book-orange text-white hover:opacity-90" 
                          : "bg-slate-100 text-book-darkText hover:bg-slate-200"
                      } py-6 transition-all duration-300 group-hover:shadow-md`}
                    >
                      {`Switch to ${planName}`}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12 text-slate-600 bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-slate-100 max-w-3xl mx-auto">
          <h3 className="font-medium text-xl mb-3">Need a custom solution?</h3>
          <p>Our Enterprise plan can be tailored to your specific needs.</p>
          <Link to="/contact" className="text-book-purple font-medium underline mt-2 inline-block">Contact us</Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
