
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Book, Wand } from 'lucide-react';
import { GenerationMode } from '@/hooks/useAIChapterGeneration';

interface GenerationModeSelectorProps {
  generationMode: GenerationMode;
  onModeChange: (mode: GenerationMode) => void;
  userPlan: string;
}

const GenerationModeSelector: React.FC<GenerationModeSelectorProps> = ({
  generationMode,
  onModeChange,
  userPlan
}) => {
  const isPremiumFeature = (feature: 'guided' | 'prompt') => {
    if (feature === 'guided') {
      return userPlan === 'Basic';
    }
    if (feature === 'prompt') {
      return userPlan === 'Basic' || userPlan === 'Pro';
    }
    return false;
  };

  return (
    <div className="space-y-2">
      <Label>Generation Mode</Label>
      <div className="grid grid-cols-3 gap-2">
        <Button 
          type="button" 
          variant={generationMode === "full-auto" ? "default" : "outline"}
          className="w-full"
          onClick={() => onModeChange("full-auto")}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Auto
        </Button>
        <Button 
          type="button" 
          variant={generationMode === "guided" ? "default" : "outline"}
          className="w-full"
          onClick={() => onModeChange("guided")}
          disabled={isPremiumFeature('guided')}
        >
          <Book className="h-4 w-4 mr-2" />
          Guided
          {isPremiumFeature('guided') && (
            <Badge variant="outline" className="ml-1 text-[0.6rem]">Pro</Badge>
          )}
        </Button>
        <Button 
          type="button" 
          variant={generationMode === "from-prompt" ? "default" : "outline"}
          className="w-full"
          onClick={() => onModeChange("from-prompt")}
          disabled={isPremiumFeature('prompt')}
        >
          <Wand className="h-4 w-4 mr-2" />
          Prompt
          {isPremiumFeature('prompt') && (
            <Badge variant="outline" className="ml-1 text-[0.6rem]">Ultimate</Badge>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GenerationModeSelector;
