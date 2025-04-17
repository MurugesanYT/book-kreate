
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
  onDeleteTask: (taskId: string) => void;
}

const CompletedTaskList: React.FC<CompletedTaskListProps> = ({ tasks, onDeleteTask }) => {
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
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CompletedTaskList;
