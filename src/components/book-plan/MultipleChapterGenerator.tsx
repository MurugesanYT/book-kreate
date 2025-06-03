
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Loader2, Sparkles, BookOpen, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { generateBookChapterWithContext } from '@/lib/api/extendedContentService';
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
  const [chapterCount, setChapterCount] = useState(5);
  const [generationType, setGenerationType] = useState<'sequential' | 'outline'>('sequential');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerateChapters = async () => {
    if (chapterCount < 1 || chapterCount > 25) {
      toast.error('Please enter a number between 1 and 25');
      return;
    }

    setGenerating(true);
    setProgress(0);
    
    try {
      toast.info(`🚀 Generating ${chapterCount} chapters with Book Kreate AI...`);
      
      const newChapters: Task[] = [];
      
      for (let i = 1; i <= chapterCount; i++) {
        setProgress((i / chapterCount) * 100);
        
        const chapterTitle = `Chapter ${i}`;
        let chapterDescription = `Content for chapter ${i} of ${book.title}`;
        
        // Add custom prompt context if provided
        if (customPrompt) {
          chapterDescription += `. Additional context: ${customPrompt}`;
        }
        
        // Add generation type specific instructions
        if (generationType === 'outline') {
          chapterDescription += `. This chapter should follow a clear outline structure with key plot points.`;
        } else {
          chapterDescription += `. This chapter should flow naturally from the previous chapters.`;
        }
        
        // Get previous chapters for context (limit to last 3 for performance)
        const previousChapters = book.chapters?.slice(Math.max(0, book.chapters.length - 3)).map(ch => ({
          title: ch.title,
          content: ch.content || ''
        })) || [];
        
        try {
          toast.loading(`✨ Creating ${chapterTitle} with AI...`);
          
          const content = await generateBookChapterWithContext(
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
          
          toast.success(`📖 ${chapterTitle} completed!`);
          
          // Small delay to avoid overwhelming the API
          if (i < chapterCount) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } catch (error) {
          console.error(`Error generating chapter ${i}:`, error);
          toast.error(`❌ Failed to generate Chapter ${i}`);
          
          // Create an empty chapter as fallback
          const fallbackChapter: Task = {
            id: uuidv4(),
            title: chapterTitle,
            type: 'chapter',
            status: 'pending',
            description: `Chapter ${i} - needs content generation`
          };
          newChapters.push(fallbackChapter);
        }
      }
      
      if (newChapters.length > 0) {
        onAddChapters(newChapters);
        toast.success(`🎉 Successfully created ${newChapters.length} chapters! Your book is taking shape.`);
        setOpen(false);
        
        // Reset form
        setChapterCount(5);
        setCustomPrompt('');
        setGenerationType('sequential');
      }
    } catch (error) {
      console.error('Error generating chapters:', error);
      toast.error('❌ Failed to generate chapters. Please try again.');
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-book-purple to-book-orange hover:opacity-90 shadow-lg px-6 py-3 rounded-xl">
          <Sparkles className="h-4 w-4" />
          Bulk Generate Chapters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-5 w-5 text-book-purple" />
            AI Chapter Generator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="chapterCount" className="text-sm font-medium">Number of Chapters</Label>
              <Input
                id="chapterCount"
                type="number"
                min="1"
                max="25"
                value={chapterCount}
                onChange={(e) => setChapterCount(parseInt(e.target.value) || 1)}
                placeholder="Enter number"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="generationType" className="text-sm font-medium">Generation Style</Label>
              <Select value={generationType} onValueChange={(value: 'sequential' | 'outline') => setGenerationType(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sequential">Sequential Flow</SelectItem>
                  <SelectItem value="outline">Structured Outline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="customPrompt" className="text-sm font-medium">Additional Instructions (Optional)</Label>
            <Textarea
              id="customPrompt"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Provide specific themes, tone, or plot points you want included..."
              className="mt-1 min-h-[80px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Help our AI understand your vision better with specific guidance
            </p>
          </div>
          
          {generating && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">Generating chapters...</span>
                <span className="text-sm text-blue-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-book-purple to-book-orange h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-book-purple mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">How it works</h4>
                <p className="text-sm text-gray-600">
                  Our AI will analyze your book's context and generate {chapterCount} chapters with 
                  rich content, maintaining consistency with your story's tone and style.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={generating}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerateChapters}
              disabled={generating || !chapterCount}
              className="bg-gradient-to-r from-book-purple to-book-orange hover:opacity-90 px-6"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate {chapterCount} Chapters
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MultipleChapterGenerator;
