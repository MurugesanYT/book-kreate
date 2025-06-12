
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
import CollaborationSection from '@/components/collaboration/CollaborationSection';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ArrowLeft, BookOpen, BarChart3, Settings, Users } from 'lucide-react';

const BookPlanPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      if (!bookId) {
        toast.error('Book ID is required');
        navigate('/dashboard');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Try to get book from localStorage first (fallback)
        const storedBooks = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
        const localBook = storedBooks.find((b: any) => b.id === bookId);
        
        if (localBook) {
          // Load full book data from localStorage
          const fullBookData = JSON.parse(localStorage.getItem(`book_${bookId}`) || '{}');
          const bookData = {
            ...localBook,
            ...fullBookData,
            chapters: fullBookData.chapters || localBook.chapters || [],
            tasks: fullBookData.tasks || []
          };
          setBook(bookData);
        } else {
          // Try Firebase/API
          try {
            const bookData = await getBook(bookId);
            setBook(bookData);
          } catch (apiError) {
            console.error('API error, book not found:', apiError);
            setError('Book not found');
            toast.error('Book not found');
            navigate('/dashboard');
            return;
          }
        }
      } catch (error) {
        console.error('Error loading book:', error);
        setError('Failed to load book');
        toast.error('Failed to load book');
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [bookId, navigate]);

  const handleBookUpdate = async (updatedBook: Partial<Book>) => {
    if (!book || !bookId) return;

    try {
      const updatedBookData = { ...book, ...updatedBook };
      
      // Update localStorage
      localStorage.setItem(`book_${bookId}`, JSON.stringify(updatedBookData));
      
      // Update books list
      const storedBooks = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
      const updatedBooks = storedBooks.map((b: any) => 
        b.id === bookId ? { ...b, ...updatedBook } : b
      );
      localStorage.setItem('bookKreateBooks', JSON.stringify(updatedBooks));
      
      setBook(updatedBookData);
      toast.success('Book updated successfully');
      
      // Try to update via API as well
      try {
        await updateBook({ ...updatedBook, id: bookId });
      } catch (apiError) {
        console.log('API update failed, but localStorage updated:', apiError);
      }
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book');
    }
  };

  const handleAddChapter = async (chapterData: any) => {
    if (!book || !bookId) return;

    try {
      const updatedChapters = [...(book.chapters || []), chapterData];
      const updatedBook = { ...book, chapters: updatedChapters };
      
      // Update localStorage
      localStorage.setItem(`book_${bookId}`, JSON.stringify(updatedBook));
      
      setBook(updatedBook);
      toast.success('Chapter added successfully');
      
      // Try API update
      try {
        await addChapter(bookId, chapterData);
      } catch (apiError) {
        console.log('API chapter add failed, but localStorage updated:', apiError);
      }
    } catch (error) {
      console.error('Error adding chapter:', error);
      toast.error('Failed to add chapter');
    }
  };

  const handleBulkChaptersCreated = async (newChapters: any[]) => {
    if (!book || !bookId) return;

    try {
      const updatedChapters = [...(book.chapters || []), ...newChapters];
      const updatedBook = { ...book, chapters: updatedChapters };
      
      // Update localStorage
      localStorage.setItem(`book_${bookId}`, JSON.stringify(updatedBook));
      
      setBook(updatedBook);
      
      // Try API updates
      for (const chapter of newChapters) {
        try {
          await addChapter(bookId, chapter);
        } catch (apiError) {
          console.log('API bulk chapter add failed for chapter:', chapter.title, apiError);
        }
      }
    } catch (error) {
      console.error('Error adding bulk chapters:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading your book...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4 text-sm sm:text-base">{error || 'Book not found'}</p>
          <Button onClick={() => navigate('/dashboard')} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <BookPlanHeader book={book} onUpdate={handleBookUpdate} />

        {/* Main Content with Tabs */}
        <div className="mt-4 sm:mt-8">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Tools</span>
              </TabsTrigger>
              <TabsTrigger value="collaborate" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Collaborate</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Book Content</h2>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <BulkChapterCreator 
                      book={book} 
                      onChaptersCreated={handleBulkChaptersCreated}
                    />
                    <AddChapterDialog book={book} onAddChapter={handleAddChapter}>
                      <Button variant="outline" className="gap-2 w-full sm:w-auto text-sm">
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Add Chapter</span>
                        <span className="sm:hidden">Add</span>
                      </Button>
                    </AddChapterDialog>
                  </div>
                </div>
                
                <BookContentSection book={book} onUpdate={handleBookUpdate} />
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <TasksSection book={book} onUpdate={handleBookUpdate} />
            </TabsContent>

            <TabsContent value="collaborate">
              <CollaborationSection book={book} />
            </TabsContent>

            <TabsContent value="analytics">
              <BookAnalyticsSection book={book} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BookPlanPage;
