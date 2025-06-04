
// Book service to handle book operations with Firebase Realtime Database
import { toast } from "sonner";
import { database, auth } from "@/lib/firebase";
import { ref, push, get, set, remove, child, query, orderByChild, equalTo } from "firebase/database";
import { BookData, PlanItem, Book } from "./types";
import { generateBookPlan, canCreateBook, canAddChapter } from "./planService";

// Get current user ID from Firebase Auth
const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  return user.uid;
};

// Function to get a book by ID
export const getBook = async (bookId: string): Promise<Book> => {
  try {
    const userId = getCurrentUserId();
    const bookRef = ref(database, `users/${userId}/books/${bookId}`);
    const snapshot = await get(bookRef);
    
    if (!snapshot.exists()) {
      throw new Error("Book not found");
    }
    
    const book = snapshot.val();
    
    // Ensure book structure is complete
    if (!book.chapters) {
      book.chapters = [];
    }

    // Ensure status is set
    if (!book.status) {
      book.status = "draft";
    }
    
    // Generate a plan if no tasks exist
    if (!book.tasks) {
      console.log("No tasks found, generating plan for book:", book.title);
      const plan = await generateBookPlan(book);
      book.tasks = plan;
      
      // Update the book in Firebase with the generated tasks
      await set(ref(database, `users/${userId}/books/${bookId}/tasks`), plan);
    }
    
    return { ...book, id: bookId };
  } catch (error) {
    console.error("Error fetching book:", error);
    toast.error("Failed to load book");
    throw error;
  }
};

// Function to update a book
export const updateBook = async (bookData: Partial<Book> & { id: string }): Promise<void> => {
  try {
    const userId = getCurrentUserId();
    const { id, ...updateData } = bookData;
    
    // Add timestamp
    updateData.updatedAt = new Date().toISOString();
    
    await set(ref(database, `users/${userId}/books/${id}`), updateData);
    return Promise.resolve();
  } catch (error) {
    console.error("Error updating book:", error);
    toast.error("Failed to update book");
    throw error;
  }
};

// Function to list all books (alias for getBooks)
export const listBooks = async (): Promise<Book[]> => {
  try {
    const userId = getCurrentUserId();
    const booksRef = ref(database, `users/${userId}/books`);
    const snapshot = await get(booksRef);
    
    if (!snapshot.exists()) {
      return [];
    }
    
    const booksData = snapshot.val();
    const books = Object.keys(booksData).map(id => ({
      id,
      status: "draft" as const, // Set default status
      ...booksData[id]
    }));
    
    return books;
  } catch (error) {
    console.error("Error listing books:", error);
    toast.error("Failed to load books");
    return [];
  }
};

// Function to get all books (main export for dashboard)
export const getBooks = async (): Promise<Book[]> => {
  return await listBooks();
};

// Function to create a new book
export const createBook = async (bookData: Partial<Book>): Promise<Book> => {
  try {
    const userId = getCurrentUserId();
    
    // Get existing books to check limits
    const existingBooks = await listBooks();
    
    // Check if user can create a new book based on their plan
    if (!canCreateBook(existingBooks)) {
      throw new Error("Book limit reached for your current plan");
    }
    
    // Add timestamps and default status
    const timestamp = new Date().toISOString();
    const bookWithTimestamps = {
      ...bookData,
      createdAt: timestamp,
      updatedAt: timestamp,
      status: "draft" as const,
      chapters: [],
      tasks: []
    };
    
    // Push to Firebase and get the generated key
    const booksRef = ref(database, `users/${userId}/books`);
    const newBookRef = push(booksRef);
    await set(newBookRef, bookWithTimestamps);
    
    const createdBook = { ...bookWithTimestamps, id: newBookRef.key } as Book;
    
    // Generate initial plan for the book
    try {
      const plan = await generateBookPlan(createdBook);
      await set(ref(database, `users/${userId}/books/${newBookRef.key}/tasks`), plan);
      createdBook.tasks = plan;
    } catch (planError) {
      console.error("Error generating initial plan:", planError);
      // Continue even if plan generation fails
    }
    
    return createdBook;
  } catch (error) {
    console.error("Error creating book:", error);
    toast.error("Failed to create book");
    throw error;
  }
};

// Function to add a chapter to a book
export const addChapter = async (bookId: string, chapterData: any): Promise<any> => {
  try {
    const userId = getCurrentUserId();
    const book = await getBook(bookId);
    
    if (!book) {
      throw new Error("Book not found");
    }
    
    // Ensure book has chapters array
    if (!book.chapters) {
      book.chapters = [];
    }
    
    // Check if user can add a new chapter based on their plan
    if (!canAddChapter(book)) {
      throw new Error("Chapter limit reached for your current plan");
    }
    
    // Add the new chapter
    book.chapters.push(chapterData);
    book.updatedAt = new Date().toISOString();
    
    // Update the book in Firebase
    await set(ref(database, `users/${userId}/books/${bookId}`), book);
    
    return Promise.resolve(chapterData);
  } catch (error) {
    console.error("Error adding chapter:", error);
    toast.error("Failed to add chapter");
    throw error;
  }
};

// Function to delete a book
export const deleteBook = async (bookId: string): Promise<void> => {
  try {
    const userId = getCurrentUserId();
    await remove(ref(database, `users/${userId}/books/${bookId}`));
    toast.success("Book deleted successfully");
    return Promise.resolve();
  } catch (error) {
    console.error("Error deleting book:", error);
    toast.error("Failed to delete book");
    throw error;
  }
};
