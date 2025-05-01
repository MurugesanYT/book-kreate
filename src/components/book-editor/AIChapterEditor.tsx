
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wand } from 'lucide-react';
import { toast } from 'sonner';
import { generateBookChapterWithContext } from '@/lib/api/extendedContentService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [promptType, setPromptType] = useState<'enhance' | 'rewrite' | 'expand' | 'summarize' | 'custom'>('enhance');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [editorTab, setEditorTab] = useState<'edit' | 'compare'>('edit');
  const [promptTemplate, setPromptTemplate] = useState('');
  
  const promptOptions = [
    { value: 'enhance', label: 'Enhance this chapter' },
    { value: 'rewrite', label: 'Rewrite this chapter' },
    { value: 'expand', label: 'Expand this chapter' },
    { value: 'summarize', label: 'Summarize this chapter' },
    { value: 'custom', label: 'Custom instruction' }
  ];
  
  const getPromptForType = () => {
    switch (promptType) {
      case 'enhance':
        return `Enhance this chapter by improving the language, adding more descriptive details, and making it more engaging without changing the main plot points.`;
      case 'rewrite':
        return `Rewrite this chapter to make it more engaging while keeping the same key events and character development.`;
      case 'expand':
        return `Expand this chapter by adding more detail, dialogue, and description to make it richer and more immersive.`;
      case 'summarize':
        return `Summarize this chapter into a more concise version while keeping the key plot points and character development.`;
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
      
      // Get the current chapter index
      const currentChapterIndex = allChapters.findIndex(ch => ch.id === chapter.id);
      
      // Get the user's prompt
      const prompt = getPromptForType();
      
      // Prepare a more detailed context for the AI
      const contextPrompt = `
Book Title: ${book.title}
Book Genre: ${book.genre || 'Unknown'}
Book Description: ${book.description || 'N/A'}
Chapter Title: ${chapter.title}
Chapter Position: ${currentChapterIndex + 1} of ${allChapters.length}

${book.characterList ? `Character Information: ${book.characterList}` : ''}

Task: ${prompt}

Make sure to maintain the style, tone, and narrative voice consistent with the rest of the book. 
Consider the character development and plot progression that has happened so far.
      `;
      
      // Generate content using existing service
      const content = await generateBookChapterWithContext(
        book,
        chapter.title,
        contextPrompt,
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
              <div className="grid grid-cols-5 gap-1 mt-2">
                {promptOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={promptType === option.value ? "default" : "outline"}
                    onClick={() => setPromptType(option.value as any)}
                    className="justify-start text-xs py-1 h-auto"
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
              <Tabs value={editorTab} onValueChange={(value) => setEditorTab(value as 'edit' | 'compare')}>
                <TabsList>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="compare">Compare</TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit">
                  <Label>Generated Content</Label>
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-[300px] font-mono"
                  />
                </TabsContent>
                
                <TabsContent value="compare">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Original Content</Label>
                      <div className="border rounded-md p-4 min-h-[300px] overflow-y-auto bg-gray-50">
                        {chapter.content.split('\n').map((line, i) => (
                          <p key={i}>{line || <br />}</p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Generated Content</Label>
                      <div className="border rounded-md p-4 min-h-[300px] overflow-y-auto bg-gray-50">
                        {generatedContent.split('\n').map((line, i) => (
                          <p key={i}>{line || <br />}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
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
