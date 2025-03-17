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

// Define extended types for documents with additional properties
export interface BookDocument extends BookData {
  id: string;
  chapters?: any[];
  tasks?: PlanItem[];
  coverPage?: string;
  creditsPage?: string;
  userId?: string;
}

// Type for BookPlan document from Firestore
interface BookPlanDocument {
  bookId?: string;
  items?: PlanItem[];
  userId?: string;
}

// Function to get a book by ID
export const getBook = async (bookId: string): Promise<BookDocument> => {
  try {
    // Get the book from Firebase
    const bookDoc = await getDocument(BOOKS_COLLECTION, bookId) as BookDocument | null;
    
    if (!bookDoc) {
      throw new Error("Book not found");
    }
    
    // Ensure book structure is complete
    if (!bookDoc.chapters) {
      bookDoc.chapters = [];
    }
    
    // Get the book plan if it exists
    try {
      const bookPlan = await getDocument(BOOK_PLANS_COLLECTION, bookId) as BookPlanDocument | null;
      if (bookPlan && bookPlan.items) {
        bookDoc.tasks = bookPlan.items;
      }
    } catch (error) {
      console.log("No plan found, will generate one.");
    }
    
    // Generate a plan if no tasks exist
    if (!bookDoc.tasks) {
      console.log("No tasks found, generating plan for book:", bookDoc.title);
      const plan = await generateBookPlan(bookDoc);
      bookDoc.tasks = plan;
      
      // Store the generated plan in Firebase
      await createDocument(BOOK_PLANS_COLLECTION, bookId, {
        bookId,
        items: plan,
        userId: auth.currentUser?.uid
      });
    }
    
    return bookDoc;
  } catch (error) {
    console.error("Error fetching book:", error);
    toast.error("Failed to load book");
    throw error;
  }
};

// Function to update a book
export const updateBook = async (book: BookDocument): Promise<void> => {
  try {
    // Clone book without tasks to keep Firestore documents clean
    const { tasks, ...bookWithoutTasks } = book;
    
    // Update the book in Firebase
    await updateDocument(BOOKS_COLLECTION, book.id, bookWithoutTasks);
    
    // If tasks are included, update the book plan separately
    if (tasks && tasks.length > 0) {
      await updateDocument(BOOK_PLANS_COLLECTION, book.id, {
        items: tasks,
        bookId: book.id,
        userId: book.userId || auth.currentUser?.uid
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
export const listBooks = async (): Promise<BookDocument[]> => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }
    
    const books = await getDocuments(BOOKS_COLLECTION, auth.currentUser.uid);
    return books as BookDocument[];
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
export const createBook = async (bookData: Partial<BookData>): Promise<string> => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }
    
    const bookId = `book_${Date.now()}`;
    
    const newBook: BookDocument = {
      ...bookData as BookData,
      id: bookId,
      userId: auth.currentUser.uid,
      title: bookData.title || '',
      description: bookData.description || '',
      type: bookData.type || '',
      category: bookData.category || '',
      credits: bookData.credits || [],
      timestamp: bookData.timestamp || new Date().toISOString(),
      chapters: []
    };
    
    // Create the book document
    await createDocument(BOOKS_COLLECTION, bookId, newBook);
    
    // Generate a book plan immediately
    try {
      const plan = await generateBookPlan(newBook);
      
      // Store the generated plan in Firebase
      await createDocument(BOOK_PLANS_COLLECTION, bookId, {
        bookId,
        items: plan,
        userId: auth.currentUser.uid
      });
    } catch (planError) {
      console.error("Error generating initial plan:", planError);
      // We'll continue even if plan generation fails - it will be generated on demand later
    }
    
    return bookId;
  } catch (error) {
    console.error("Error creating book:", error);
    toast.error("Failed to create book");
    throw error;
  }
};
