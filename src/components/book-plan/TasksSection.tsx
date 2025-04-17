
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PendingTaskList from './PendingTaskList';
import InProgressTaskList from './InProgressTaskList';
import CompletedTaskList from './CompletedTaskList';
import AddChapterDialog from './AddChapterDialog';
import CharacterListDialog from './CharacterListDialog';

interface TasksSectionProps {
  tasks: any[];
  book: any;
  generatingTaskId: string | null;
  onGenerateContent: (taskId: string) => void;
  onMarkAsComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onAddChapter: (chapter: any) => void;
  onSave: (updatedBook: any) => void;
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
  // Filter tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <div className="flex space-x-2">
          <CharacterListDialog book={book} onSave={onSave} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <InProgressTaskList 
          tasks={inProgressTasks} 
          generatingTaskId={generatingTaskId}
        />

        <PendingTaskList 
          tasks={pendingTasks} 
          onGenerate={onGenerateContent} 
          onDelete={onDeleteTask}
        />

        <CompletedTaskList 
          tasks={completedTasks} 
          onDelete={onDeleteTask}
        />
        
        <AddChapterDialog onAddChapter={onAddChapter} />
      </CardContent>
    </Card>
  );
};

export default TasksSection;
