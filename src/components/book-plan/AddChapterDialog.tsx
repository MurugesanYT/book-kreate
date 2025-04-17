
import React, { useState } from 'react';
import { Plus, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface AddChapterDialogProps {
  onAddChapter: (chapter: {
    id: string;
    title: string;
    type: string;
    status: 'pending';
    description: string;
  }) => void;
}

const AddChapterDialog: React.FC<AddChapterDialogProps> = ({ onAddChapter }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a chapter title');
      return;
    }
    
    const newChapter = {
      id: uuidv4(),
      title: title.trim(),
      type: 'chapter',
      status: 'pending' as const,
      description: description.trim()
    };
    
    onAddChapter(newChapter);
    setOpen(false);
    
    // Reset form
    setTitle('');
    setDescription('');
    
    toast.success(`Added new chapter: ${title}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Add New Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Chapter</DialogTitle>
          <DialogDescription>
            Create a new chapter for your book. This will be added to your task list for generation.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Chapter Title
            </label>
            <Input
              id="title"
              placeholder="e.g., The Beginning of the Journey"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Chapter Description (Optional)
            </label>
            <Textarea
              id="description"
              placeholder="Brief description of what this chapter should cover..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <FileText className="h-4 w-4 mr-2" />
              Add Chapter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddChapterDialog;
