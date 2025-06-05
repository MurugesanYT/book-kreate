
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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center py-12 px-6 bg-gradient-to-br from-purple-50 via-white to-orange-50 rounded-3xl border border-purple-100/50 shadow-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full mb-6 shadow-xl">
          <BookOpen className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-orange-600 bg-clip-text text-transparent mb-4">
          Chapter Creation Tools
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Create and manage your book chapters with our powerful AI-assisted tools
        </p>
      </div>

      {/* Main Tools Section */}
      <Card className="bg-white/80 backdrop-blur-md shadow-2xl border-0 rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-8">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <Sparkles className="h-7 w-7" />
              Writing Tools
            </CardTitle>
            <div className="flex flex-wrap gap-3 items-center">
              <CharacterListDialog book={book} onSave={onUpdate} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Add Single Chapter */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Plus className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">Add Single Chapter</h3>
              </div>
              <p className="text-blue-700 text-lg mb-6 leading-relaxed">
                Create one chapter at a time with custom titles and descriptions for precise control over your story.
              </p>
              {showAddChapterButton ? (
                <AddChapterDialog book={book} onAddChapter={handleAddChapter} />
              ) : (
                <Button variant="outline" className="w-full py-3 text-lg" disabled>
                  <Plus className="h-5 w-5 mr-2" />
                  Upgrade for more chapters
                </Button>
              )}
            </div>
            
            {/* Bulk Generator */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">AI Bulk Generator</h3>
              </div>
              <p className="text-green-700 text-lg mb-6 leading-relaxed">
                Generate multiple chapters at once with AI assistance for rapid story development.
              </p>
              {showAddChapterButton ? (
                <MultipleChapterGenerator book={book} onAddChapters={handleAddMultipleChapters} />
              ) : (
                <Button variant="outline" className="w-full py-3 text-lg" disabled>
                  <Users className="h-5 w-5 mr-2" />
                  Upgrade for bulk generation
                </Button>
              )}
            </div>
          </div>
          
          <Separator className="my-8 bg-gradient-to-r from-purple-200 to-orange-200 h-px" />
          
          {/* Information Section */}
          <div className="text-center py-8 px-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full mb-6 shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Write?</h3>
            <p className="text-slate-600 mb-4 text-lg leading-relaxed max-w-2xl mx-auto">
              Use the tools above to generate chapters for your book. All generated content will appear in the Write tab where you can edit and refine your story.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200">
              <Sparkles className="h-4 w-4" />
              Your chapters will be automatically organized and ready for editing
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksSection;
