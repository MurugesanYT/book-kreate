
import React from 'react';
import { getUserPlan, PLANS } from '@/lib/api/planService';
import PlanSwitcher from '@/components/PlanSwitcher';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PlanPage = () => {
  const currentPlan = getUserPlan();
  const planDetails = PLANS[currentPlan];

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Your Plan</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Current Plan: {currentPlan}</h2>
            <p className="text-gray-500">
              You're currently on the {currentPlan} plan ({planDetails.price}/month)
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-medium">Your limits:</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Books:</span> 
                <span className="font-medium">{planDetails.books === Infinity ? "Unlimited" : planDetails.books}</span>
              </li>
              <li className="flex justify-between">
                <span>Chapters per book:</span> 
                <span className="font-medium">{planDetails.chapters === Infinity ? "Unlimited" : planDetails.chapters}</span>
              </li>
              <li>
                <span className="block mb-1">Export formats:</span>
                <div className="flex flex-wrap gap-2">
                  {planDetails.exportFormats.map(format => (
                    <span key={format} className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {format}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <Button asChild>
            <Link to="/pricing">Compare Plans</Link>
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Testing Mode</h2>
          <p className="text-gray-500 mb-4">
            For demonstration purposes, you can switch between plans to test their features and limitations.
          </p>
          <PlanSwitcher />
        </div>
      </div>

      <Separator className="my-8" />

      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Need more? Upgrade your plan</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Get access to more books, chapters, and export formats by upgrading your plan.
        </p>
        <Button size="lg" asChild>
          <Link to="/pricing">View Pricing</Link>
        </Button>
      </div>
    </div>
  );
};

export default PlanPage;
