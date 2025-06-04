
import { PromptType } from './types';

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
