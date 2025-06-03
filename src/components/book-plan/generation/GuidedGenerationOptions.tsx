
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GenerationOptions } from '@/hooks/useAIChapterGeneration';

interface GuidedGenerationOptionsProps {
  options: GenerationOptions;
  onOptionChange: (option: string, value: any) => void;
}

const GuidedGenerationOptions: React.FC<GuidedGenerationOptionsProps> = ({
  options,
  onOptionChange
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Guided Generation</CardTitle>
        <CardDescription>Provide guidance on what you want in this chapter</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="chapterLength">Chapter Length</Label>
          <Select
            value={options.chapterLength}
            onValueChange={(value) => onOptionChange('chapterLength', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (~1,500 words)</SelectItem>
              <SelectItem value="medium">Medium (~3,000 words)</SelectItem>
              <SelectItem value="long">Long (~5,000 words)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="chapterPurpose">Chapter Purpose</Label>
          <Select
            value={options.chapterPurpose}
            onValueChange={(value) => onOptionChange('chapterPurpose', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="introduce-character">Introduce a Character</SelectItem>
              <SelectItem value="progress-story">Progress the Story</SelectItem>
              <SelectItem value="create-conflict">Create Conflict</SelectItem>
              <SelectItem value="resolve-conflict">Resolve Conflict</SelectItem>
              <SelectItem value="build-world">World Building</SelectItem>
              <SelectItem value="character-development">Character Development</SelectItem>
              <SelectItem value="plot-twist">Plot Twist</SelectItem>
              <SelectItem value="climax">Climactic Scene</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 pt-3">
        <p className="text-xs text-muted-foreground">
          The AI will use your guidance along with the existing context to create a chapter that fits your needs.
        </p>
      </CardFooter>
    </Card>
  );
};

export default GuidedGenerationOptions;
