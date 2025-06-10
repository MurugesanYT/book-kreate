
import React from 'react';
import { Clock, Sparkles, Target } from 'lucide-react';

const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Time Efficient',
      description: 'Generate hours of content in minutes',
      color: 'blue'
    },
    {
      icon: Sparkles,
      title: 'Context Aware',
      description: 'Maintains story continuity',
      color: 'purple'
    },
    {
      icon: Target,
      title: 'Customizable',
      description: 'Follows your specific guidelines',
      color: 'green'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
      {features.map((feature) => (
        <div 
          key={feature.title}
          className={`text-center p-3 md:p-4 bg-${feature.color}-50 rounded-xl md:rounded-2xl border border-${feature.color}-200`}
        >
          <feature.icon className={`h-6 w-6 md:h-8 md:w-8 text-${feature.color}-600 mx-auto mb-2`} />
          <p className={`text-xs md:text-sm font-medium text-${feature.color}-800`}>{feature.title}</p>
          <p className={`text-xs text-${feature.color}-600`}>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureHighlights;
