
import { useState } from 'react';
import { toast } from 'sonner';
import { PromptType, ContentAnalysis, UseAIChapterEditProps } from './types';
import { getPromptForType } from './constants';
import { analyzeContent } from './contentAnalysis';
import { simulateAIGeneration } from './contentGeneration';

export const useAIChapterEdit = ({ chapter, allChapters, book }: UseAIChapterEditProps) => {
  const [promptType, setPromptType] = useState<PromptType>('enhance');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentAnalysis, setContentAnalysis] = useState<ContentAnalysis | null>(null);
  
  const analyzeAndSetContent = (content: string) => {
    const analysis = analyzeContent(content);
    setContentAnalysis(analysis);
    return analysis;
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
      const prompt = getPromptForType(promptType, customPrompt);
      
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
      
      const content = simulateAIGeneration(chapter, promptType, customPrompt);
      
      // Analyze the generated content
      analyzeAndSetContent(content);
      
      setGeneratedContent(content);
      toast.success('Content generated successfully!');
      return content;
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please try again.');
      return '';
    } finally {
      setIsGenerating(false);
    }
  };
  
  return {
    promptType,
    setPromptType,
    customPrompt,
    setCustomPrompt,
    isGenerating,
    generatedContent,
    setGeneratedContent,
    contentAnalysis,
    analyzeContent: analyzeAndSetContent,
    handleGenerateContent
  };
};

// Re-export types and constants for backward compatibility
export * from './types';
export * from './constants';
export * from './contentAnalysis';
export * from './contentGeneration';
