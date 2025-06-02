
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { generateMultipleChapters } from '@/lib/api/bookService';
import { generateBookChapterWithContext } from '@/lib/api/extendedContentService';

interface MultipleChapterGeneratorProps {
  book: any;
  onChaptersGenerated: (chapters: any[]) => void;
}

const MultipleChapterGenerator: React.FC<MultipleChapterGeneratorProps> = ({ book, onChaptersGenerated }) => {
  const [numberOfChapters, setNumberOfChapters] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerateChapters = async () => {
    if (!book || numberOfChapters < 1 || numberOfChapters > 20) {
      toast.error('Please enter a valid number between 1 and 20');
      return;
    }

    setIsGenerating(true);
    try {
      // First create the chapter structure
      const newChapters = await generateMultipleChapters(book.id, numberOfChapters);
      
      // Then generate AI content for each chapter
      const enhancedChapters = [];
      const existingChapters = book.chapters || [];
      
      for (let i = 0; i < newChapters.length; i++) {
        const chapter = newChapters[i];
        const previousChapters = [...existingChapters, ...enhancedChapters].map(ch => ({
          title: ch.title,
          content: ch.content || ''
        }));
        
        try {
          const aiContent = await generateBookChapterWithContext(
            book,
            chapter.title,
            `Write an engaging chapter that continues the story from previous chapters. This should be chapter ${chapter.order || (existingChapters.length + i + 1)} of the book.`,
            previousChapters
          );
          
          enhancedChapters.push({
            ...chapter,
            content: aiContent
          });
        } catch (error) {
          console.error(`Error generating content for ${chapter.title}:`, error);
          enhancedChapters.push(chapter); // Add with placeholder content
        }
      }
      
      onChaptersGenerated(enhancedChapters);
      toast.success(`Successfully generated ${numberOfChapters} chapters!`);
      setIsOpen(false);
    } catch (error: any) {
      console.error('Error generating chapters:', error);
      toast.error(`Failed to generate chapters: ${error.message || 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Wand2 className="h-4 w-4" />
          AI Bulk Generate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Generate Multiple Chapters
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chapterCount">Number of chapters to generate</Label>
            <Input
              id="chapterCount"
              type="number"
              min="1"
              max="20"
              value={numberOfChapters}
              onChange={(e) => setNumberOfChapters(parseInt(e.target.value) || 1)}
              placeholder="Enter number of chapters"
            />
            <p className="text-sm text-muted-foreground">
              AI will generate {numberOfChapters} chapters using your book's title, description, and any existing chapters as context.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleGenerateChapters}
              disabled={isGenerating || numberOfChapters < 1 || numberOfChapters > 20}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Chapters
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MultipleChapterGenerator;
