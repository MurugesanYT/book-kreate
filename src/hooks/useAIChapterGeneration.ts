
import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { canAddChapter, getUserPlan } from '@/lib/api/planService';

export type GenerationMode = 'full-auto' | 'guided' | 'from-prompt';

export interface GenerationOptions {
  respectTone: boolean;
  respectStyle: boolean;
  useBookContext: boolean;
  chapterLength: 'short' | 'medium' | 'long';
  chapterPurpose: string;
  promptGuidance: string;
}

export const useAIChapterGeneration = (book: any, onAddChapter: (chapter: any) => void) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMode, setGenerationMode] = useState<GenerationMode>('full-auto');
  const [options, setOptions] = useState<GenerationOptions>({
    respectTone: true,
    respectStyle: true,
    useBookContext: true,
    chapterLength: 'medium',
    chapterPurpose: 'progress-story',
    promptGuidance: '',
  });

  const userPlan = getUserPlan();
  const totalChapters = book.chapters?.length || 0;

  const generateSimpleTitle = () => {
    const firstWords = ["Awakening", "Journey", "Discovery", "Mystery", "Secret", "Return", "Shadows", "Encounter", "Revelation", "Dark", "Light", "Beginning", "End"];
    const secondWords = ["Dawn", "Night", "Truth", "Path", "Hope", "Despair", "Future", "Past", "Destiny", "Fate", "Plan", "Dream", "Nightmare"];
    
    return `${firstWords[Math.floor(Math.random() * firstWords.length)]} of ${secondWords[Math.floor(Math.random() * secondWords.length)]}`;
  };

  const generateSimpleContent = () => {
    return `
The morning sun cast long shadows through the windows as Alex stared at the empty page in front of them. It had been three days since the incident, and the words still wouldn't come. How could they describe what had happened when they barely understood it themselves?

A notification pinged on their phone. Another message from Sam, probably asking for an update on the manuscript. Alex ignored it. What could they possibly say? "Sorry, can't write because I may have discovered something impossible"? That wouldn't go over well.

The coffee had gone cold hours ago, but Alex took a sip anyway, grimacing at the bitter taste. The apartment felt too quiet, too empty since everything had changed. They needed to clear their head, to make sense of what they'd seen.

Decision made, Alex grabbed their coat and headed for the door. The fresh air might help, and maybe, just maybe, they'd find the words they needed along the way. As they stepped outside, they couldn't shake the feeling that they were being watched, that whatever they had discovered was now hunting them.

The streets were busier than expected for this time of day. People hurried past, wrapped up in their own worlds, unaware of how fragile reality had become. Alex envied their ignorance. Three days ago, they would have been just like them – concerned with deadlines and dinner plans rather than questioning the very nature of existence.

The park was quieter, and Alex found a bench partially hidden by overgrown bushes. Perfect for someone who wanted to be alone with their thoughts. They pulled out the small notebook they always carried and began to write, not the manuscript that was due, but an account of what had happened. Perhaps by documenting it, they could make sense of it all.

Two hours later, the notebook was filled with frantic scribbles, diagrams, and questions without answers. But one thing was becoming clear – Alex couldn't keep this to themselves much longer. They needed help, someone who might believe them, someone who wouldn't immediately suggest psychiatric evaluation.

There was only one person they could think of, though reaching out would mean breaking a promise made long ago. As they dialed the number, Alex hoped it was the right choice. Because if what they'd discovered was true, everything was about to change.
    `;
  };

  const handleGenerateChapter = async () => {
    if (!canAddChapter(book)) {
      toast.error(`Your ${userPlan} plan limits the number of chapters. Please upgrade to add more.`);
      return false;
    }
    
    try {
      setIsGenerating(true);
      toast.loading('Generating chapter with AI...');
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      let chapterTitle = '';
      let chapterDescription = '';
      
      if (totalChapters === 0) {
        chapterTitle = `Chapter 1: The Beginning`;
      } else {
        chapterTitle = `Chapter ${totalChapters + 1}: ${generateSimpleTitle()}`;
      }
      
      if (generationMode === 'from-prompt' && options.promptGuidance.trim()) {
        chapterDescription = options.promptGuidance;
      } else {
        chapterDescription = `AI-generated chapter with ${options.chapterLength} length, focusing on ${options.chapterPurpose.replace('-', ' ')}.`;
      }
      
      const generatedContent = generateSimpleContent();
      
      const newChapter = {
        id: uuidv4(),
        title: chapterTitle,
        description: chapterDescription,
        type: 'chapter',
        status: 'completed',
        content: generatedContent,
      };
      
      onAddChapter(newChapter);
      toast.success(`Chapter "${chapterTitle}" generated successfully!`);
      
      return true;
    } catch (error) {
      console.error("Error generating chapter:", error);
      toast.error("Failed to generate chapter. Please try again.");
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuickGenerateChapter = async () => {
    if (!canAddChapter(book)) {
      toast.error(`Your ${userPlan} plan limits the number of chapters. Please upgrade to add more.`);
      return;
    }
    
    try {
      toast.loading('Generating chapter with AI...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let chapterTitle = '';
      if (totalChapters === 0) {
        chapterTitle = `Chapter 1: The Beginning`;
      } else {
        chapterTitle = `Chapter ${totalChapters + 1}: ${generateSimpleTitle()}`;
      }
      
      const chapterDescription = `AI-generated chapter that continues the story based on previous content.`;
      const generatedContent = generateSimpleContent();
      
      const newChapter = {
        id: uuidv4(),
        title: chapterTitle,
        description: chapterDescription,
        type: 'chapter',
        status: 'completed',
        content: generatedContent,
      };
      
      onAddChapter(newChapter);
      toast.success(`Chapter "${chapterTitle}" generated successfully!`);
    } catch (error) {
      console.error("Error generating quick chapter:", error);
      toast.error("Failed to generate chapter. Please try again.");
    }
  };

  return {
    isGenerating,
    generationMode,
    setGenerationMode,
    options,
    setOptions,
    userPlan,
    totalChapters,
    handleGenerateChapter,
    handleQuickGenerateChapter
  };
};
