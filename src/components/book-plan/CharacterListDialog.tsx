
import React, { useState } from 'react';
import { Users, SparklesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { generateCharacterList } from '@/lib/api/extendedContentService';
import { Textarea } from '@/components/ui/textarea';

interface CharacterListDialogProps {
  book: any;
  onSave: (updatedBook: any) => void;
}

const CharacterListDialog: React.FC<CharacterListDialogProps> = ({ book, onSave }) => {
  const [open, setOpen] = useState(false);
  const [characterList, setCharacterList] = useState(book?.characterList || '');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!book) return;
    
    setGenerating(true);
    try {
      const generatedList = await generateCharacterList(book);
      setCharacterList(generatedList);
      toast.success('Character list generated successfully!');
    } catch (error) {
      console.error('Error generating character list:', error);
      toast.error('Failed to generate character list');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = () => {
    if (!book) return;
    
    const updatedBook = {
      ...book,
      characterList
    };
    
    onSave(updatedBook);
    setOpen(false);
    toast.success('Character list saved successfully!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Characters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Character List</DialogTitle>
          <DialogDescription>
            View and edit the list of characters in your book. You can generate a character list automatically or edit it manually.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleGenerate}
              disabled={generating}
            >
              <SparklesIcon className="h-4 w-4 mr-2" />
              {generating ? 'Generating...' : 'Generate Character List'}
            </Button>
          </div>
          
          <Textarea
            value={characterList}
            onChange={(e) => setCharacterList(e.target.value)}
            rows={15}
            placeholder="Enter character descriptions or generate them automatically..."
            className="font-mono text-sm"
          />
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Characters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterListDialog;
