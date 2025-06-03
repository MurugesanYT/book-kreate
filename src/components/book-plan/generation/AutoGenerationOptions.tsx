
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GenerationOptions } from '@/hooks/useAIChapterGeneration';

interface AutoGenerationOptionsProps {
  options: GenerationOptions;
  onOptionChange: (option: string, value: any) => void;
}

const AutoGenerationOptions: React.FC<AutoGenerationOptionsProps> = ({
  options,
  onOptionChange
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Auto Generation</CardTitle>
        <CardDescription>AI will automatically create a suitable next chapter</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="respectTone">Respect Book Tone</Label>
          <Switch 
            id="respectTone" 
            checked={options.respectTone}
            onCheckedChange={(checked) => onOptionChange('respectTone', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="respectStyle">Match Writing Style</Label>
          <Switch 
            id="respectStyle" 
            checked={options.respectStyle}
            onCheckedChange={(checked) => onOptionChange('respectStyle', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="useBookContext">Use Book Context</Label>
          <Switch 
            id="useBookContext" 
            checked={options.useBookContext}
            onCheckedChange={(checked) => onOptionChange('useBookContext', checked)}
          />
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 pt-3">
        <p className="text-xs text-muted-foreground">
          AI will analyze your book's existing content and generate a coherent next chapter.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AutoGenerationOptions;
