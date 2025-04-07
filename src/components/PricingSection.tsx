
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for beginners to try out our platform",
    features: [
      "3 books per month",
      "Basic AI generation",
      "Standard book templates",
      "Export to PDF",
      "Email support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "Ideal for regular content creators",
    features: [
      "15 books per month",
      "Advanced AI generation",
      "All book templates",
      "Export to all formats",
      "Priority support",
      "Custom book styles",
      "Collaboration tools"
    ],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "per month",
    description: "For professional authors and publishers",
    features: [
      "Unlimited books",
      "Premium AI generation",
      "Custom templates",
      "All export formats",
      "24/7 dedicated support",
      "Team management",
      "API access",
      "White-labeling options"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-book-lightPurple/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include access to our AI book creation technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? "border-2 border-book-purple shadow-lg transform md:-translate-y-2" 
                  : "border border-slate-200 shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-book-purple text-white text-center py-1 font-medium text-sm">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 bg-white ${plan.popular ? "pt-12" : ""}`}>
                <h3 className="text-2xl font-bold text-book-darkText mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-slate-500 ml-1">{plan.period}</span>
                  )}
                </div>
                
                <p className="text-slate-600 mb-6">
                  {plan.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-book-purple flex-shrink-0 mr-2 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/auth">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? "bg-book-purple hover:bg-book-purple/90" 
                        : "bg-slate-100 text-book-darkText hover:bg-slate-200"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-slate-600">
          <p>Need a custom solution? <Link to="/contact" className="text-book-purple font-medium underline">Contact us</Link> for enterprise pricing.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
