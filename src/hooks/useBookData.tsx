
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getBook, updateBook } from '@/lib/api';
import { canAddChapter } from '@/lib/api/planService';
import { v4 as uuidv4 } from 'uuid';
import { Task, markTaskAsComplete, deleteTask, updateBookWithTasks } from './taskUtils';
import { saveBookContent } from './bookContentUtils';
import { useContentGeneration } from './useContentGeneration';

export const useBookData = (bookId: string | undefined) => {
  const queryClient = useQueryClient();
  const [book, setBook] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { generatingContent, generateContent } = useContentGeneration();

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
      
      // Sanitize dates if they exist
      if (bookData && bookData.createdAt && typeof bookData.createdAt === 'string') {
        const date = new Date(bookData.createdAt);
        if (isNaN(date.getTime())) {
          // If date is invalid, use current date instead
          bookData.createdAt = new Date().toISOString();
        }
      }
      
      if (bookData && bookData.updatedAt && typeof bookData.updatedAt === 'string') {
        const date = new Date(bookData.updatedAt);
        if (isNaN(date.getTime())) {
          // If date is invalid, use current date instead
          bookData.updatedAt = new Date().toISOString();
        }
      }
      
      setBook(bookData);
      
      // Ensure the tasks from the API match our Task interface
      if (bookData.tasks) {
        const typedTasks = (Array.isArray(bookData.tasks) ? bookData.tasks : []).map((task: any) => {
          // Sanitize task dates if they exist
          if (task.createdAt && typeof task.createdAt === 'string') {
            const date = new Date(task.createdAt);
            if (isNaN(date.getTime())) {
              task.createdAt = new Date().toISOString();
            }
          }
          
          return {
            ...task,
            status: task.status as 'pending' | 'inProgress' | 'completed'
          };
        });
        setTasks(typedTasks);
      } else {
        setTasks([]);
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
    await generateContent(
      taskId,
      book,
      tasks,
      (updatedTasks) => {
        setTasks(updatedTasks);
        updateBookWithTasks(book, bookId, updatedTasks);
      },
      (updatedBook) => {
        setBook(updatedBook);
        updateBookMutation.mutate({ ...updatedBook, id: bookId, tasks });
      }
    );
  };

  // Mark task as complete
  const handleMarkAsComplete = (taskId: string) => {
    const updatedTasks = markTaskAsComplete(tasks, taskId);
    setTasks(updatedTasks);
    updateBookWithTasks(book, bookId, updatedTasks);
  };

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = deleteTask(tasks, taskId);
    setTasks(updatedTasks);
    updateBookWithTasks(book, bookId, updatedTasks);
  };

  // Add new chapter
  const handleAddChapter = (newChapter: Task) => {
    // Check if user can add a chapter based on their plan
    if (!book || !canAddChapter(book)) {
      return;
    }
    
    const updatedTasks = [...tasks, newChapter];
    setTasks(updatedTasks);
    updateBookWithTasks(book, bookId, updatedTasks);
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
