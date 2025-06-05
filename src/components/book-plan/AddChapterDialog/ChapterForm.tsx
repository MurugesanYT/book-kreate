
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ChapterFormProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export const ChapterForm: React.FC<ChapterFormProps> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange
}) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="chapterTitle">Chapter Title</Label>
        <Input
          id="chapterTitle"
          placeholder="Enter chapter title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="chapterDescription">Chapter Description/Notes</Label>
        <Textarea
          id="chapterDescription"
          placeholder="What should this chapter be about?"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </>
  );
};
