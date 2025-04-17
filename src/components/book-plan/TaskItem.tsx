
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'inProgress' | 'completed';
  description?: string;
}

interface TaskItemProps {
  task: Task;
  isGenerating: boolean;
  onGenerate?: () => void;
  onMarkComplete?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  isGenerating, 
  onGenerate, 
  onMarkComplete, 
  onDelete,
  showActions = true 
}) => {
  return (
    <li className="flex items-start justify-between border-b pb-3">
      <div>
        <div className="font-medium">{task.title}</div>
        <div className="text-sm text-gray-500">{task.type}</div>
        {task.description && (
          <div className="text-sm mt-1 text-gray-600">{task.description}</div>
        )}
      </div>
      
      {showActions && (
        <div className="flex gap-2">
          {task.status === 'pending' && onGenerate && (
            <Button 
              size="sm"
              variant="default"
              onClick={onGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          )}
          
          {task.status === 'pending' && onMarkComplete && (
            <Button 
              size="sm"
              variant="outline" 
              onClick={onMarkComplete}
            >
              Mark Complete
            </Button>
          )}
          
          {task.status === 'completed' && onDelete && (
            <Button 
              size="sm" 
              variant="destructive"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
          
          {task.status === 'inProgress' && (
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              <span className="text-sm text-gray-500">Generating...</span>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default TaskItem;
