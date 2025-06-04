
export type PromptType = 'enhance' | 'rewrite' | 'expand' | 'summarize' | 'custom';

export interface AIEditOptions {
  promptType: PromptType;
  customPrompt: string;
}

export interface ContentAnalysis {
  sentiment: { score: number; mood: string };
  characters: string[];
  wordCount: number;
  readingTime: number;
}

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
