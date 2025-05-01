import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand } from 'lucide-react';
import { PromptType, promptOptions } from '@/hooks/useAIChapterEdit';

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
        <div className="space-y-2">
          <Label htmlFor="customPrompt">Custom Instruction</Label>
          <Textarea
            id="customPrompt"
            placeholder="Provide clear instructions for the AI about how to edit this chapter..."
            value={customPrompt}
            onChange={(e) => onCustomPromptChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
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
