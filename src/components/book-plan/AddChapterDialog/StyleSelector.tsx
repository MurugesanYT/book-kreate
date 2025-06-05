
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type StylePreference = {
  tone: 'formal' | 'casual' | 'poetic' | 'technical' | 'dramatic';
  pacing: 'fast' | 'medium' | 'slow';
  perspective: 'first-person' | 'third-person' | 'omniscient';
};

interface StyleSelectorProps {
  stylePreferences: StylePreference;
  onStyleChange: (key: keyof StylePreference, value: any) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  stylePreferences,
  onStyleChange
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="grid gap-2">
        <Label>Tone</Label>
        <Select 
          value={stylePreferences.tone} 
          onValueChange={(value) => onStyleChange('tone', value as StylePreference['tone'])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
            <SelectItem value="poetic">Poetic</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="dramatic">Dramatic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label>Pacing</Label>
        <Select 
          value={stylePreferences.pacing} 
          onValueChange={(value) => onStyleChange('pacing', value as StylePreference['pacing'])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pacing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="slow">Slow</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="fast">Fast</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label>Perspective</Label>
        <Select 
          value={stylePreferences.perspective} 
          onValueChange={(value) => onStyleChange('perspective', value as StylePreference['perspective'])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Perspective" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first-person">First Person</SelectItem>
            <SelectItem value="third-person">Third Person</SelectItem>
            <SelectItem value="omniscient">Omniscient</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
