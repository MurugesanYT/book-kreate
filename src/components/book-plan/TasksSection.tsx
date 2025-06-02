
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Book, Star } from 'lucide-react';
import { Task } from '@/hooks/taskUtils';
import { Book as BookType } from '@/lib/api/types';
import PendingTaskList from './PendingTaskList';
import InProgressTaskList from './InProgressTaskList';
import CompletedTaskList from './CompletedTaskList';
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
  const [activeTab, setActiveTab] = useState<string>('pending');
  
  // Ensure tasks is an array before filtering
  const safeTasksArray = Array.isArray(tasks) ? tasks : [];
  
  const pendingTasks = safeTasksArray.filter(task => task.status === 'pending');
  const inProgressTasks = safeTasksArray.filter(task => task.status === 'inProgress');
  const completedTasks = safeTasksArray.filter(task => task.status === 'completed');
  
  const showAddChapterButton = canAddChapter(book);

  const handleAddMultipleChapters = (chapters: Task[]) => {
    chapters.forEach(chapter => onAddChapter(chapter));
    onSave(book); // Save the book with the new chapters
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Book Tasks</CardTitle>
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
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Pending
              {pendingTasks.length > 0 && (
                <span className="ml-1 bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md text-xs">
                  {pendingTasks.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              In Progress
              {inProgressTasks.length > 0 && (
                <span className="ml-1 bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md text-xs">
                  {inProgressTasks.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              Completed
              {completedTasks.length > 0 && (
                <span className="ml-1 bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md text-xs">
                  {completedTasks.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <PendingTaskList 
              tasks={pendingTasks} 
              generatingTaskId={generatingTaskId}
              onGenerateContent={onGenerateContent} 
              onDeleteTask={onDeleteTask} 
            />
            
            {pendingTasks.length === 0 && (
              <div className="text-center p-8 text-gray-500">
                <p>No pending tasks</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="in-progress">
            <InProgressTaskList 
              tasks={inProgressTasks}
              generatingTaskId={generatingTaskId}
            />
            
            {inProgressTasks.length === 0 && (
              <div className="text-center p-8 text-gray-500">
                <p>No tasks in progress</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            <CompletedTaskList 
              tasks={completedTasks}
              onMarkAsComplete={onMarkAsComplete}
            />
            
            {completedTasks.length === 0 && (
              <div className="text-center p-8 text-gray-500">
                <p>No completed tasks</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <div>Total Tasks: {safeTasksArray.length}</div>
          <div className="flex gap-3">
            <div>Pending: {pendingTasks.length}</div>
            <div>In Progress: {inProgressTasks.length}</div>
            <div>Completed: {completedTasks.length}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksSection;
