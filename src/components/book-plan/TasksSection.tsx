
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Wand2, Users } from 'lucide-react';
import { Task } from '@/hooks/taskUtils';
import { Book as BookType } from '@/lib/api/types';
import AddChapterDialog from './AddChapterDialog';
import AIChapterCreator from './AIChapterCreator';
import CharacterListDialog from './CharacterListDialog';
import MultipleChapterGenerator from './MultipleChapterGenerator';
import { Separator } from '@/components/ui/separator';
import { canAddChapter } from '@/lib/api/planService';

interface TasksSectionProps {
  tasks: Task[];
  book: BookType;
  generatingTaskId: string | null;
  onGenerateContent: (taskId: string) => void;
  onMarkAsComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onAddChapter: (newChapter: Task) => void;
  onSave: (updatedBook: BookType) => void;
}

const TasksSection: React.FC<TasksSectionProps> = ({
  tasks,
  book,
  generatingTaskId,
  onGenerateContent,
  onMarkAsComplete,
  onDeleteTask,
  onAddChapter,
  onSave
}) => {
  const showAddChapterButton = canAddChapter(book);

  const handleAddMultipleChapters = (chapters: Task[]) => {
    chapters.forEach(chapter => onAddChapter(chapter));
    onSave(book);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-600" />
            Chapter Generation Tools
          </CardTitle>
          <div className="flex flex-wrap gap-2 items-center">
            <CharacterListDialog book={book} onSave={onSave} />
            {showAddChapterButton ? (
              <>
                <AddChapterDialog book={book} onAddChapter={onAddChapter} />
                <AIChapterCreator book={book} onAddChapter={onAddChapter} />
                <MultipleChapterGenerator book={book} onAddChapters={handleAddMultipleChapters} />
              </>
            ) : (
              <Button variant="outline" className="gap-2" disabled>
                <Plus className="h-4 w-4" />
                Upgrade for more chapters
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-blue-900">Add Single Chapter</h3>
            </div>
            <p className="text-blue-700 text-sm mb-4">Create one chapter at a time with custom titles and descriptions.</p>
            {showAddChapterButton && <AddChapterDialog book={book} onAddChapter={onAddChapter} />}
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Wand2 className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-purple-900">AI Chapter Creator</h3>
            </div>
            <p className="text-purple-700 text-sm mb-4">Let AI suggest and create chapters based on your book's content.</p>
            {showAddChapterButton && <AIChapterCreator book={book} onAddChapter={onAddChapter} />}
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-green-900">Bulk Generator</h3>
            </div>
            <p className="text-green-700 text-sm mb-4">Generate multiple chapters at once with AI assistance.</p>
            {showAddChapterButton && <MultipleChapterGenerator book={book} onAddChapters={handleAddMultipleChapters} />}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="text-center py-8">
          <p className="text-slate-600 mb-4">
            Use the tools above to generate chapters for your book. All generated content will appear in the Write tab.
          </p>
          <div className="text-sm text-slate-500">
            Your chapters will be automatically organized and ready for editing.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksSection;
