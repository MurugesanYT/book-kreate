
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, BookOpen, Sparkles } from 'lucide-react';
import { Book as BookType } from '@/lib/api/types';
import AddChapterDialog from './AddChapterDialog';
import CharacterListDialog from './CharacterListDialog';
import MultipleChapterGenerator from './MultipleChapterGenerator';
import { Separator } from '@/components/ui/separator';
import { canAddChapter } from '@/lib/api/planService';

interface TasksSectionProps {
  book: BookType;
  onUpdate?: (updatedBook: BookType) => void;
}

const TasksSection: React.FC<TasksSectionProps> = ({ book, onUpdate }) => {
  const showAddChapterButton = canAddChapter(book);

  const handleAddChapter = (newChapter: any) => {
    if (!book || !onUpdate) return;
    
    const updatedChapters = [...(book.chapters || []), newChapter];
    onUpdate({ ...book, chapters: updatedChapters });
  };

  const handleAddMultipleChapters = (chapters: any[]) => {
    if (!book || !onUpdate) return;
    
    const updatedChapters = [...(book.chapters || []), ...chapters];
    onUpdate({ ...book, chapters: updatedChapters });
  };

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Header Section - Responsive */}
      <div className="text-center py-6 md:py-12 px-3 md:px-6 bg-gradient-to-br from-purple-50 via-white to-orange-50 rounded-2xl md:rounded-3xl border border-purple-100/50 shadow-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full mb-4 md:mb-6 shadow-xl">
          <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-white" />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-orange-600 bg-clip-text text-transparent mb-3 md:mb-4">
          Chapter Creation Tools
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Create and manage your book chapters with our powerful AI-assisted tools
        </p>
      </div>

      {/* Main Tools Section - Responsive */}
      <Card className="bg-white/80 backdrop-blur-md shadow-2xl border-0 rounded-2xl md:rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-4 md:py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
            <CardTitle className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl font-bold">
              <Sparkles className="h-5 w-5 md:h-7 md:w-7" />
              Writing Tools
            </CardTitle>
            <div className="flex flex-wrap gap-2 md:gap-3 items-center">
              <CharacterListDialog book={book} onSave={onUpdate} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
            {/* Add Single Chapter - Responsive */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl md:rounded-2xl p-4 md:p-8 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Plus className="h-5 w-5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-blue-900">Add Single Chapter</h3>
              </div>
              <p className="text-blue-700 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
                Create one chapter at a time with custom titles and descriptions for precise control over your story.
              </p>
              {showAddChapterButton ? (
                <AddChapterDialog book={book} onAddChapter={handleAddChapter}>
                  <Button className="w-full py-2 md:py-3 text-sm md:text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold">
                    <Plus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    Add Chapter
                  </Button>
                </AddChapterDialog>
              ) : (
                <Button variant="outline" className="w-full py-2 md:py-3 text-sm md:text-lg" disabled>
                  <Plus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Upgrade for more chapters
                </Button>
              )}
            </div>
            
            {/* Bulk Generator - Responsive */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-xl md:rounded-2xl p-4 md:p-8 border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Users className="h-5 w-5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-green-900">AI Bulk Generator</h3>
              </div>
              <p className="text-green-700 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
                Generate multiple chapters at once with AI assistance for rapid story development.
              </p>
              {showAddChapterButton ? (
                <MultipleChapterGenerator book={book} onAddChapters={handleAddMultipleChapters} />
              ) : (
                <Button variant="outline" className="w-full py-2 md:py-3 text-sm md:text-lg" disabled>
                  <Users className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Upgrade for bulk generation
                </Button>
              )}
            </div>
          </div>
          
          <Separator className="my-6 md:my-8 bg-gradient-to-r from-purple-200 to-orange-200 h-px" />
          
          {/* Information Section - Responsive */}
          <div className="text-center py-6 md:py-8 px-3 md:px-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl md:rounded-2xl border border-slate-200">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full mb-4 md:mb-6 shadow-lg">
              <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4">Ready to Write?</h3>
            <p className="text-slate-600 mb-3 md:mb-4 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
              Use the tools above to generate chapters for your book. All generated content will appear in the Write tab where you can edit and refine your story.
            </p>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-slate-500 bg-white px-3 md:px-4 py-2 rounded-full border border-slate-200">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              Your chapters will be automatically organized and ready for editing
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksSection;
