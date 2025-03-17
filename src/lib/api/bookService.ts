
// Book service to handle book operations
import { toast } from "sonner";
import { BookData, PlanItem } from "./types";
import { generateBookPlan } from "./planService";
import { 
  createDocument, 
  updateDocument, 
  getDocument, 
  deleteDocument, 
  getDocuments, 
  auth 
} from '../firebase';

const BOOKS_COLLECTION = 'books';
const BOOK_PLANS_COLLECTION = 'bookPlans';

// Function to get a book by ID
export const getBook = async (bookId: string): Promise<any> => {
  try {
    // Get the book from Firebase
    const book = await getDocument(BOOKS_COLLECTION, bookId);
    
    if (!book) {
      throw new Error("Book not found");
    }
    
    // Ensure book structure is complete
    if (!book.chapters) {
      book.chapters = [];
    }
    
    // Get the book plan if it exists
    try {
      const bookPlan = await getDocument(BOOK_PLANS_COLLECTION, bookId);
      if (bookPlan && bookPlan.items) {
        book.tasks = bookPlan.items;
      }
    } catch (error) {
      console.log("No plan found, will generate one.");
    }
    
    // Generate a plan if no tasks exist
    if (!book.tasks) {
      console.log("No tasks found, generating plan for book:", book.title);
      const plan = await generateBookPlan(book);
      book.tasks = plan;
      
      // Store the generated plan in Firebase
      await createDocument(BOOK_PLANS_COLLECTION, bookId, {
        bookId,
        items: plan,
        userId: auth.currentUser?.uid
      });
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
    // Update the book in Firebase
    await updateDocument(BOOKS_COLLECTION, book.id, book);
    
    // If tasks are included, update the book plan
    if (book.tasks) {
      await updateDocument(BOOK_PLANS_COLLECTION, book.id, {
        items: book.tasks
      });
    }
    
    return Promise.resolve();
  } catch (error) {
    console.error("Error updating book:", error);
    toast.error("Failed to update book");
    throw error;
  }
};

// Function to list all books for the current user
export const listBooks = async (): Promise<any[]> => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }
    
    const books = await getDocuments(BOOKS_COLLECTION, auth.currentUser.uid);
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
    // Delete the book from Firebase
    await deleteDocument(BOOKS_COLLECTION, bookId);
    
    // Also delete the associated book plan
    try {
      await deleteDocument(BOOK_PLANS_COLLECTION, bookId);
    } catch (error) {
      console.log("No plan to delete or error deleting plan:", error);
    }
    
    toast.success("Book deleted successfully");
    return Promise.resolve();
  } catch (error) {
    console.error("Error deleting book:", error);
    toast.error("Failed to delete book");
    throw error;
  }
};

// Function to create a new book
export const createBook = async (bookData: any): Promise<string> => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }
    
    const bookId = `book_${Date.now()}`;
    
    await createDocument(BOOKS_COLLECTION, bookId, {
      ...bookData,
      id: bookId,
      userId: auth.currentUser.uid
    });
    
    return bookId;
  } catch (error) {
    console.error("Error creating book:", error);
    toast.error("Failed to create book");
    throw error;
  }
};
