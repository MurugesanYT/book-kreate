
import React from 'react';
import { Check } from 'lucide-react';

interface PlanFeaturesProps {
  planName: string;
  planDetails: any;
}

const getAIGenerationDescription = (aiGeneration: string) => {
  switch (aiGeneration) {
    case 'basic': return "Basic AI assistance";
    case 'standard': return "Standard AI generation";
    case 'advanced': return "Advanced AI features";
    case 'premium': return "Premium AI with exclusive features";
    default: return aiGeneration;
  }
};

export const PlanFeatures: React.FC<PlanFeaturesProps> = ({ planName, planDetails }) => {
  const features = [
    `${planDetails.books === Infinity ? "Unlimited" : planDetails.books} books per month`,
    `${planDetails.chapters === Infinity ? "Unlimited" : planDetails.chapters} chapters per book`,
    `${getAIGenerationDescription(planDetails.aiGeneration)}`,
    `${planDetails.templates} book templates`,
    `Export to ${planDetails.exportFormats.length} format${planDetails.exportFormats.length > 1 ? 's' : ''}`,
    planDetails.support || `${planName === 'Free' ? "Community" : planName === 'Basic' ? "Email" : planName === 'Pro' ? "Priority" : "Dedicated"} support`,
    ...(planDetails.exclusiveFeatures.slice(0, 3).map((feature: string) => 
      feature.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    ))
  ];

  return (
    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
      {features.map((feature, featureIndex) => (
        <li key={featureIndex} className="flex items-start">
          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-book-purple flex-shrink-0 mr-2 mt-0.5" />
          <span className="text-slate-700 text-xs sm:text-sm">{feature}</span>
        </li>
      ))}
      {planDetails.exclusiveFeatures.length > 3 && (
        <li className="flex items-start">
          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-book-purple flex-shrink-0 mr-2 mt-0.5" />
          <span className="text-slate-700 text-xs sm:text-sm">+ {planDetails.exclusiveFeatures.length - 3} more exclusive features</span>
        </li>
      )}
    </ul>
  );
};
