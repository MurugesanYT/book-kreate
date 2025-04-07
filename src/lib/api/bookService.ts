
// Book service to handle book operations
import { toast } from "sonner";
import { BookData, PlanItem } from "./types";
import { generateBookPlan } from "./planService";

// Function to get a book by ID
export const getBook = async (bookId: string): Promise<any> => {
  try {
    // In a real application, this would be a database call
    const existingBooks = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
    const book = existingBooks.find((b: any) => b.id === bookId);
    
    if (!book) {
      throw new Error("Book not found");
    }
    
    // Ensure book structure is complete
    if (!book.chapters) {
      book.chapters = [];
    }
    
    // Generate a plan if no tasks exist
    if (!book.tasks) {
      console.log("No tasks found, generating plan for book:", book.title);
      const plan = await generateBookPlan(book);
      book.tasks = plan;
      
      // Update localStorage
      const updatedBooks = existingBooks.map((b: any) => 
        b.id === bookId ? { ...b, tasks: plan } : b
      );
      localStorage.setItem('bookKreateBooks', JSON.stringify(updatedBooks));
    }
    
    return book;
  } catch (error) {
    console.error("Error fetching book:", error);
    toast.error("Failed to load book");
    throw error;
  }
};

// Function to update a book
export const updateBook = async (book: any): Promise<void> => {
  try {
    const existingBooks = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
    const updatedBooks = existingBooks.map((b: any) => 
      b.id === book.id ? { ...b, ...book } : b
    );
    
    localStorage.setItem('bookKreateBooks', JSON.stringify(updatedBooks));
    return Promise.resolve();
  } catch (error) {
    console.error("Error updating book:", error);
    toast.error("Failed to update book");
    throw error;
  }
};

// Function to list all books
export const listBooks = async (): Promise<any[]> => {
  try {
    const books = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
    return books;
  } catch (error) {
    console.error("Error listing books:", error);
    toast.error("Failed to load books");
    return [];
  }
};

// Function to delete a book
export const deleteBook = async (bookId: string): Promise<void> => {
  try {
    const existingBooks = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
    const updatedBooks = existingBooks.filter((b: any) => b.id !== bookId);
    
    localStorage.setItem('bookKreateBooks', JSON.stringify(updatedBooks));
    toast.success("Book deleted successfully");
    return Promise.resolve();
  } catch (error) {
    console.error("Error deleting book:", error);
    toast.error("Failed to delete book");
    throw error;
  }
};
