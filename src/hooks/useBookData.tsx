
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getBook, updateBook } from '@/lib/api';
import { generateBookContent } from '@/lib/api/contentService';
import { generateBookChapterWithContext } from '@/lib/api/extendedContentService';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'inProgress' | 'completed';
  description?: string;
}

export const useBookData = (bookId: string | undefined) => {
  const queryClient = useQueryClient();
  const [book, setBook] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingContent, setGeneratingContent] = useState<string | null>(null);

  // Fetch book data
  useEffect(() => {
    if (bookId) {
      fetchBookData(bookId);
    }
  }, [bookId]);

  const fetchBookData = async (id: string) => {
    setLoading(true);
    try {
      const bookData = await getBook(id);
      setBook(bookData);
      
      // Ensure the tasks from the API match our Task interface
      if (bookData.tasks) {
        const typedTasks = bookData.tasks.map((task: any) => ({
          ...task,
          status: task.status as 'pending' | 'inProgress' | 'completed'
        }));
        setTasks(typedTasks);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load book');
      toast.error(err.message || 'Failed to load book');
    } finally {
      setLoading(false);
    }
  };

  // Update book mutation
  const updateBookMutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
      toast.success('Book updated successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to update book: ${error.message || 'Unknown error'}`);
    },
  });

  // Generate content for a task
  const handleGenerateContent = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !book) return;
    
    setGeneratingContent(taskId);
    
    try {
      // Mark task as in progress
      const updatedTasks = tasks.map(t => 
        t.id === taskId ? { ...t, status: 'inProgress' as const } : t
      );
      setTasks(updatedTasks);
      updateBookWithTasks(updatedTasks);
      
      let generatedContent = '';
      
      // For chapters, use context-aware generation if it's a chapter
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
        // For other content types, use the standard generation
        generatedContent = await generateBookContent(
          book,
          task.type as any,
          task.title,
          task.description
        );
      }
      
      // Update the book content based on task type
      const updatedBook = { ...book };
      
      if (task.type === 'cover') {
        updatedBook.coverPage = generatedContent;
      } else if (task.type === 'chapter') {
        // Find matching chapter or create a new one
        const chapterIndex = updatedBook.chapters?.findIndex(
          (ch: any) => ch.title === task.title
        );
        
        if (chapterIndex >= 0) {
          updatedBook.chapters[chapterIndex].content = generatedContent;
        } else {
          if (!updatedBook.chapters) {
            updatedBook.chapters = [];
          }
          updatedBook.chapters.push({
            id: uuidv4(),
            title: task.title,
            content: generatedContent,
            order: updatedBook.chapters.length
          });
        }
      } else if (task.type === 'credits') {
        updatedBook.creditsPage = generatedContent;
      } else if (task.type === 'characters') {
        updatedBook.characterList = generatedContent;
      }
      
      // Mark task as completed
      const finalTasks = updatedTasks.map(t => 
        t.id === taskId ? { ...t, status: 'completed' as const } : t
      );
      
      // Update book and tasks
      setBook(updatedBook);
      setTasks(finalTasks);
      updateBookMutation.mutate({ ...updatedBook, id: bookId, tasks: finalTasks });
      
      toast.success(`Generated content for ${task.title}`);
    } catch (err: any) {
      console.error("Content generation error:", err);
      toast.error(`Failed to generate content: ${err.message || 'Unknown error'}`);
      
      // Revert task to pending on error
      const revertedTasks = tasks.map(t => 
        t.id === taskId ? { ...t, status: 'pending' as const } : t
      );
      setTasks(revertedTasks);
      updateBookWithTasks(revertedTasks);
    } finally {
      setGeneratingContent(null);
    }
  };

  // Mark task as complete
  const handleMarkAsComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' as const } : task
    );
    setTasks(updatedTasks);
    updateBookWithTasks(updatedTasks);
  };

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    updateBookWithTasks(updatedTasks);
  };

  // Add new chapter
  const handleAddChapter = (newChapter: Task) => {
    const updatedTasks = [...tasks, newChapter];
    setTasks(updatedTasks);
    updateBookWithTasks(updatedTasks);
  };

  // Update book with tasks
  const updateBookWithTasks = (updatedTasks: Task[]) => {
    if (bookId && book) {
      updateBookMutation.mutate({ ...book, id: bookId, tasks: updatedTasks });
    }
  };
  
  // Save book content
  const handleSaveBookContent = (updatedBook: any) => {
    setBook(updatedBook);
    // Update the backend with the book changes
    if (bookId) {
      updateBookMutation.mutate({ ...updatedBook, id: bookId, tasks });
    }
  };

  return {
    book,
    tasks,
    loading,
    error,
    generatingContent,
    handleGenerateContent,
    handleMarkAsComplete,
    handleDeleteTask,
    handleAddChapter,
    handleSaveBookContent
  };
};
