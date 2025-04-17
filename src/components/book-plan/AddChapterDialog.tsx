
import React, { useState } from 'react';
import { Plus, BookOpen, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { generateBookChapterWithContext } from '@/lib/api/extendedContentService';

interface AddChapterDialogProps {
  onAddChapter: (chapter: {
    id: string;
    title: string;
    type: string;
    status: 'pending';
    description: string;
  }) => void;
  book?: any;
}

const AddChapterDialog: React.FC<AddChapterDialogProps> = ({ onAddChapter, book }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('manual');

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

  const handleGenerateChapter = async () => {
    if (!book) {
      toast.error('Book information is required to generate a chapter');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Generate a chapter title and description based on the book's context
      const prompt = `Generate a creative and engaging chapter title and brief description (25-30 words) for the next chapter of a book titled "${book.title}". The book is about: ${book.description || 'No description available'}. Return the response in this exact format: {"title": "Chapter Title Here", "description": "Brief description here..."}`;
      
      // Get a simple, contextually appropriate chapter suggestion
      const result = await generateBookChapterWithContext(
        book,
        "Next Chapter",
        "Generate title and description only",
        []
      );
      
      // Try to parse the result as JSON
      try {
        // First try to extract a JSON object if it's embedded in text
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : result;
        const chapterData = JSON.parse(jsonStr);
        
        if (chapterData.title && chapterData.description) {
          setTitle(chapterData.title);
          setDescription(chapterData.description);
          toast.success('Generated chapter suggestion');
        } else {
          throw new Error('Invalid response format');
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        // Fallback if we couldn't parse JSON
        const lines = result.split('\n');
        let foundTitle = '';
        let foundDescription = '';
        
        for (const line of lines) {
          if (line.toLowerCase().includes('title:')) {
            foundTitle = line.split('title:')[1]?.trim() || '';
          } else if (line.toLowerCase().includes('description:')) {
            foundDescription = line.split('description:')[1]?.trim() || '';
          }
        }
        
        if (foundTitle) setTitle(foundTitle);
        if (foundDescription) setDescription(foundDescription);
        
        if (foundTitle || foundDescription) {
          toast.success('Generated chapter suggestion');
        } else {
          throw new Error('Could not extract title or description');
        }
      }
    } catch (error) {
      console.error('Error generating chapter:', error);
      toast.error('Failed to generate chapter. Please try manually.');
    } finally {
      setIsGenerating(false);
    }
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="ai">AI Suggestion</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
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
          </TabsContent>
          
          <TabsContent value="ai">
            <div className="space-y-4 mt-4">
              <Button 
                onClick={handleGenerateChapter} 
                className="w-full"
                disabled={isGenerating}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Chapter Suggestion'}
              </Button>
              
              {(title || description) && (
                <div className="border rounded-md p-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium">Generated Title:</p>
                    <p className="text-base">{title || "No title generated yet"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Generated Description:</p>
                    <p className="text-base">{description || "No description generated yet"}</p>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!title.trim()}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Use This Chapter
                </Button>
              </DialogFooter>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddChapterDialog;
