
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book } from '@/lib/api/types';
import { getBook, updateBook, addChapter } from '@/lib/api/bookService';
import { toast } from 'sonner';
import BookPlanHeader from '@/components/book-plan/BookPlanHeader';
import TasksSection from '@/components/book-plan/TasksSection';
import BookContentSection from '@/components/book-plan/BookContentSection';
import BookAnalyticsSection from '@/components/book-plan/BookAnalyticsSection';
import BulkChapterCreator from '@/components/book-plan/BulkChapterCreator';
import AddChapterDialog from '@/components/book-plan/AddChapterDialog';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';

const BookPlanPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      if (!bookId) {
        toast.error('Book ID is required');
        navigate('/dashboard');
        return;
      }

      try {
        const bookData = await getBook(bookId);
        setBook(bookData);
      } catch (error) {
        console.error('Error loading book:', error);
        toast.error('Failed to load book');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [bookId, navigate]);

  const handleBookUpdate = async (updatedBook: Partial<Book>) => {
    if (!book) return;

    try {
      await updateBook({ ...updatedBook, id: book.id });
      setBook(prevBook => prevBook ? { ...prevBook, ...updatedBook } : null);
      toast.success('Book updated successfully');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book');
    }
  };

  const handleAddChapter = async (chapterData: any) => {
    if (!book) return;

    try {
      await addChapter(book.id, chapterData);
      
      // Update local state
      const updatedChapters = [...(book.chapters || []), chapterData];
      setBook(prevBook => prevBook ? { ...prevBook, chapters: updatedChapters } : null);
      
      toast.success('Chapter added successfully');
    } catch (error) {
      console.error('Error adding chapter:', error);
      toast.error('Failed to add chapter');
    }
  };

  const handleBulkChaptersCreated = async (newChapters: any[]) => {
    if (!book) return;

    try {
      // Add each chapter to the book
      for (const chapter of newChapters) {
        await addChapter(book.id, chapter);
      }
      
      // Update local state
      const updatedChapters = [...(book.chapters || []), ...newChapters];
      setBook(prevBook => prevBook ? { ...prevBook, chapters: updatedChapters } : null);
      
    } catch (error) {
      console.error('Error adding bulk chapters:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your book...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Book not found</p>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <BookPlanHeader book={book} onUpdate={handleBookUpdate} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Tasks and Analytics */}
          <div className="lg:col-span-1 space-y-6">
            <TasksSection book={book} onUpdate={handleBookUpdate} />
            <BookAnalyticsSection book={book} />
          </div>

          {/* Right Column - Book Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Book Content</h2>
                <div className="flex gap-2">
                  <BulkChapterCreator 
                    book={book} 
                    onChaptersCreated={handleBulkChaptersCreated}
                  />
                  <AddChapterDialog onAddChapter={handleAddChapter}>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Chapter
                    </Button>
                  </AddChapterDialog>
                </div>
              </div>
              
              <BookContentSection book={book} onUpdate={handleBookUpdate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPlanPage;
