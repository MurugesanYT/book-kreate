
import { toast } from "sonner";
import { database, auth } from "@/lib/firebase";
import { ref, push, get, set, remove, query, orderByChild, equalTo } from "firebase/database";
import { Book } from "./types";

// Get current user ID from Firebase Auth
const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  return user.uid;
};

export interface MarketplaceBook extends Book {
  listedAt: string;
  price?: number;
  isFree?: boolean;
  downloadCount: number;
  rating: number;
  reviews: number;
}

// List a book in the marketplace
export const listBookInMarketplace = async (bookId: string, price?: number): Promise<void> => {
  try {
    const userId = getCurrentUserId();
    
    // Get the book from user's collection
    const bookRef = ref(database, `users/${userId}/books/${bookId}`);
    const snapshot = await get(bookRef);
    
    if (!snapshot.exists()) {
      throw new Error("Book not found");
    }
    
    const book = snapshot.val();
    
    // Create marketplace listing
    const marketplaceBook: MarketplaceBook = {
      ...book,
      id: bookId,
      listedAt: new Date().toISOString(),
      price: price || 0,
      isFree: !price || price === 0,
      downloadCount: 0,
      rating: 0,
      reviews: 0,
    };
    
    // Add to marketplace
    const marketplaceRef = ref(database, `marketplace/${bookId}`);
    await set(marketplaceRef, marketplaceBook);
    
    // Update book status in user's collection
    await set(ref(database, `users/${userId}/books/${bookId}/isListed`), true);
    
    toast.success("Book listed in marketplace successfully!");
  } catch (error) {
    console.error("Error listing book:", error);
    toast.error("Failed to list book in marketplace");
    throw error;
  }
};

// Remove book from marketplace
export const removeBookFromMarketplace = async (bookId: string): Promise<void> => {
  try {
    const userId = getCurrentUserId();
    
    // Remove from marketplace
    await remove(ref(database, `marketplace/${bookId}`));
    
    // Update book status in user's collection
    await set(ref(database, `users/${userId}/books/${bookId}/isListed`), false);
    
    toast.success("Book removed from marketplace");
  } catch (error) {
    console.error("Error removing book from marketplace:", error);
    toast.error("Failed to remove book from marketplace");
    throw error;
  }
};

// Get marketplace books
export const getMarketplaceBooks = async (): Promise<MarketplaceBook[]> => {
  try {
    const marketplaceRef = ref(database, 'marketplace');
    const snapshot = await get(marketplaceRef);
    
    if (!snapshot.exists()) {
      return [];
    }
    
    const booksData = snapshot.val();
    const books = Object.keys(booksData).map(id => ({
      id,
      ...booksData[id]
    }));
    
    return books;
  } catch (error) {
    console.error("Error fetching marketplace books:", error);
    return [];
  }
};
