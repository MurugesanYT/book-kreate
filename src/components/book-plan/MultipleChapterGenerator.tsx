
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { generateChapterContent } from '@/lib/ai/chapterGenerationService';
import { Task } from '@/hooks/taskUtils';
import { Book } from '@/lib/api/types';

interface MultipleChapterGeneratorProps {
  book: Book;
  onAddChapters: (chapters: Task[]) => void;
}

const MultipleChapterGenerator: React.FC<MultipleChapterGeneratorProps> = ({
  book,
  onAddChapters
}) => {
  const [open, setOpen] = useState(false);
  const [chapterCount, setChapterCount] = useState(3);
  const [generating, setGenerating] = useState(false);

  const handleGenerateChapters = async () => {
    if (chapterCount < 1 || chapterCount > 20) {
      toast.error('Please enter a number between 1 and 20');
      return;
    }

    setGenerating(true);
    try {
      toast.info(`Generating ${chapterCount} chapters...`);
      
      const newChapters: Task[] = [];
      
      for (let i = 1; i <= chapterCount; i++) {
        const chapterTitle = `Chapter ${i}`;
        const chapterDescription = `Content for chapter ${i} of ${book.title}`;
        
        // Get previous chapters for context
        const previousChapters = book.chapters?.slice(0, i - 1).map(ch => ({
          title: ch.title,
          content: ch.content || ''
        })) || [];
        
        try {
          const content = await generateChapterContent(
            book,
            chapterTitle,
            chapterDescription,
            previousChapters
          );
          
          const newChapter: Task = {
            id: uuidv4(),
            title: chapterTitle,
            type: 'chapter',
            status: 'completed',
            description: chapterDescription
          };
          
          // Add the chapter to the book's chapters array
          if (!book.chapters) {
            book.chapters = [];
          }
          
          book.chapters.push({
            id: uuidv4(),
            title: chapterTitle,
            content: content,
            order: book.chapters.length + 1
          });
          
          newChapters.push(newChapter);
          
          toast.success(`Generated ${chapterTitle}`);
        } catch (error) {
          console.error(`Error generating chapter ${i}:`, error);
          toast.error(`Failed to generate Chapter ${i}`);
        }
      }
      
      if (newChapters.length > 0) {
        onAddChapters(newChapters);
        toast.success(`Successfully generated ${newChapters.length} chapters!`);
        setOpen(false);
      }
    } catch (error) {
      console.error('Error generating chapters:', error);
      toast.error('Failed to generate chapters');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Generate Multiple Chapters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Multiple Chapters</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="chapterCount">Number of Chapters</Label>
            <Input
              id="chapterCount"
              type="number"
              min="1"
              max="20"
              value={chapterCount}
              onChange={(e) => setChapterCount(parseInt(e.target.value) || 1)}
              placeholder="Enter number of chapters"
            />
            <p className="text-sm text-gray-500 mt-1">
              AI will generate chapters with previous chapters as context
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={generating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerateChapters}
              disabled={generating}
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Chapters'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MultipleChapterGenerator;
