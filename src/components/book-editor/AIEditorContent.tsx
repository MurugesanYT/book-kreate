
import React, { useState, useEffect } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AIPromptSelector from './AIPromptSelector';
import AIEditPreview from './AIEditPreview';
import { PromptType, analyzeSentiment, extractCharacters } from '@/hooks/useAIChapterEdit';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

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
  contentAnalysis?: {
    sentiment: { score: number; mood: string };
    characters: string[];
    wordCount: number;
    readingTime: number;
  } | null;
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
  handleSaveContent,
  contentAnalysis: providedAnalysis
}) => {
  const [editorTab, setEditorTab] = useState<'edit' | 'compare'>('edit');
  const [contentAnalysis, setContentAnalysis] = useState(providedAnalysis || null);
  
  // Generate analysis if not provided and content changes
  useEffect(() => {
    if (generatedContent && !providedAnalysis) {
      const sentiment = analyzeSentiment(generatedContent);
      const characters = extractCharacters(generatedContent);
      const words = generatedContent.split(/\s+/).length;
      const readingTime = Math.ceil(words / 200); // Average reading time in minutes
      
      setContentAnalysis({
        sentiment,
        characters,
        wordCount: words,
        readingTime
      });
    } else if (providedAnalysis) {
      setContentAnalysis(providedAnalysis);
    }
  }, [generatedContent, providedAnalysis]);
  
  const getSentimentColor = (score: number) => {
    if (score > 50) return 'bg-green-500 hover:bg-green-500';
    if (score > 20) return 'bg-green-400 hover:bg-green-400';
    if (score > 0) return 'bg-green-300 hover:bg-green-300';
    if (score === 0) return 'bg-gray-400 hover:bg-gray-400';
    if (score > -20) return 'bg-amber-300 hover:bg-amber-300';
    if (score > -50) return 'bg-amber-400 hover:bg-amber-400';
    return 'bg-amber-500 hover:bg-amber-500';
  };
  
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
        
        {generatedContent && contentAnalysis && (
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <CardTitle className="text-sm font-medium mr-3">Content Analysis:</CardTitle>
                
                <Badge variant="outline" className="bg-blue-50">
                  {contentAnalysis.wordCount} words
                </Badge>
                
                <Badge variant="outline" className="bg-blue-50">
                  ~{contentAnalysis.readingTime} min read
                </Badge>
                
                <Badge className={getSentimentColor(contentAnalysis.sentiment.score)}>
                  {contentAnalysis.sentiment.mood}
                </Badge>
              </div>
              
              {contentAnalysis.characters.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm font-medium">Characters mentioned: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {contentAnalysis.characters.map((character, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-50">
                        {character}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>  
        )}
        
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
