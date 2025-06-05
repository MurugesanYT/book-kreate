
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { getMaxChaptersCanCreate, canCreateMultipleChapters, getUserPlan, PLANS } from '@/lib/api/planService';
import { Badge } from '@/components/ui/badge';

interface BulkChapterCreatorProps {
  book: any;
  onChaptersCreated: (chapters: any[]) => void;
}

const BulkChapterCreator: React.FC<BulkChapterCreatorProps> = ({ book, onChaptersCreated }) => {
  const [open, setOpen] = useState(false);
  const [chapterCount, setChapterCount] = useState(1);
  const [chapterPrefix, setChapterPrefix] = useState('Chapter');
  const [baseDescription, setBaseDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const currentPlan = getUserPlan();
  const maxPossibleChapters = getMaxChaptersCanCreate(book);
  const planData = PLANS[currentPlan];

  const handleCreateChapters = async () => {
    if (!canCreateMultipleChapters(book, chapterCount)) {
      return;
    }

    setIsCreating(true);
    
    try {
      const newChapters = [];
      
      for (let i = 1; i <= chapterCount; i++) {
        const chapter = {
          id: `chapter-${Date.now()}-${i}`,
          title: `${chapterPrefix} ${(book.chapters?.length || 0) + i}`,
          content: baseDescription ? `${baseDescription}\n\n[Content for chapter ${i} will be generated here]` : `[Content for ${chapterPrefix} ${i} will be generated here]`,
          order: (book.chapters?.length || 0) + i,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        newChapters.push(chapter);
      }
      
      onChaptersCreated(newChapters);
      toast.success(`Successfully created ${chapterCount} chapters!`);
      setOpen(false);
      
      // Reset form
      setChapterCount(1);
      setChapterPrefix('Chapter');
      setBaseDescription('');
      
    } catch (error) {
      console.error('Error creating chapters:', error);
      toast.error('Failed to create chapters. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Bulk Create Chapters
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Create Multiple Chapters
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium">Current Plan: {currentPlan}</p>
              <p className="text-xs text-gray-600">
                Max chapters per book: {planData.chapters === Infinity ? 'Unlimited' : planData.chapters}
              </p>
            </div>
            <Badge variant={currentPlan === 'Ultimate' ? 'default' : 'secondary'}>
              {planData.chapters === Infinity ? '∞' : planData.chapters}
            </Badge>
          </div>

          <div>
            <Label htmlFor="chapterCount">Number of Chapters</Label>
            <Input
              id="chapterCount"
              type="number"
              min={1}
              max={maxPossibleChapters}
              value={chapterCount}
              onChange={(e) => setChapterCount(Math.min(maxPossibleChapters, Math.max(1, parseInt(e.target.value) || 1)))}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              You can create up to {maxPossibleChapters} more chapters
            </p>
          </div>

          <div>
            <Label htmlFor="chapterPrefix">Chapter Title Prefix</Label>
            <Input
              id="chapterPrefix"
              value={chapterPrefix}
              onChange={(e) => setChapterPrefix(e.target.value)}
              placeholder="e.g., Chapter, Part, Section"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="baseDescription">Base Description (Optional)</Label>
            <Textarea
              id="baseDescription"
              value={baseDescription}
              onChange={(e) => setBaseDescription(e.target.value)}
              placeholder="Optional description that will be added to all chapters"
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleCreateChapters}
              disabled={isCreating || maxPossibleChapters === 0}
              className="flex-1"
            >
              {isCreating ? 'Creating...' : `Create ${chapterCount} Chapter${chapterCount > 1 ? 's' : ''}`}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkChapterCreator;
