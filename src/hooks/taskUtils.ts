
import { toast } from "sonner";
import { updateBook } from "@/lib/api";

export interface Task {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'inProgress' | 'completed';
  description?: string;
}

/**
 * Mark a task as complete
 */
export const markTaskAsComplete = (tasks: Task[], taskId: string): Task[] => {
  return tasks.map(task =>
    task.id === taskId ? { ...task, status: 'completed' as const } : task
  );
};

/**
 * Delete a task from the task list
 */
export const deleteTask = (tasks: Task[], taskId: string): Task[] => {
  return tasks.filter(task => task.id !== taskId);
};

/**
 * Update book with tasks in storage
 */
export const updateBookWithTasks = async (book: any, bookId: string | undefined, tasks: Task[]) => {
  if (bookId && book) {
    try {
      await updateBook(bookId, { ...book, tasks: tasks });
      return true;
    } catch (error: any) {
      toast.error(`Failed to update tasks: ${error.message || 'Unknown error'}`);
      return false;
    }
  }
  return false;
};

/**
 * Find a task by ID
 */
export const findTaskById = (tasks: Task[], taskId: string): Task | undefined => {
  return tasks.find(t => t.id === taskId);
};
