
import React from 'react';
import PendingTaskList from './PendingTaskList';
import InProgressTaskList from './InProgressTaskList';
import CompletedTaskList from './CompletedTaskList';

interface Task {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'inProgress' | 'completed';
  description?: string;
}

interface TasksSectionProps {
  tasks: Task[];
  generatingTaskId: string | null;
  onGenerateContent: (taskId: string) => void;
  onMarkAsComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TasksSection: React.FC<TasksSectionProps> = ({
  tasks,
  generatingTaskId,
  onGenerateContent,
  onMarkAsComplete,
  onDeleteTask,
}) => {
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      
      <PendingTaskList
        tasks={pendingTasks}
        generatingTaskId={generatingTaskId}
        onGenerateContent={onGenerateContent}
        onMarkAsComplete={onMarkAsComplete}
      />
      
      <InProgressTaskList
        tasks={inProgressTasks}
      />
      
      <CompletedTaskList
        tasks={completedTasks}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
};

export default TasksSection;
