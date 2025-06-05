
import React from 'react';
import { Badge } from "@/components/ui/badge";

const PricingHeader = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
        Choose Your Perfect Plan
      </h2>
      <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
        From free starter to unlimited professional - we have a plan that grows with your writing journey.
      </p>
      <Badge variant="outline" className="bg-white border-book-purple text-book-purple px-4 py-2">
        ✨ New Free Plan Available + Enhanced Features
      </Badge>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="text-center p-4 bg-white/50 rounded-lg border">
          <div className="text-2xl font-bold text-book-purple">4</div>
          <div className="text-sm text-gray-600">Plan Tiers</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-lg border">
          <div className="text-2xl font-bold text-book-orange">12+</div>
          <div className="text-sm text-gray-600">Export Formats</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-lg border">
          <div className="text-2xl font-bold text-book-purple">75+</div>
          <div className="text-sm text-gray-600">Book Templates</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-lg border">
          <div className="text-2xl font-bold text-book-orange">∞</div>
          <div className="text-sm text-gray-600">Ultimate Features</div>
        </div>
      </div>
    </div>
  );
};

export default PricingHeader;
