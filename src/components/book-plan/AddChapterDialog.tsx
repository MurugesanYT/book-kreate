
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Wand } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface AddChapterDialogProps {
  onAddChapter: (chapter: any) => void;
  book: any;
}

const AddChapterDialog: React.FC<AddChapterDialogProps> = ({ onAddChapter, book }) => {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<'manual' | 'ai'>('manual');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [generationPrompt, setGenerationPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setGenerationPrompt('');
    setMethod('manual');
    setIsSubmitting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // For manual chapter creation
      if (method === 'manual') {
        if (!title.trim()) {
          toast.error('Please enter a chapter title');
          setIsSubmitting(false);
          return;
        }
        
        // Create a chapter task
        const newTask = {
          id: uuidv4(),
          title: title.trim(),
          description: description.trim(),
          type: 'chapter',
          status: 'pending'
        };
        
        onAddChapter(newTask);
        toast.success('Chapter added successfully');
        setOpen(false);
        resetForm();
      } 
      // For AI-generated chapters
      else if (method === 'ai') {
        // Create a chapter task with either the specified title or AI-generated title prompt
        const effectiveTitle = title.trim() || `Generated Chapter ${(book?.chapters?.length || 0) + 1}`;
        const effectiveDescription = description.trim() || generationPrompt.trim();
        
        if (!effectiveDescription) {
          toast.error('Please provide either a description or generation prompt');
          setIsSubmitting(false);
          return;
        }
        
        const newTask = {
          id: uuidv4(),
          title: effectiveTitle,
          description: effectiveDescription,
          type: 'chapter',
          status: 'pending'
        };
        
        onAddChapter(newTask);
        toast.success('Chapter task added and ready for generation');
        setOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error adding chapter:', error);
      toast.error('Failed to add chapter. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Chapter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Chapter</DialogTitle>
        </DialogHeader>
        
        <Tabs value={method} onValueChange={(v) => setMethod(v as 'manual' | 'ai')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Create</TabsTrigger>
            <TabsTrigger value="ai">
              <Wand className="h-4 w-4 mr-2" />
              AI Generate
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="manual" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Chapter Title</Label>
                <Input 
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter chapter title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Chapter Description (optional)</Label>
                <Textarea 
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the chapter"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="ai-title">Chapter Title (optional)</Label>
                <Input 
                  id="ai-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title or leave blank for AI to name"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to use a placeholder title that you can change later.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Generation Prompt</Label>
                <Textarea 
                  id="ai-prompt"
                  value={generationPrompt}
                  onChange={(e) => setGenerationPrompt(e.target.value)}
                  placeholder="What should this chapter be about?"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Describe what should happen in this chapter, key events, or characters involved.
                </p>
              </div>
            </TabsContent>
            
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Chapter'}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddChapterDialog;
