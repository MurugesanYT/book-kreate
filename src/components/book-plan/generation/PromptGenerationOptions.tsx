
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GenerationOptions } from '@/hooks/useAIChapterGeneration';

interface PromptGenerationOptionsProps {
  options: GenerationOptions;
  onOptionChange: (option: string, value: any) => void;
}

const PromptGenerationOptions: React.FC<PromptGenerationOptionsProps> = ({
  options,
  onOptionChange
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Prompt-Based Generation</CardTitle>
        <CardDescription>Provide specific instructions for the AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          <Label htmlFor="promptGuidance">Your Prompt</Label>
          <Textarea
            id="promptGuidance"
            placeholder="Write a chapter where the protagonist discovers a hidden truth about their past that changes everything..."
            value={options.promptGuidance}
            onChange={(e) => onOptionChange('promptGuidance', e.target.value)}
            className="min-h-[120px]"
          />
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 pt-3">
        <p className="text-xs text-muted-foreground">
          Complete creative control with your own prompt. The AI will generate content based on your specific instructions.
        </p>
      </CardFooter>
    </Card>
  );
};

export default PromptGenerationOptions;
