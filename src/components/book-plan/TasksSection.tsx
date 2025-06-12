
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Play, Target } from 'lucide-react';
import { Book } from '@/lib/api/types';

interface TasksSectionProps {
  book: Book;
  onUpdate: (updatedBook: Partial<Book>) => void;
}

const TasksSection = ({ book, onUpdate }: TasksSectionProps) => {
  const tasks = book.tasks || [];
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const handleTaskStatusChange = (taskId: string, newStatus: 'pending' | 'inProgress' | 'completed') => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    onUpdate({ tasks: updatedTasks });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Writing Tools & Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Tasks ({pendingTasks.length})
              </h3>
              <div className="space-y-2">
                {pendingTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-gray-600">{task.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{task.type}</Badge>
                      <Button
                        size="sm"
                        onClick={() => handleTaskStatusChange(task.id, 'inProgress')}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* In Progress Tasks */}
          {inProgressTasks.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Play className="h-4 w-4" />
                In Progress ({inProgressTasks.length})
              </h3>
              <div className="space-y-2">
                {inProgressTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-gray-600">{task.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{task.type}</Badge>
                      <Button
                        size="sm"
                        onClick={() => handleTaskStatusChange(task.id, 'completed')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed ({completedTasks.length})
              </h3>
              <div className="space-y-2">
                {completedTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-green-600">{task.description}</p>
                      )}
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {task.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tasks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks available for this book.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksSection;
