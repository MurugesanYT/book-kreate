
import React, { useState } from 'react';
import { Sparkles, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { generateImprovedDescription } from '@/lib/api/extendedContentService';
import { Textarea } from '@/components/ui/textarea';

interface ImproveDescriptionDialogProps {
  book: any;
  onSave: (updatedBook: any) => void;
}

const ImproveDescriptionDialog: React.FC<ImproveDescriptionDialogProps> = ({ book, onSave }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(book?.description || '');
  const [originalDescription, setOriginalDescription] = useState(book?.description || '');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!book) return;
    
    setGenerating(true);
    try {
      const improvedDescription = await generateImprovedDescription({
        ...book,
        description: description || originalDescription
      });
      setDescription(improvedDescription);
      toast.success('Description improved successfully!');
    } catch (error) {
      console.error('Error improving description:', error);
      toast.error('Failed to improve description');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = () => {
    if (!book) return;
    
    const updatedBook = {
      ...book,
      description
    };
    
    onSave(updatedBook);
    setOpen(false);
    toast.success('Description saved successfully!');
  };

  const handleReset = () => {
    setDescription(originalDescription);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Sparkles className="h-4 w-4 mr-2" />
          Improve Description
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Improve Book Description</DialogTitle>
          <DialogDescription>
            Enhance your book description with AI-generated improvements.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            placeholder="Enter your book description..."
          />
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleReset} size="sm">
              Reset to Original
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGenerate}
              disabled={generating}
              size="sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {generating ? 'Improving...' : 'Improve with AI'}
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <FileText className="h-4 w-4 mr-2" />
            Save Description
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImproveDescriptionDialog;
