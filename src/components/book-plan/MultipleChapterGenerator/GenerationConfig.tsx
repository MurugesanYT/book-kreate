
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ChapterGenerationConfig } from './types';

interface GenerationConfigProps {
  config: ChapterGenerationConfig;
  onConfigChange: (config: ChapterGenerationConfig) => void;
  maxChapters: number;
}

const GenerationConfigComponent: React.FC<GenerationConfigProps> = ({
  config,
  onConfigChange,
  maxChapters
}) => {
  const updateConfig = (field: keyof ChapterGenerationConfig, value: any) => {
    onConfigChange({ ...config, [field]: value });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2 md:space-y-3">
          <Label htmlFor="numberOfChapters" className="text-sm md:text-base font-semibold">Number of Chapters</Label>
          <Select
            value={config.numberOfChapters.toString()}
            onValueChange={(value) => updateConfig('numberOfChapters', parseInt(value))}
          >
            <SelectTrigger className="rounded-lg md:rounded-xl border-2 h-10 md:h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg md:rounded-xl">
              {Array.from({ length: maxChapters }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Chapter{num > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 md:space-y-3">
          <Label htmlFor="chapterLength" className="text-sm md:text-base font-semibold">Chapter Length</Label>
          <Select 
            value={config.chapterLength} 
            onValueChange={(value: 'short' | 'medium' | 'long') => updateConfig('chapterLength', value)}
          >
            <SelectTrigger className="rounded-lg md:rounded-xl border-2 h-10 md:h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg md:rounded-xl">
              <SelectItem value="short">Short (~1,000 words)</SelectItem>
              <SelectItem value="medium">Medium (~2,000 words)</SelectItem>
              <SelectItem value="long">Long (~3,500 words)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2 md:space-y-3">
        <Label htmlFor="generationStyle" className="text-sm md:text-base font-semibold">Generation Style</Label>
        <Select 
          value={config.generationStyle} 
          onValueChange={(value: 'sequential' | 'thematic' | 'character-focused') => updateConfig('generationStyle', value)}
        >
          <SelectTrigger className="rounded-lg md:rounded-xl border-2 h-10 md:h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-lg md:rounded-xl">
            <SelectItem value="sequential">Sequential Story Progression</SelectItem>
            <SelectItem value="thematic">Thematic Chapters</SelectItem>
            <SelectItem value="character-focused">Character Development Focused</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 md:space-y-3">
        <Label htmlFor="customPrompt" className="text-sm md:text-base font-semibold">
          Custom Instructions <span className="text-xs md:text-sm font-normal text-slate-500">(Optional)</span>
        </Label>
        <Textarea
          id="customPrompt"
          placeholder="Provide specific guidance for the AI about themes, plot points, or character development you want to include..."
          value={config.customPrompt}
          onChange={(e) => updateConfig('customPrompt', e.target.value)}
          className="min-h-[100px] md:min-h-[120px] rounded-lg md:rounded-xl border-2 text-sm md:text-base"
        />
      </div>
    </>
  );
};

export default GenerationConfigComponent;
