
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Wand, BookOpen, FileText, BookUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

interface AddChapterDialogProps {
  onAddChapter: (chapter: any) => void;
  book: any;
}

const AddChapterDialog: React.FC<AddChapterDialogProps> = ({ onAddChapter, book }) => {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<'manual' | 'ai' | 'template'>('manual');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [generationPrompt, setGenerationPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatingPreview, setGeneratingPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('character-intro');

  const chapterTemplates = [
    { id: 'character-intro', name: 'Character Introduction', 
      description: 'Introduce a new character to the story' },
    { id: 'action-scene', name: 'Action Scene', 
      description: 'Write a dynamic action scene with tension and excitement' },
    { id: 'plot-twist', name: 'Plot Twist', 
      description: 'Create a surprising turn of events that changes the direction of the story' },
    { id: 'emotional-moment', name: 'Emotional Moment', 
      description: 'Craft a scene with emotional depth and character development' },
    { id: 'world-building', name: 'World Building', 
      description: 'Develop the setting and environment of your story world' },
  ];

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setGenerationPrompt('');
    setMethod('manual');
    setIsSubmitting(false);
    setPreviewContent(null);
    setGeneratingPreview(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // For manual chapter creation
      if (method === 'manual') {
        if (!title.trim()) {
          toast.error('Please enter a chapter title');
          setIsSubmitting(false);
          return;
        }
        
        // Create a chapter task
        const newTask = {
          id: uuidv4(),
          title: title.trim(),
          description: description.trim(),
          type: 'chapter',
          status: 'pending'
        };
        
        onAddChapter(newTask);
        toast.success('Chapter added successfully');
        setOpen(false);
        resetForm();
      } 
      // For AI-generated chapters
      else if (method === 'ai') {
        // Create a chapter task with either the specified title or AI-generated title prompt
        const effectiveTitle = title.trim() || `Generated Chapter ${(book?.chapters?.length || 0) + 1}`;
        const effectiveDescription = description.trim() || generationPrompt.trim();
        
        if (!effectiveDescription) {
          toast.error('Please provide either a description or generation prompt');
          setIsSubmitting(false);
          return;
        }
        
        // If we have preview content, use it in the description for better AI generation
        const finalDescription = previewContent 
          ? `${effectiveDescription}\n\nPreview content: ${previewContent}`
          : effectiveDescription;
        
        const newTask = {
          id: uuidv4(),
          title: effectiveTitle,
          description: finalDescription,
          type: 'chapter',
          status: 'pending',
          aiGenerated: true
        };
        
        onAddChapter(newTask);
        toast.success('Chapter task added and ready for generation');
        setOpen(false);
        resetForm();
      } else if (method === 'template') {
        // Get the selected template
        const template = chapterTemplates.find(t => t.id === selectedTemplate);
        if (!template) {
          toast.error('Please select a valid template');
          setIsSubmitting(false);
          return;
        }
        
        const effectiveTitle = title.trim() || template.name;
        const effectiveDescription = description.trim() || 
          `${template.description}. ${generationPrompt.trim()}`;
        
        const newTask = {
          id: uuidv4(),
          title: effectiveTitle,
          description: effectiveDescription,
          type: 'chapter',
          status: 'pending',
          aiGenerated: true,
          template: selectedTemplate
        };
        
        onAddChapter(newTask);
        toast.success(`Chapter template "${template.name}" added and ready for generation`);
        setOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error adding chapter:', error);
      toast.error('Failed to add chapter. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleGeneratePreview = async () => {
    if (!generationPrompt.trim()) {
      toast.error('Please provide a generation prompt');
      return;
    }

    setGeneratingPreview(true);
    
    try {
      // Mock AI preview generation - in a real app this would call your AI service
      // This would use your existing generateBookChapterWithContext function
      setTimeout(() => {
        const mockPreview = `Sample preview for "${title || 'New Chapter'}":\n\n` +
          `This chapter will explore ${generationPrompt.trim().substring(0, 100)}...\n\n` +
          `The content will be generated based on the book's existing context and your prompt.`;
        
        setPreviewContent(mockPreview);
        toast.success('Preview generated!');
        setGeneratingPreview(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error generating preview:', error);
      toast.error('Failed to generate preview');
      setGeneratingPreview(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Chapter</DialogTitle>
          <DialogDescription>
            Create a new chapter manually or let AI help you generate content
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={method} onValueChange={(v) => setMethod(v as 'manual' | 'ai' | 'template')}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual">
              <FileText className="h-4 w-4 mr-2" />
              Manual Create
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Wand className="h-4 w-4 mr-2" />
              AI Generate
            </TabsTrigger>
            <TabsTrigger value="template">
              <BookOpen className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="manual" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Chapter Title</Label>
                <Input 
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter chapter title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Chapter Description (optional)</Label>
                <Textarea 
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the chapter"
                  className="min-h-24"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="ai-title">Chapter Title (optional)</Label>
                <Input 
                  id="ai-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title or leave blank for AI to name"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to use a placeholder title that you can change later.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Generation Prompt</Label>
                <Textarea 
                  id="ai-prompt"
                  value={generationPrompt}
                  onChange={(e) => setGenerationPrompt(e.target.value)}
                  placeholder="What should this chapter be about?"
                  className="min-h-24"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Describe what should happen in this chapter, key events, or characters involved.
                </p>
              </div>

              {!previewContent && (
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGeneratePreview}
                    disabled={generatingPreview || !generationPrompt.trim()}
                  >
                    {generatingPreview ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Generating Preview...
                      </>
                    ) : (
                      <>
                        <Wand className="h-4 w-4 mr-2" />
                        Generate Preview
                      </>
                    )}
                  </Button>
                </div>
              )}

              {generatingPreview && (
                <div className="space-y-2 py-4">
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-center text-gray-500">
                    Analyzing book context and generating preview...
                  </p>
                </div>
              )}

              {previewContent && (
                <div className="space-y-2 border rounded-md p-4 bg-slate-50">
                  <Label>Preview</Label>
                  <div className="whitespace-pre-wrap text-sm">
                    {previewContent}
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setPreviewContent(null);
                        setGeneratingPreview(false);
                      }}
                    >
                      Regenerate
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="template" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="template-title">Chapter Title (optional)</Label>
                <Input 
                  id="template-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title or use template name"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Select Template</Label>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2">
                  {chapterTemplates.map((template) => (
                    <div 
                      key={template.id}
                      className={`border rounded-md p-3 cursor-pointer transition-colors ${
                        selectedTemplate === template.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-gray-500">{template.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="template-prompt">Additional Instructions (optional)</Label>
                <Textarea 
                  id="template-prompt"
                  value={generationPrompt}
                  onChange={(e) => setGenerationPrompt(e.target.value)}
                  placeholder="Any specific details to include in this template..."
                  className="min-h-20"
                />
              </div>
            </TabsContent>
            
            <DialogFooter className="mt-6">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" /> 
                    Adding...
                  </>
                ) : (
                  <>
                    <BookUp className="h-4 w-4 mr-2" />
                    Add Chapter
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddChapterDialog;
