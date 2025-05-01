
import { useState } from 'react';
import { toast } from 'sonner';
import { generateBookContent } from '@/lib/api/contentService';
import { generateBookChapterWithContext } from '@/lib/api/extendedContentService';
import { Task, markTaskAsComplete, findTaskById } from './taskUtils';
import { updateBookWithGeneratedContent } from './bookContentUtils';

export const useContentGeneration = () => {
  const [generatingContent, setGeneratingContent] = useState<string | null>(null);

  /**
   * Generate content for a specific task
   */
  const generateContent = async (
    taskId: string,
    book: any,
    tasks: Task[],
    onTasksUpdate: (updatedTasks: Task[]) => void,
    onBookUpdate: (updatedBook: any) => void
  ) => {
    const task = findTaskById(tasks, taskId);
    if (!task || !book) return false;
    
    setGeneratingContent(taskId);
    
    try {
      // Mark task as in progress
      const updatedTasks = tasks.map(t => 
        t.id === taskId ? { ...t, status: 'inProgress' as const } : t
      );
      onTasksUpdate(updatedTasks);
      
      let generatedContent = '';
      
      // For chapters, use context-aware generation
      if (task.type === 'chapter') {
        // Get previous chapters for context
        const previousChapters = book.chapters && book.chapters.length > 0
          ? book.chapters.map((ch: any) => ({
              title: ch.title,
              content: ch.content || ''
            }))
          : [];
        
        generatedContent = await generateBookChapterWithContext(
          book,
          task.title,
          task.description,
          previousChapters
        );
      } else {
        // For other content types, use standard generation
        generatedContent = await generateBookContent(
          book,
          task.type as any,
          task.title,
          task.description
        );
      }
      
      // Update the book content based on task type
      const updatedBook = updateBookWithGeneratedContent(book, task, generatedContent);
      
      // Mark task as completed
      const finalTasks = updatedTasks.map(t => 
        t.id === taskId ? { ...t, status: 'completed' as const } : t
      );
      
      // Update book and tasks
      onBookUpdate(updatedBook);
      onTasksUpdate(finalTasks);
      
      toast.success(`Generated content for ${task.title}`);
      return true;
    } catch (err: any) {
      console.error("Content generation error:", err);
      toast.error(`Failed to generate content: ${err.message || 'Unknown error'}`);
      
      // Revert task to pending on error
      const revertedTasks = tasks.map(t => 
        t.id === taskId ? { ...t, status: 'pending' as const } : t
      );
      onTasksUpdate(revertedTasks);
      return false;
    } finally {
      setGeneratingContent(null);
    }
  };

  return {
    generatingContent,
    generateContent
  };
};
