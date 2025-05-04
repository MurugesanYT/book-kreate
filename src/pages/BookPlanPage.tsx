
import React, { useState, useCallback } from 'react';
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
  const { bookId } = useParams<{ bookId: string }>();
  const [activeTab, setActiveTab] = useState('plan');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-t-4 border-book-purple rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading book plan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-book-purple text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Try Again
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
          <p className="text-slate-600">The book you're looking for doesn't exist or you don't have permission to view it.</p>
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
