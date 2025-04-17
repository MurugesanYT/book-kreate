
import React from 'react';
import { useParams } from 'react-router-dom';
import { useBookData } from '@/hooks/useBookData';
import BookPlanHeader from '@/components/book-plan/BookPlanHeader';
import BookDescription from '@/components/book-plan/BookDescription';
import TasksSection from '@/components/book-plan/TasksSection';
import BookContentSection from '@/components/book-plan/BookContentSection';

const BookPlanPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const {
    book,
    tasks,
    loading,
    error,
    generatingContent,
    handleGenerateContent,
    handleMarkAsComplete,
    handleDeleteTask,
    handleSaveBookContent,
    handleAddChapter
  } = useBookData(bookId);

  if (loading) {
    return <div className="text-center py-8">Loading book plan...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8">
        <BookPlanHeader 
          title={book?.title || 'Book Plan'} 
          genre={book?.genre} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <BookDescription 
              book={book} 
              description={book?.description || ''} 
              onSave={handleSaveBookContent} 
            />

            <TasksSection
              tasks={tasks}
              book={book}
              generatingTaskId={generatingContent}
              onGenerateContent={handleGenerateContent}
              onMarkAsComplete={handleMarkAsComplete}
              onDeleteTask={handleDeleteTask}
              onAddChapter={handleAddChapter}
              onSave={handleSaveBookContent}
            />
          </div>
          
          <div className="lg:col-span-2">
            {book && (
              <BookContentSection 
                book={book} 
                onSave={handleSaveBookContent} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPlanPage;
