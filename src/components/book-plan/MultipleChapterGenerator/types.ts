
export interface MultipleChapterGeneratorProps {
  book: any;
  onAddChapters: (chapters: any[]) => void;
}

export interface GenerationConfig {
  numberOfChapters: number;
  chapterLength: 'short' | 'medium' | 'long';
  customPrompt: string;
  generationStyle: 'sequential' | 'thematic' | 'character-focused';
}

export interface GenerationProgress {
  isGenerating: boolean;
  progress: number;
  currentChapter: number;
  totalChapters: number;
}
