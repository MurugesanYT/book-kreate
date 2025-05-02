
import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AIPromptSelector from './AIPromptSelector';
import AIEditPreview from './AIEditPreview';
import { PromptType } from '@/hooks/useAIChapterEdit';

interface AIEditorContentProps {
  chapter: {
    id: string;
    title: string;
    content: string;
  };
  promptType: PromptType;
  setPromptType: (type: PromptType) => void;
  customPrompt: string;
  setCustomPrompt: (prompt: string) => void;
  isGenerating: boolean;
  generatedContent: string;
  setGeneratedContent: (content: string) => void;
  handleGenerateContent: () => void;
  handleSaveContent: () => void;
}

const AIEditorContent: React.FC<AIEditorContentProps> = ({
  chapter,
  promptType,
  setPromptType,
  customPrompt,
  setCustomPrompt,
  isGenerating,
  generatedContent,
  setGeneratedContent,
  handleGenerateContent,
  handleSaveContent
}) => {
  const [editorTab, setEditorTab] = useState<'edit' | 'compare'>('edit');
  
  return (
    <>
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
    </>
  );
};

export default AIEditorContent;
