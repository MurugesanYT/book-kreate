
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wand } from 'lucide-react';
import { toast } from 'sonner';
import AIPromptSelector from './AIPromptSelector';
import AIEditPreview from './AIEditPreview';
import { useAIChapterEdit, PromptType } from '@/hooks/useAIChapterEdit';

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
  const [editorTab, setEditorTab] = useState<'edit' | 'compare'>('edit');
  
  const {
    promptType,
    setPromptType,
    customPrompt,
    setCustomPrompt,
    isGenerating,
    generatedContent,
    setGeneratedContent,
    handleGenerateContent
  } = useAIChapterEdit({ chapter, allChapters, book });
  
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
          <AIPromptSelector
            promptType={promptType}
            onPromptTypeChange={setPromptType}
            customPrompt={customPrompt}
            onCustomPromptChange={setCustomPrompt}
            onGenerate={handleGenerateContent}
            isGenerating={isGenerating}
          />
          
          {generatedContent && (
            <AIEditPreview
              activeTab={editorTab}
              onTabChange={setEditorTab}
              generatedContent={generatedContent}
              onGeneratedContentChange={setGeneratedContent}
              originalContent={chapter.content}
              onSave={handleSaveContent}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIChapterEditor;
