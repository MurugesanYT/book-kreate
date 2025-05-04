
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

interface CompletedTaskListProps {
  tasks: Task[];
  onDelete?: (taskId: string) => void;
  onMarkAsComplete: (taskId: string) => void;
}

const CompletedTaskList: React.FC<CompletedTaskListProps> = ({ tasks, onDelete, onMarkAsComplete }) => {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            No completed tasks
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isGenerating={false}
              onDelete={() => onDelete && onDelete(task.id)}
              onMarkComplete={() => onMarkAsComplete(task.id)}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CompletedTaskList;
