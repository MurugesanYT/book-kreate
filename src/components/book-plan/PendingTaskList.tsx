
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'inProgress' | 'completed';
  description?: string;
}

interface PendingTaskListProps {
  tasks: Task[];
  generatingTaskId: string | null;
  onGenerateContent: (taskId: string) => void;
  onMarkAsComplete: (taskId: string) => void;
}

const PendingTaskList: React.FC<PendingTaskListProps> = ({
  tasks,
  generatingTaskId,
  onGenerateContent,
  onMarkAsComplete,
}) => {
  if (tasks.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            No pending tasks
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Pending Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isGenerating={generatingTaskId === task.id}
              onGenerate={() => onGenerateContent(task.id)}
              onMarkComplete={() => onMarkAsComplete(task.id)}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PendingTaskList;
