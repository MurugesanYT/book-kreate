
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

// Added new utility function to analyze chapter sentiment
export const analyzeSentiment = (content: string): { score: number; mood: string } => {
  if (!content) return { score: 0, mood: 'neutral' };
  
  const positiveWords = ['happy', 'joy', 'love', 'triumph', 'success', 'good', 'excellent', 'wonderful', 'beautiful', 'great', 'fantastic', 'amazing', 'pleasure', 'delight'];
  const negativeWords = ['sad', 'anger', 'hate', 'despair', 'failure', 'bad', 'terrible', 'awful', 'horrible', 'dreadful', 'miserable', 'gloomy', 'painful', 'tragic'];
  
  const lowerContent = content.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerContent.match(regex);
    if (matches) positiveScore += matches.length;
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerContent.match(regex);
    if (matches) negativeScore += matches.length;
  });
  
  const sentimentScore = Math.min(Math.max(((positiveScore - negativeScore) / Math.max(positiveScore + negativeScore, 1)) * 100, -100), 100);
  
  let mood = 'neutral';
  if (sentimentScore > 50) mood = 'very positive';
  else if (sentimentScore > 20) mood = 'positive';
  else if (sentimentScore > 0) mood = 'slightly positive';
  else if (sentimentScore === 0) mood = 'neutral';
  else if (sentimentScore > -20) mood = 'slightly negative';
  else if (sentimentScore > -50) mood = 'negative';
  else mood = 'very negative';
  
  return { score: Math.round(sentimentScore), mood };
};

// Added new utility to extract characters
export const extractCharacters = (content: string): string[] => {
  if (!content) return [];
  
  // Common name patterns
  const nameRegex = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g;
  const potentialNames = content.match(nameRegex) || [];
  
  // Filter out common words that might be capitalized but aren't names
  const commonWords = ['The', 'A', 'An', 'This', 'That', 'These', 'Those', 'I', 'You', 'He', 'She', 'They', 'We', 'It', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Count occurrences of each name and filter out those with less than 2 occurrences
  const nameCounts: Record<string, number> = {};
  potentialNames.forEach(name => {
    if (!commonWords.includes(name)) {
      nameCounts[name] = (nameCounts[name] || 0) + 1;
    }
  });
  
  // Return names that occur at least twice
  return Object.entries(nameCounts)
    .filter(([_, count]) => count >= 2)
    .map(([name]) => name)
    .slice(0, 10); // Limit to top 10 most mentioned names
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
  const [contentAnalysis, setContentAnalysis] = useState<{
    sentiment: { score: number; mood: string };
    characters: string[];
    wordCount: number;
    readingTime: number;
  } | null>(null);
  
  const analyzeContent = (content: string) => {
    const sentiment = analyzeSentiment(content);
    const characters = extractCharacters(content);
    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200); // Average reading time in minutes (200 wpm)
    
    setContentAnalysis({
      sentiment,
      characters,
      wordCount: words,
      readingTime
    });
    
    return { sentiment, characters, wordCount: words, readingTime };
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
      
      // Simulate AI response - in a real app, this would call the AI API
      const simulateAIGeneration = () => {
        const originalLines = chapter.content.split('\n');
        let content = '';
        
        if (promptType === 'enhance') {
          // Enhance by adding more descriptive language
          content = originalLines.map(line => {
            if (line.trim().length < 10) return line;
            
            // Add more adjectives and details
            const enhancedLine = line
              .replace(/walked/g, 'strode confidently')
              .replace(/looked/g, 'gazed intently')
              .replace(/said/g, 'expressed')
              .replace(/house/g, 'spacious residence')
              .replace(/car/g, 'sleek vehicle')
              .replace(/night/g, 'moonlit evening')
              .replace(/morning/g, 'golden dawn');
              
            return enhancedLine.length > line.length ? enhancedLine : line + ' The atmosphere was charged with anticipation.';
          }).join('\n');
        } 
        else if (promptType === 'rewrite') {
          // Completely rewrite but keep the general structure
          content = 'The morning light filtered through the curtains as the world outside began to stir. ' + 
            originalLines.join(' ').replace(/\./g, '.\n\n') + 
            '\n\nThe events of the day had changed everything, and nothing would ever be the same again.';
        }
        else if (promptType === 'expand') {
          // Expand with more details and dialogue
          content = originalLines.map(line => {
            if (line.trim().length < 10) return line;
            
            // Add dialogue and inner thoughts
            if (Math.random() > 0.7) {
              return line + '\n\n"I never thought it would come to this," they whispered, voice barely audible over the sound of their racing heart. "But here we are."\n\n';
            }
            
            // Add descriptive expansions
            return line + '\n' + (
              Math.random() > 0.5 
                ? 'The weight of the moment hung in the air, a tangible presence that seemed to slow time itself.'
                : 'Memories flooded back, unbidden and raw, painting the present with echoes of the past.'
            );
          }).join('\n');
        }
        else if (promptType === 'summarize') {
          // Create a shorter version
          const words = originalLines.join(' ').split(' ');
          const summarizedWords = words.filter((_, index) => index % 3 === 0 || index % 3 === 1);
          content = summarizedWords.join(' ').replace(/\. /g, '.\n\n');
        }
        else if (promptType === 'custom') {
          // For custom prompts, modify based on keywords in the prompt
          if (customPrompt.includes('dialogue')) {
            content = originalLines.join('\n') + "\n\n\"What do you think will happen now?\" she asked, breaking the silence.\n\n\"I wish I knew,\" he replied, his voice barely above a whisper. \"But whatever comes next, we'll face it together.\"\n\n\"Promise?\"\n\n\"Promise.\"";
          } else if (customPrompt.includes('setting')) {
            content = 'The landscape stretched before them, a tapestry of colors and textures that seemed to breathe with a life of its own. Mountains rose in the distance, their peaks lost in a crown of clouds, while closer at hand, the valley spread out like a lush green carpet dotted with wildflowers.\n\n' + originalLines.join('\n');
          } else {
            // Generic enhancement
            content = originalLines.join('\n') + '\n\nThe story continued, each moment building upon the last, weaving a narrative that would be remembered long after the final page was turned.';
          }
        } else {
          // Default fallback
          content = chapter.content;
        }
        
        return content;
      };
      
      const content = simulateAIGeneration();
      
      // Analyze the generated content
      analyzeContent(content);
      
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
    analyzeContent,
    handleGenerateContent
  };
};
