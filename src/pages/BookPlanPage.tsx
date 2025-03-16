
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBook, updateBook, generateBookContent } from '@/lib/api';
import BookContentEditor from '@/components/BookContentEditor';
import { Loader2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'inProgress' | 'completed';
  description?: string;
}

const BookPlanPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [book, setBook] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingContent, setGeneratingContent] = useState<string | null>(null);

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
      
      // Generate content based on task type
      const generatedContent = await generateBookContent(
        book,
        task.type as any,
        task.title,
        task.description
      );
      
      // Update the book content based on task type
      const updatedBook = { ...book };
      
      if (task.type === 'cover') {
        updatedBook.coverPage = generatedContent;
      } else if (task.type === 'chapter') {
        // Find matching chapter or create a new one
        const chapterIndex = updatedBook.chapters.findIndex(
          (ch: any) => ch.title === task.title
        );
        
        if (chapterIndex >= 0) {
          updatedBook.chapters[chapterIndex].content = generatedContent;
        } else {
          updatedBook.chapters.push({
            title: task.title,
            content: generatedContent
          });
        }
      } else if (task.type === 'credits') {
        updatedBook.creditsPage = generatedContent;
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

  const handleMarkAsComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' as const } : task
    );
    setTasks(updatedTasks);
    updateBookWithTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    updateBookWithTasks(updatedTasks);
  };

  const updateBookWithTasks = (updatedTasks: Task[]) => {
    if (bookId && book) {
      updateBookMutation.mutate({ ...book, id: bookId, tasks: updatedTasks });
    }
  };

  const handleSaveBookContent = (updatedBook: any) => {
    setBook(updatedBook);
    // Update the backend with the book changes
    if (bookId) {
      updateBookMutation.mutate({ ...updatedBook, id: bookId, tasks });
    }
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  if (loading) {
    return <div className="text-center py-8">Loading book plan...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{book?.title || 'Book Plan'}</h1>
            <p className="text-slate-500">{book?.genre}</p>
          </div>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{book?.description}</p>
              </CardContent>
            </Card>

            {/* Tasks Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Tasks</h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Pending Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingTasks.length > 0 ? (
                    <ul className="space-y-4">
                      {pendingTasks.map((task) => (
                        <li key={task.id} className="flex items-start justify-between border-b pb-3">
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-gray-500">{task.type}</div>
                            {task.description && (
                              <div className="text-sm mt-1 text-gray-600">{task.description}</div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              variant="default"
                              onClick={() => handleGenerateContent(task.id)}
                              disabled={!!generatingContent}
                            >
                              {generatingContent === task.id ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                "Generate"
                              )}
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline" 
                              onClick={() => handleMarkAsComplete(task.id)}
                            >
                              Mark Complete
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      No pending tasks
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  {inProgressTasks.length > 0 ? (
                    <ul className="space-y-4">
                      {inProgressTasks.map((task) => (
                        <li key={task.id} className="flex items-start justify-between border-b pb-3">
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-gray-500">{task.type}</div>
                          </div>
                          <div className="flex items-center">
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            <span className="text-sm text-gray-500">Generating...</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      No tasks in progress
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Completed Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  {completedTasks.length > 0 ? (
                    <ul className="space-y-4">
                      {completedTasks.map((task) => (
                        <li key={task.id} className="flex items-start justify-between border-b pb-3">
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-gray-500">{task.type}</div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      No completed tasks
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Book Content Editor</CardTitle>
              </CardHeader>
              <CardContent>
                {book && (
                  <BookContentEditor book={book} onSave={handleSaveBookContent} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPlanPage;
