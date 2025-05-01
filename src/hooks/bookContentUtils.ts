
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { updateBook } from "@/lib/api";
import { Task } from './taskUtils';

/**
 * Update a book's content based on a generated content
 */
export const updateBookWithGeneratedContent = (
  book: any, 
  task: Task, 
  generatedContent: string
): any => {
  const updatedBook = { ...book };
  
  if (task.type === 'cover') {
    updatedBook.coverPage = generatedContent;
  } else if (task.type === 'chapter') {
    // Find matching chapter or create a new one
    const chapterIndex = updatedBook.chapters?.findIndex(
      (ch: any) => ch.title === task.title
    );
    
    if (chapterIndex >= 0) {
      updatedBook.chapters[chapterIndex].content = generatedContent;
    } else {
      if (!updatedBook.chapters) {
        updatedBook.chapters = [];
      }
      updatedBook.chapters.push({
        id: uuidv4(),
        title: task.title,
        content: generatedContent,
        order: updatedBook.chapters.length
      });
    }
  } else if (task.type === 'credits') {
    updatedBook.creditsPage = generatedContent;
  } else if (task.type === 'characters') {
    updatedBook.characterList = generatedContent;
  }
  
  return updatedBook;
};

/**
 * Save book content to storage
 */
export const saveBookContent = async (
  bookId: string | undefined, 
  updatedBook: any
): Promise<boolean> => {
  if (!bookId) return false;
  
  try {
    await updateBook({ ...updatedBook, id: bookId });
    toast.success('Book updated successfully!');
    return true;
  } catch (error: any) {
    toast.error(`Failed to update book: ${error.message || 'Unknown error'}`);
    return false;
  }
};
