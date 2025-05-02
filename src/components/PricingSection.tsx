
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

const plans = [
  {
    name: "Basic",
    price: "$5",
    period: "per month",
    description: "Perfect for beginners to try out our platform",
    limits: {
      books: 3,
      chaptersPerBook: 5,
    },
    features: [
      "3 books per month",
      "5 chapters per book",
      "Basic AI generation",
      "Standard book templates",
      "Export to PDF only",
      "Email support"
    ],
    exportFormats: ["pdf"],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "Ideal for regular content creators",
    limits: {
      books: 10,
      chaptersPerBook: 12,
    },
    features: [
      "10 books per month",
      "12 chapters per book",
      "Advanced AI generation",
      "All book templates",
      "Export to multiple formats",
      "Priority support",
      "Custom book styles",
      "Collaboration tools"
    ],
    exportFormats: ["pdf", "epub", "docx", "html", "markdown"],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Ultimate",
    price: "$49",
    period: "per month",
    description: "For professional authors and publishers",
    limits: {
      books: Infinity,
      chaptersPerBook: Infinity,
    },
    features: [
      "Unlimited books",
      "Unlimited chapters",
      "Premium AI generation",
      "Custom templates",
      "All export formats",
      "24/7 dedicated support",
      "Team management",
      "API access",
      "White-labeling options"
    ],
    exportFormats: ["pdf", "epub", "mobi", "docx", "txt", "html", "markdown", "rtf", "azw3", "fb2", "latex", "odt"],
    cta: "Go Ultimate",
    popular: false
  }
];

const PricingSection = () => {
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
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 group hover:shadow-2xl ${
                plan.popular 
                  ? "border-2 border-book-purple shadow-lg transform md:-translate-y-2" 
                  : "border border-slate-200 shadow-md hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-book-purple text-white text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 bg-white backdrop-blur-sm ${plan.popular ? "pt-14" : ""}`}>
                <h3 className="text-2xl font-bold text-book-darkText mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-4 flex items-end">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-slate-500 ml-1">{plan.period}</span>
                  )}
                </div>
                
                <p className="text-slate-600 mb-6">
                  {plan.description}
                </p>
                
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 mb-6">
                  <h4 className="font-semibold text-book-darkText mb-3">Plan Limits:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Books per month:</span> 
                      <span className="font-medium">{plan.limits.books === Infinity ? "Unlimited" : plan.limits.books}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chapters per book:</span> 
                      <span className="font-medium">{plan.limits.chaptersPerBook === Infinity ? "Unlimited" : plan.limits.chaptersPerBook}</span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
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
                    {plan.exportFormats.map((format, i) => (
                      <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600">
                        .{format}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Link to="/auth">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? "bg-gradient-to-r from-book-purple to-book-orange text-white hover:opacity-90" 
                        : "bg-slate-100 text-book-darkText hover:bg-slate-200"
                    } py-6 transition-all duration-300 group-hover:shadow-md`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
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
