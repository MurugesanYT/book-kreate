
import React from 'react';
import { Badge } from "@/components/ui/badge";

const PricingHeader = () => {
  return (
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
  );
};

export default PricingHeader;
