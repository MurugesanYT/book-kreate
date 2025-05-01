
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wand } from 'lucide-react';
import { toast } from 'sonner';
import { generateBookChapterWithContext } from '@/lib/api/extendedContentService';

interface AIChapterEditorProps {
  bookId: string;
  chapter: {
    id: string;
    title: string;
    content: string;
  };
  allChapters: {
    id: string;
    title: string;
    content: string;
  }[];
  book: any;
  onSave: (chapterId: string, updatedContent: string) => void;
}

const AIChapterEditor: React.FC<AIChapterEditorProps> = ({ 
  bookId, 
  chapter, 
  allChapters, 
  book,
  onSave 
}) => {
  const [open, setOpen] = useState(false);
  const [promptType, setPromptType] = useState<'enhance' | 'rewrite' | 'custom'>('enhance');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  
  const promptOptions = [
    { value: 'enhance', label: 'Enhance this chapter' },
    { value: 'rewrite', label: 'Rewrite this chapter' },
    { value: 'custom', label: 'Custom instruction' }
  ];
  
  const getPromptForType = () => {
    switch (promptType) {
      case 'enhance':
        return `Enhance this chapter by improving the language, adding more descriptive details, and making it more engaging without changing the main plot points.`;
      case 'rewrite':
        return `Rewrite this chapter to make it more engaging while keeping the same key events and character development.`;
      case 'custom':
        return customPrompt;
      default:
        return '';
    }
  };
  
  const handleGenerateContent = async () => {
    try {
      setIsGenerating(true);
      toast.loading('Generating content with AI...');
      
      // Get previous chapters for context
      const previousChapters = allChapters
        .filter(ch => ch.id !== chapter.id)
        .map(ch => ({
          title: ch.title,
          content: ch.content || ''
        }));
      
      // Get the user's prompt
      const prompt = getPromptForType();
      
      // Generate content using existing service
      const content = await generateBookChapterWithContext(
        book,
        chapter.title,
        prompt,
        previousChapters
      );
      
      setGeneratedContent(content);
      toast.success('Content generated successfully!');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSaveContent = () => {
    if (!generatedContent.trim()) {
      toast.error('No content to save.');
      return;
    }
    
    onSave(chapter.id, generatedContent);
    toast.success('Chapter updated successfully!');
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mr-2">
          <Wand className="h-4 w-4 mr-2" />
          Edit with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Chapter Editor - {chapter.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="space-y-4">
            <div>
              <Label>Edit Type</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {promptOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={promptType === option.value ? "default" : "outline"}
                    onClick={() => setPromptType(option.value as any)}
                    className="justify-start"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {promptType === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="customPrompt">Custom Instruction</Label>
                <Textarea
                  id="customPrompt"
                  placeholder="Provide clear instructions for the AI about how to edit this chapter..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}
            
            <div className="flex justify-center">
              <Button 
                onClick={handleGenerateContent}
                disabled={isGenerating || (promptType === 'custom' && !customPrompt.trim())}
              >
                <Wand className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </Button>
            </div>
          </div>
          
          {generatedContent && (
            <div className="space-y-2">
              <Label>Generated Content</Label>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[300px] font-mono"
              />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveContent}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIChapterEditor;
