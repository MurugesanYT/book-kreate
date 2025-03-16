import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBook, updateBook } from '@/lib/api';
import BookContentEditor from '@/components/BookContentEditor';

interface Task {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'inProgress' | 'completed';
}

const BookPlanPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [book, setBook] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setTasks(bookData.tasks || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load book');
      toast.error(err.message || 'Failed to load book');
    } finally {
      setLoading(false);
    }
  };

  const updateBookMutation = useMutation(updateBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['book', bookId]);
      toast.success('Book updated successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to update book: ${error.message || 'Unknown error'}`);
    },
  });

  const handleMarkAsComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' } : task
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
    // Here you would typically save to your backend/database
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');

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
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => handleMarkAsComplete(task.id)}
                          >
                            Mark Complete
                          </Button>
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
              
              <Card>
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
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </Button>
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
