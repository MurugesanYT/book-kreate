
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

interface InProgressTaskListProps {
  tasks: Task[];
  generatingTaskId: string | null;
}

const InProgressTaskList: React.FC<InProgressTaskListProps> = ({ tasks, generatingTaskId }) => {
  if (tasks.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            No tasks in progress
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>In Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isGenerating={generatingTaskId === task.id}
              showActions={false}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default InProgressTaskList;
