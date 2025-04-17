
import React, { useState, useEffect } from 'react';
import { List, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface TableOfContentsDialogProps {
  book: any;
  onSave: (updatedBook: any) => void;
}

const TableOfContentsDialog: React.FC<TableOfContentsDialogProps> = ({ book, onSave }) => {
  const [open, setOpen] = useState(false);
  const [chapters, setChapters] = useState<any[]>([]);

  useEffect(() => {
    if (book?.chapters) {
      setChapters([...book.chapters].sort((a, b) => a.order - b.order));
    }
  }, [book, open]);

  const handleSave = () => {
    if (!book) return;
    
    const updatedBook = {
      ...book,
      chapters: chapters.map((chapter, index) => ({
        ...chapter,
        order: index
      }))
    };
    
    onSave(updatedBook);
    setOpen(false);
    toast.success('Table of contents updated successfully!');
  };

  const moveChapter = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === chapters.length - 1)) {
      return;
    }
    
    const newChapters = [...chapters];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap chapters
    [newChapters[index], newChapters[newIndex]] = [newChapters[newIndex], newChapters[index]];
    
    setChapters(newChapters);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <List className="h-4 w-4" />
          Table of Contents
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Table of Contents</DialogTitle>
          <DialogDescription>
            View and reorder your book's chapters. Changes will be reflected in the exported documents.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {chapters.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No chapters yet. Add chapters to your book to see them here.</p>
          ) : (
            <div className="space-y-2">
              {chapters.map((chapter, index) => (
                <div 
                  key={chapter.id || index} 
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-md border"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{index + 1}.</span>
                    <span className="font-medium">{chapter.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveChapter(index, 'up')}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      ↑
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveChapter(index, 'down')}
                      disabled={index === chapters.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      ↓
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TableOfContentsDialog;
