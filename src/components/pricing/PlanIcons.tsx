
import { Gift, Zap, Star, Crown } from 'lucide-react';

export const getPlanIcon = (planName: string) => {
  switch (planName) {
    case 'Free': return <Gift className="h-5 w-5" />;
    case 'Basic': return <Zap className="h-5 w-5" />;
    case 'Pro': return <Star className="h-5 w-5" />;
    case 'Ultimate': return <Crown className="h-5 w-5" />;
    default: return null;
  }
};

export const getPlanColor = (planName: string) => {
  switch (planName) {
    case 'Free': return 'from-green-500 to-emerald-600';
    case 'Basic': return 'from-blue-500 to-blue-600';
    case 'Pro': return 'from-purple-500 to-purple-600';
    case 'Ultimate': return 'from-amber-500 to-orange-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

export const getPlanDescription = (planName: string) => {
  switch (planName) {
    case 'Free': return "Perfect for trying out our platform and writing your first books";
    case 'Basic': return "Great for casual writers and small projects";
    case 'Pro': return "Ideal for serious authors and content creators";
    case 'Ultimate': return "For professional authors, publishers, and power users";
    default: return "";
  }
};
