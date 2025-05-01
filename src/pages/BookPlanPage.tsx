
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookData } from '@/hooks/useBookData';
import BookPlanHeader from '@/components/book-plan/BookPlanHeader';
import BookDescription from '@/components/book-plan/BookDescription';
import TasksSection from '@/components/book-plan/TasksSection';
import BookContentSection from '@/components/book-plan/BookContentSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BarChart2, Settings } from 'lucide-react';
import BookAnalyticsSection from '@/components/book-plan/BookAnalyticsSection';
import BookSettingsSection from '@/components/book-plan/BookSettingsSection';

const BookPlanPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [activeTab, setActiveTab] = useState<string>('content');
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

        <div className="mb-6">
          <Tabs 
            defaultValue="content" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-6">
              <TabsList className="grid grid-cols-3 w-[400px]">
                <TabsTrigger value="content" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="content">
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
            </TabsContent>

            <TabsContent value="analytics">
              {book && <BookAnalyticsSection book={book} tasks={tasks} />}
            </TabsContent>

            <TabsContent value="settings">
              {book && <BookSettingsSection book={book} onSave={handleSaveBookContent} />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BookPlanPage;
