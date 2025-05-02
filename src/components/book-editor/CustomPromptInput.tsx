
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CustomPromptInputProps {
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
}

const CustomPromptInput: React.FC<CustomPromptInputProps> = ({
  customPrompt,
  onCustomPromptChange
}) => {
  return (
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
  );
};

export default CustomPromptInput;
