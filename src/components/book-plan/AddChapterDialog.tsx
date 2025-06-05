
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { generateChapterContent } from '@/lib/ai/chapterGenerationService';
import { Plus } from 'lucide-react';

type StylePreference = {
  tone: 'formal' | 'casual' | 'poetic' | 'technical' | 'dramatic';
  pacing: 'fast' | 'medium' | 'slow';
  perspective: 'first-person' | 'third-person' | 'omniscient';
};

interface AddChapterDialogProps {
  book: any;
  onAddChapter: (newChapter: any) => void;
}

const AddChapterDialog: React.FC<AddChapterDialogProps> = ({ book, onAddChapter }) => {
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
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Chapter</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="chapterTitle">Chapter Title</Label>
            <Input
              id="chapterTitle"
              placeholder="Enter chapter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="chapterDescription">Chapter Description/Notes</Label>
            <Textarea
              id="chapterDescription"
              placeholder="What should this chapter be about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Tone</Label>
              <Select 
                value={stylePreferences.tone} 
                onValueChange={(value) => handleStyleChange('tone', value as StylePreference['tone'])}
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
                onValueChange={(value) => handleStyleChange('pacing', value as StylePreference['pacing'])}
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
                onValueChange={(value) => handleStyleChange('perspective', value as StylePreference['perspective'])}
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
