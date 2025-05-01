
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, RefreshCcw, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { generateChapterOutline, generateChapterContent } from '@/lib/ai/chapterGenerationService';
import { toast } from 'sonner';

interface AddChapterDialogProps {
  onAddChapter: (chapter: any) => void;
  book: any;
}

const AddChapterDialog: React.FC<AddChapterDialogProps> = ({ onAddChapter, book }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingStep, setGeneratingStep] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [previewMode, setPreviewMode] = useState<'outline' | 'full'>('outline');
  const [generatedOutline, setGeneratedOutline] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [stylePreferences, setStylePreferences] = useState({
    tone: 'casual',
    pacing: 'medium',
    perspective: 'third-person'
  });

  const handleAddChapter = () => {
    if (title.trim()) {
      const newTask = {
        id: uuidv4(),
        title: title.trim(),
        type: 'chapter',
        description: description.trim(),
        status: 'pending' as const
      };

      onAddChapter(newTask);
      resetForm();
      setOpen(false);
      toast.success(`Added new chapter: ${title}`);
    } else {
      toast.error('Please enter a chapter title');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setGeneratedOutline(null);
    setGeneratedContent(null);
    setGenerationProgress(0);
    setGeneratingStep(null);
    setPreviewMode('outline');
  };

  const handleClose = () => {
    if (isGenerating) {
      // Confirm before closing if generation is in progress
      if (window.confirm('Generation is in progress. Are you sure you want to close?')) {
        resetForm();
        setOpen(false);
      }
    } else {
      resetForm();
      setOpen(false);
    }
  };

  const generateOutline = async () => {
    if (!title) {
      toast.error('Please enter a chapter title first');
      return;
    }

    setIsGenerating(true);
    setGeneratingStep('Generating outline');
    setGenerationProgress(10);

    try {
      setGenerationProgress(30);
      const outline = await generateChapterOutline(book, title, description);
      setGeneratedOutline(outline);
      setGenerationProgress(100);
      toast.success('Chapter outline generated successfully!');
    } catch (error) {
      console.error('Error generating outline:', error);
      toast.error('Failed to generate chapter outline');
    } finally {
      setIsGenerating(false);
      setGeneratingStep(null);
    }
  };

  const generateFullChapter = async () => {
    if (!title) {
      toast.error('Please enter a chapter title first');
      return;
    }

    setIsGenerating(true);
    setGeneratingStep('Analyzing book context');
    setGenerationProgress(10);

    try {
      // Get previous chapters for context
      const previousChapters = book.chapters && book.chapters.length > 0
        ? book.chapters.map((ch: any) => ({
            title: ch.title,
            content: ch.content || ''
          }))
        : [];

      setGeneratingStep('Generating initial draft');
      setGenerationProgress(30);

      // Generate content with style preferences
      const content = await generateChapterContent(
        book,
        title,
        description,
        previousChapters,
        stylePreferences
      );

      setGeneratedContent(content);
      setGenerationProgress(100);
      toast.success('Chapter content generated successfully!');
      setPreviewMode('full'); // Switch to full content preview
    } catch (error) {
      console.error('Error generating chapter:', error);
      toast.error('Failed to generate chapter content');
    } finally {
      setIsGenerating(false);
      setGeneratingStep(null);
    }
  };

  const addGeneratedChapter = () => {
    if (generatedContent && title) {
      // Create the chapter task
      const chapterTask = {
        id: uuidv4(),
        title: title.trim(),
        type: 'chapter',
        description: description.trim(),
        status: 'completed' as const
      };

      // Add the chapter to the book
      const updatedBook = { ...book };
      
      if (!updatedBook.chapters) {
        updatedBook.chapters = [];
      }
      
      updatedBook.chapters.push({
        id: uuidv4(),
        title: title,
        content: generatedContent,
        order: updatedBook.chapters.length
      });

      // Add the task
      onAddChapter(chapterTask);
      
      resetForm();
      setOpen(false);
      toast.success(`Added new chapter: ${title}`);
    } else {
      toast.error('Please generate chapter content first');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Chapter
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Chapter</DialogTitle>
            <DialogDescription>
              Create a new chapter for your book. You can generate content with AI or add it manually.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Chapter Title</Label>
                <Input
                  id="title"
                  placeholder="Enter chapter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Chapter Description/Requirements</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this chapter should be about"
                  className="min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              {isGenerating && (
                <Card className="mt-4">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {generatingStep || 'Generating...'}
                        </span>
                        <span className="text-xs text-muted-foreground">{generationProgress}%</span>
                      </div>
                      <Progress value={generationProgress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {!isGenerating && !generatedOutline && !generatedContent && (
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    variant="outline"
                    onClick={generateOutline}
                    disabled={!title || isGenerating}
                  >
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Generate Outline
                  </Button>
                  <Button
                    variant="default"
                    onClick={generateFullChapter}
                    disabled={!title || isGenerating}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Generate Full Chapter
                  </Button>
                </div>
              )}

              {(generatedOutline || generatedContent) && (
                <Tabs defaultValue={previewMode} onValueChange={(v) => setPreviewMode(v as any)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="outline" disabled={!generatedOutline}>Outline</TabsTrigger>
                    <TabsTrigger value="full" disabled={!generatedContent}>Full Content</TabsTrigger>
                  </TabsList>
                  <TabsContent value="outline">
                    {generatedOutline ? (
                      <Card>
                        <CardContent className="pt-4">
                          <h3 className="font-semibold mb-2">Chapter Outline</h3>
                          <div className="whitespace-pre-wrap text-sm">
                            {generatedOutline}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="pt-4 text-center text-muted-foreground">
                          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                          <p>No outline generated yet. Click "Generate Outline" to create one.</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="full">
                    {generatedContent ? (
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{title}</h3>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="max-h-[400px] overflow-y-auto whitespace-pre-wrap text-sm border p-4 rounded-md">
                            {generatedContent}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="pt-4 text-center text-muted-foreground">
                          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                          <p>No content generated yet. Click "Generate Full Chapter" to create one.</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              )}

              {(generatedOutline || generatedContent) && !isGenerating && (
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setGeneratedOutline(null);
                      setGeneratedContent(null);
                      setGenerationProgress(0);
                    }}
                  >
                    Reset Generation
                  </Button>
                  <div className="space-x-2">
                    <Button
                      variant="secondary"
                      onClick={generatedContent ? generateFullChapter : generateOutline}
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                    {!generatedContent && (
                      <Button
                        variant="default"
                        onClick={generateFullChapter}
                        disabled={isGenerating}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Generate Full
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            {generatedContent ? (
              <Button onClick={addGeneratedChapter} disabled={isGenerating}>
                Add Generated Chapter
              </Button>
            ) : (
              <Button onClick={handleAddChapter} disabled={!title || isGenerating}>
                Add Empty Chapter
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddChapterDialog;
