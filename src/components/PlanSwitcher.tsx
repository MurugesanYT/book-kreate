
import React, { useState } from 'react';
import { setUserPlan, getUserPlan, PlanKey, PLANS } from '@/lib/api/planService';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const PlanSwitcher = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>(getUserPlan());
  const currentPlan = getUserPlan();

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value as PlanKey);
  };

  const handleApplyPlan = () => {
    setUserPlan(selectedPlan);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Switch Plan (Testing Mode)</CardTitle>
        <CardDescription>
          Try different plans to test their limitations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedPlan} onValueChange={handlePlanChange} className="space-y-4">
          {Object.entries(PLANS).map(([planName, planDetails]) => (
            <div key={planName} className="flex items-start space-x-3 border p-3 rounded-md">
              <RadioGroupItem value={planName} id={`plan-${planName}`} />
              <div className="grid gap-1.5 leading-none">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`plan-${planName}`} className="font-bold">
                    {planName}
                  </Label>
                  {currentPlan === planName && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {planDetails.price} - {planDetails.books === Infinity ? "Unlimited" : planDetails.books} books,{" "}
                  {planDetails.chapters === Infinity ? "Unlimited" : planDetails.chapters} chapters
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {planDetails.exportFormats.map(format => (
                    <Badge key={format} variant="secondary" className="text-xs bg-slate-100">
                      {format}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleApplyPlan} 
          className="w-full"
          disabled={selectedPlan === currentPlan}
        >
          {selectedPlan === currentPlan ? (
            <><Check className="h-4 w-4 mr-2" /> Current Plan</>
          ) : (
            `Switch to ${selectedPlan} Plan`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanSwitcher;
