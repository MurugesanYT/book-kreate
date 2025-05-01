
import { useState } from 'react';
import { toast } from 'sonner';
import { generateBookChapterWithContext } from '@/lib/api/extendedContentService';

export type PromptType = 'enhance' | 'rewrite' | 'expand' | 'summarize' | 'custom';

export interface AIEditOptions {
  promptType: PromptType;
  customPrompt: string;
}

export const promptOptions = [
  { value: 'enhance' as const, label: 'Enhance this chapter' },
  { value: 'rewrite' as const, label: 'Rewrite this chapter' },
  { value: 'expand' as const, label: 'Expand this chapter' },
  { value: 'summarize' as const, label: 'Summarize this chapter' },
  { value: 'custom' as const, label: 'Custom instruction' }
];

export const getPromptForType = (promptType: PromptType, customPrompt: string): string => {
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

export interface UseAIChapterEditProps {
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
}

export const useAIChapterEdit = ({ chapter, allChapters, book }: UseAIChapterEditProps) => {
  const [promptType, setPromptType] = useState<PromptType>('enhance');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  
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
      
      // Generate content using existing service
      const content = await generateBookChapterWithContext(
        book,
        chapter.title,
        contextPrompt,
        previousChapters
      );
      
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
    handleGenerateContent
  };
};
