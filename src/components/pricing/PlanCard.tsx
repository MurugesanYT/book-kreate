
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlanKey } from '@/lib/api/planService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getPlanIcon, getPlanColor, getPlanDescription } from './PlanIcons';
import { PlanFeatures } from './PlanFeatures';

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
    support?: string;
  };
  isPlanActive: boolean;
  isPlanPopular: boolean;
  onSelectPlan: (plan: PlanKey) => void;
}

const PlanCard = ({ planName, planDetails, isPlanActive, isPlanPopular, onSelectPlan }: PlanCardProps) => {
  const getAIGenerationDescription = (aiGeneration: string) => {
    switch (aiGeneration) {
      case 'basic': return "Basic AI assistance";
      case 'standard': return "Standard AI generation";
      case 'advanced': return "Advanced AI features";
      case 'premium': return "Premium AI with exclusive features";
      default: return aiGeneration;
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
      {/* Plan badges */}
      {isPlanPopular && (
        <div className="absolute top-0 left-0 right-0 bg-book-purple text-white text-center py-2 font-medium text-sm">
          Most Popular
        </div>
      )}
      
      {planName === 'Ultimate' && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center py-2 font-medium text-sm">
          ⭐ Premium Features
        </div>
      )}
      
      {isPlanActive && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-green-50 border border-green-200 text-green-700 text-xs">
            Current Plan
          </Badge>
        </div>
      )}
      
      <div className={`p-4 sm:p-8 bg-white backdrop-blur-sm ${(isPlanPopular || planName === 'Ultimate') ? "pt-12 sm:pt-14" : ""}`}>
        {/* Plan header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getPlanColor(planName)} text-white`}>
            {getPlanIcon(planName)}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-book-darkText">
            {planName}
          </h3>
        </div>
        
        {/* Price */}
        <div className="mb-4 flex items-end">
          <span className="text-3xl sm:text-4xl font-bold">{planDetails.price}</span>
          <span className="text-slate-500 ml-1 text-sm">{planName === 'Free' ? '' : 'per month'}</span>
        </div>
        
        {/* Description */}
        <p className="text-slate-600 mb-6 text-sm sm:text-base">
          {getPlanDescription(planName)}
        </p>
        
        {/* Plan limits */}
        <div className="p-3 sm:p-4 rounded-lg bg-slate-50 border border-slate-100 mb-6">
          <h4 className="font-semibold text-book-darkText mb-3 text-sm sm:text-base">Plan Limits:</h4>
          <div className="space-y-2 text-xs sm:text-sm">
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
              <span className="font-medium capitalize">{getAIGenerationDescription(planDetails.aiGeneration)}</span>
            </div>
            <div className="flex justify-between">
              <span>Book Templates:</span> 
              <span className="font-medium">{planDetails.templates === 0 ? "None" : planDetails.templates}</span>
            </div>
          </div>
        </div>
        
        {/* Features list */}
        <PlanFeatures planName={planName} planDetails={planDetails} />
        
        {/* Export formats */}
        <div className="mb-4 sm:mb-6">
          <h4 className="font-semibold text-book-darkText mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
            Export Formats 
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 ml-2" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Available formats for exporting your books</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {planDetails.exportFormats.map((format, i) => (
              <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600 text-xs">
                .{format}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Action button */}
        {isPlanActive ? (
          <Button 
            className="w-full bg-slate-100 text-book-darkText py-4 sm:py-6 text-sm sm:text-base"
            disabled
          >
            Current Plan
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
            } py-4 sm:py-6 transition-all duration-300 group-hover:shadow-md text-sm sm:text-base`}
          >
            {planName === 'Free' ? 'Start Free' : `Upgrade to ${planName}`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
