
import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBookData } from '@/hooks/useBookData';
import BookPlanHeader from '@/components/book-plan/BookPlanHeader';
import BookDescription from '@/components/book-plan/BookDescription';
import TasksSection from '@/components/book-plan/TasksSection';
import BookContentSection from '@/components/book-plan/BookContentSection';
import BookAnalyticsSection from '@/components/book-plan/BookAnalyticsSection';
import BookSettingsSection from '@/components/book-plan/BookSettingsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BookPlanPage = () => {
  const params = useParams();
  const bookId = params.bookId;
  const [activeTab, setActiveTab] = useState('plan');
  
  console.log('BookPlanPage - Raw params:', params);
  console.log('BookPlanPage - Extracted bookId:', bookId);
  console.log('BookPlanPage - Current URL:', window.location.href);
  
  const {
    book,
    tasks,
    loading,
    error,
    generatingContent,
    handleGenerateContent,
    handleMarkAsComplete,
    handleDeleteTask,
    handleAddChapter,
    handleSaveBookContent,
  } = useBookData(bookId);

  // Make sure we properly handle dates to avoid any "Invalid time value" errors
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleString();
    } catch (error) {
      console.error("Date formatting error:", error);
      return 'Invalid date';
    }
  };
  
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  useEffect(() => {
    console.log('BookPlanPage - book data:', book);
    console.log('BookPlanPage - loading:', loading);
    console.log('BookPlanPage - error:', error);
    console.log('BookPlanPage - tasks:', tasks);
  }, [book, loading, error, tasks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-t-4 border-book-purple rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading book plan...</p>
          {bookId && (
            <p className="text-sm text-slate-400 mt-2">Book ID: {bookId}</p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Book</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          {bookId && (
            <p className="text-sm text-slate-400 mb-4">Book ID: {bookId}</p>
          )}
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-book-purple text-white rounded-md hover:bg-purple-700 transition-colors mr-2"
          >
            Try Again
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Book Not Found</h2>
          <p className="text-slate-600 mb-4">The book you're looking for doesn't exist or you don't have permission to view it.</p>
          {bookId && (
            <p className="text-sm text-slate-400 mb-4">Searched for Book ID: {bookId}</p>
          )}
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-book-purple text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Process the book data to ensure any dates are valid
  const processedBook = {
    ...book,
    createdAt: book.createdAt ? formatDate(book.createdAt) : undefined,
    updatedAt: book.updatedAt ? formatDate(book.updatedAt) : undefined
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <BookPlanHeader book={processedBook} onSave={handleSaveBookContent} />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <BookDescription 
          book={processedBook} 
          description={processedBook.description || 'No description available'} 
          onSave={handleSaveBookContent} 
        />

        <div className="mt-8">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="plan" className="px-6">Plan</TabsTrigger>
              <TabsTrigger value="write" className="px-6">Write</TabsTrigger>
              <TabsTrigger value="analytics" className="px-6">Analytics</TabsTrigger>
              <TabsTrigger value="settings" className="px-6">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="plan">
              <TasksSection
                book={processedBook}
                tasks={tasks}
                generatingTaskId={generatingContent}
                onGenerateContent={handleGenerateContent}
                onMarkAsComplete={handleMarkAsComplete}
                onDeleteTask={handleDeleteTask}
                onAddChapter={handleAddChapter}
                onSave={handleSaveBookContent}
              />
            </TabsContent>
            
            <TabsContent value="write">
              <BookContentSection book={processedBook} onSave={handleSaveBookContent} />
            </TabsContent>
            
            <TabsContent value="analytics">
              <BookAnalyticsSection book={processedBook} tasks={tasks} />
            </TabsContent>
            
            <TabsContent value="settings">
              <BookSettingsSection book={processedBook} onSave={handleSaveBookContent} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BookPlanPage;
