
import React from 'react';
import { Check, Info, Star, Crown, Zap, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlanKey } from '@/lib/api/planService';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PlanCardProps {
  planName: string;
  planDetails: {
    books: number;
    chapters: number;
    exportFormats: string[];
    price: string;
    aiGeneration: string;
    templates: number;
    exclusiveFeatures: string[];
  };
  isPlanActive: boolean;
  isPlanPopular: boolean;
  onSelectPlan: (plan: PlanKey) => void;
}

const PlanCard = ({
  planName,
  planDetails,
  isPlanActive,
  isPlanPopular,
  onSelectPlan
}: PlanCardProps) => {
  
  // Plan-specific styling
  const getPlanIcon = () => {
    switch (planName) {
      case 'Free': return <Gift className="h-5 w-5" />;
      case 'Basic': return <Zap className="h-5 w-5" />;
      case 'Pro': return <Star className="h-5 w-5" />;
      case 'Ultimate': return <Crown className="h-5 w-5" />;
      default: return null;
    }
  };

  const getPlanColor = () => {
    switch (planName) {
      case 'Free': return 'from-green-500 to-emerald-600';
      case 'Basic': return 'from-blue-500 to-blue-600';
      case 'Pro': return 'from-purple-500 to-purple-600';
      case 'Ultimate': return 'from-amber-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPlanDescription = () => {
    switch (planName) {
      case 'Free': return "Perfect for trying out our platform and writing your first books";
      case 'Basic': return "Great for casual writers and small projects";
      case 'Pro': return "Ideal for serious authors and content creators";
      case 'Ultimate': return "For professional authors, publishers, and power users";
      default: return "";
    }
  };

  const getAIGenerationDescription = () => {
    switch (planDetails.aiGeneration) {
      case 'basic': return "Basic AI assistance";
      case 'standard': return "Standard AI generation";
      case 'advanced': return "Advanced AI features";
      case 'premium': return "Premium AI with exclusive features";
      default: return planDetails.aiGeneration;
    }
  };

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 group hover:shadow-2xl ${
        isPlanPopular 
          ? "border-2 border-book-purple shadow-lg transform md:-translate-y-2" 
          : planName === 'Ultimate'
            ? "border-2 border-amber-400 shadow-lg"
            : "border border-slate-200 shadow-md hover:-translate-y-1"
      }`}
    >
      {isPlanPopular && (
        <div className="absolute top-0 left-0 right-0 bg-book-purple text-white text-center py-2 font-medium">
          Most Popular
        </div>
      )}
      
      {planName === 'Ultimate' && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center py-2 font-medium">
          ⭐ Premium Features
        </div>
      )}
      
      {isPlanActive && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-green-50 border border-green-200 text-green-700">
            Current Plan
          </Badge>
        </div>
      )}
      
      <div className={`p-8 bg-white backdrop-blur-sm ${(isPlanPopular || planName === 'Ultimate') ? "pt-14" : ""}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getPlanColor()} text-white`}>
            {getPlanIcon()}
          </div>
          <h3 className="text-2xl font-bold text-book-darkText">
            {planName}
          </h3>
        </div>
        
        <div className="mb-4 flex items-end">
          <span className="text-4xl font-bold">{planDetails.price}</span>
          <span className="text-slate-500 ml-1">{planName === 'Free' ? '' : 'per month'}</span>
        </div>
        
        <p className="text-slate-600 mb-6">
          {getPlanDescription()}
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
            <div className="flex justify-between">
              <span>AI Generation:</span> 
              <span className="font-medium capitalize">{getAIGenerationDescription()}</span>
            </div>
            <div className="flex justify-between">
              <span>Book Templates:</span> 
              <span className="font-medium">{planDetails.templates === 0 ? "None" : planDetails.templates}</span>
            </div>
          </div>
        </div>
        
        <ul className="space-y-3 mb-8">
          {[
            `${planDetails.books === Infinity ? "Unlimited" : planDetails.books} books per month`,
            `${planDetails.chapters === Infinity ? "Unlimited" : planDetails.chapters} chapters per book`,
            `${getAIGenerationDescription()}`,
            `${planDetails.templates} book templates`,
            `Export to ${planDetails.exportFormats.length} format${planDetails.exportFormats.length > 1 ? 's' : ''}`,
            `${planName === 'Free' ? "Community" : planName === 'Basic' ? "Email" : planName === 'Pro' ? "Priority" : "24/7 dedicated"} support`,
            ...(planDetails.exclusiveFeatures.slice(0, 3).map(feature => 
              feature.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
            ))
          ].map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start">
              <Check className="h-5 w-5 text-book-purple flex-shrink-0 mr-2 mt-0.5" />
              <span className="text-slate-700">{feature}</span>
            </li>
          ))}
          {planDetails.exclusiveFeatures.length > 3 && (
            <li className="flex items-start">
              <Check className="h-5 w-5 text-book-purple flex-shrink-0 mr-2 mt-0.5" />
              <span className="text-slate-700">+ {planDetails.exclusiveFeatures.length - 3} more exclusive features</span>
            </li>
          )}
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
            onClick={() => onSelectPlan(planName as PlanKey)}
            className={`w-full ${
              planName === 'Ultimate'
                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:opacity-90"
                : isPlanPopular 
                  ? "bg-gradient-to-r from-book-purple to-book-orange text-white hover:opacity-90" 
                  : planName === 'Free'
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
                    : "bg-slate-100 text-book-darkText hover:bg-slate-200"
            } py-6 transition-all duration-300 group-hover:shadow-md`}
          >
            {planName === 'Free' ? 'Start Free' : `Upgrade to ${planName}`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
