
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { generateChapterContent } from '@/lib/ai/chapterGenerationService';
import { Plus } from 'lucide-react';
import { ChapterForm } from './AddChapterDialog/ChapterForm';
import { StyleSelector, StylePreference } from './AddChapterDialog/StyleSelector';

interface AddChapterDialogProps {
  book: any;
  onAddChapter: (newChapter: any) => void;
  children?: React.ReactNode;
}

const AddChapterDialog: React.FC<AddChapterDialogProps> = ({ book, onAddChapter, children }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [stylePreferences, setStylePreferences] = useState<StylePreference>({
    tone: 'casual',
    pacing: 'medium',
    perspective: 'third-person',
  });

  const handleAddChapter = async (withAI: boolean = false) => {
    if (!title.trim()) {
      toast.error('Please enter a chapter title');
      return;
    }

    try {
      let content = '';
      
      if (withAI) {
        setIsGenerating(true);
        toast.loading('Generating chapter content...');
        
        content = await generateChapterContent(
          book,
          title,
          description,
          book.chapters || [],
          stylePreferences
        );
        
        setGeneratedContent(content);
        toast.success('Chapter content generated!');
      }
      
      const newChapter = {
        id: uuidv4(),
        title: title.trim(),
        description: description.trim(),
        type: 'chapter',
        status: 'pending',
        content,
      };
      
      onAddChapter(newChapter);
      toast.success(`Chapter "${title}" added successfully!`);
      
      // Reset form fields
      setTitle('');
      setDescription('');
      setGeneratedContent('');
      
      // Close dialog
      setOpen(false);
    } catch (error) {
      console.error('Error adding chapter:', error);
      toast.error('Failed to add chapter. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleStyleChange = (key: keyof StylePreference, value: any) => {
    setStylePreferences({
      ...stylePreferences,
      [key]: value
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Chapter
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Chapter</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <ChapterForm
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
          />
          
          <StyleSelector
            stylePreferences={stylePreferences}
            onStyleChange={handleStyleChange}
          />
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => handleAddChapter(false)}>
            Add Empty Chapter
          </Button>
          <Button disabled={!title || isGenerating} onClick={() => handleAddChapter(true)}>
            {isGenerating ? 'Generating...' : 'Add with AI Content'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddChapterDialog;
