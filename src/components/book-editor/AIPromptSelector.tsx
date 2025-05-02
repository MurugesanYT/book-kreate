
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Wand } from 'lucide-react';
import { PromptType, promptOptions } from '@/hooks/useAIChapterEdit';
import CustomPromptInput from './CustomPromptInput';

interface AIPromptSelectorProps {
  promptType: PromptType;
  onPromptTypeChange: (type: PromptType) => void;
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const AIPromptSelector: React.FC<AIPromptSelectorProps> = ({
  promptType,
  onPromptTypeChange,
  customPrompt,
  onCustomPromptChange,
  onGenerate,
  isGenerating
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Edit Type</Label>
        <div className="grid grid-cols-5 gap-1 mt-2">
          {promptOptions.map((option) => (
            <Button
              key={option.value}
              variant={promptType === option.value ? "default" : "outline"}
              onClick={() => onPromptTypeChange(option.value)}
              className="justify-start text-xs py-1 h-auto"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      
      {promptType === 'custom' && (
        <CustomPromptInput 
          customPrompt={customPrompt}
          onCustomPromptChange={onCustomPromptChange}
        />
      )}
      
      <div className="flex justify-center">
        <Button 
          onClick={onGenerate}
          disabled={isGenerating || (promptType === 'custom' && !customPrompt.trim())}
        >
          <Wand className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Content'}
        </Button>
      </div>
    </div>
  );
};

export default AIPromptSelector;
