
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, LogOut, PlusCircle, Clock, CheckCircle, Trash2, Sparkles, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { listBooks, deleteBook } from '@/lib/api/bookService';
import { getDocument } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BookSummary {
  id: string;
  title: string;
  type: string;
  category: string;
  timestamp: string | any;
  progress: number; // 0-100
  description?: string;
}

const DashboardPage = () => {
  const { currentUser, logOut, loading } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookSummary[]>([]);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    loadBooks();
  }, [currentUser]);
  
  const loadBooks = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      // Get all books from Firebase
      const booksList = await listBooks();
      
      // Calculate progress for each book
      const booksPromise = booksList.map(async (book: any) => {
        try {
          // Try to get the book plan from Firebase
          const bookPlan = await getDocument('bookPlans', book.id);
          const planItems = bookPlan?.items || [];
          const totalItems = planItems.length || 1;
          const completedItems = planItems.filter((item: any) => item.status === 'completed').length;
          const progress = Math.round((completedItems / totalItems) * 100);
          
          return {
            id: book.id,
            title: book.title,
            type: book.type,
            category: book.category,
            timestamp: book.createdAt ? book.createdAt.toDate().toISOString() : book.timestamp,
            progress,
            description: book.description || ''
          };
        } catch (error) {
          console.error("Error processing book progress:", error);
          return {
            id: book.id,
            title: book.title,
            type: book.type,
            category: book.category,
            timestamp: book.createdAt ? book.createdAt.toDate().toISOString() : book.timestamp,
            progress: 0,
            description: book.description || ''
          };
        }
      });
      
      const booksWithProgress = await Promise.all(booksPromise);
      setBooks(booksWithProgress);
    } catch (error) {
      console.error("Error loading books:", error);
      toast.error("Failed to load your books");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateBook = () => {
    navigate('/book/create');
  };
  
  const handleViewBook = (bookId: string) => {
    navigate(`/book/plan/${bookId}`);
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      console.log("Deleting book with ID:", bookId);
      
      // Delete book from Firebase
      await deleteBook(bookId);
      
      // Update state to reflect changes
      setBooks(books.filter(book => book.id !== bookId));
      
      toast.success("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    } finally {
      setBookToDelete(null);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-book-lightGray">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-purple"></div>
          <p className="text-book-purple font-medium">Loading your creative space...</p>
        </div>
      </div>
    );
  }
  
  if (!currentUser && !loading) {
    return <Navigate to="/auth" replace />;
  }

  const filteredBooks = activeTab === 'all' 
    ? books 
    : activeTab === 'completed' 
      ? books.filter(book => book.progress === 100)
      : books.filter(book => book.progress < 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-book-lightGray/40">
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => navigate('/')} className="flex items-center hover:opacity-80 transition-opacity">
              <span className="text-xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
                Book-Kreate
              </span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && (
              <div className="flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || "User"} 
                    className="w-10 h-10 rounded-full border-2 border-book-purple"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-book-purple/20 flex items-center justify-center text-book-purple font-bold">
                    {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : "U"}
                  </div>
                )}
                <div className="hidden md:block">
                  <p className="font-medium text-book-darkText">{currentUser.displayName || currentUser.email}</p>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              className="text-book-purple border-book-purple hover:bg-book-purple/10"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-book-darkText">
              Welcome, {currentUser?.displayName || "Creator"}
            </h1>
            <p className="text-slate-600 mt-1">
              Your creative dashboard awaits. Ready to craft your next masterpiece?
            </p>
          </div>
          
          <Button 
            className="bg-book-purple hover:bg-book-purple/90 shadow-md hover:shadow-lg transition-all"
            onClick={handleCreateBook}
            size="lg"
          >
            <Sparkles size={16} className="mr-2" />
            Create New Book
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Books</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden p-6 space-y-4">
                <Skeleton className="h-7 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredBooks.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-book-purple/10 flex items-center justify-center mb-4">
                  <BookOpen size={32} className="text-book-purple" />
                </div>
                <h2 className="text-xl font-semibold mb-3 text-book-darkText">
                  {activeTab === 'all' 
                    ? "No Books Yet"
                    : activeTab === 'completed' 
                      ? "No Completed Books"
                      : "No Books In Progress"}
                </h2>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  {activeTab === 'all' 
                    ? "You haven't created any books yet. Get started by clicking the "Create New Book" button."
                    : activeTab === 'completed' 
                      ? "You haven't completed any books yet. Keep working on your in-progress books!"
                      : "You don't have any books in progress. Start creating a new book!"}
                </p>
                
                {activeTab !== 'all' ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('all')}
                    className="mx-auto"
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    View All Books
                  </Button>
                ) : (
                  <Button 
                    className="mx-auto py-6 bg-book-purple hover:bg-book-purple/90 shadow-md" 
                    onClick={handleCreateBook}
                  >
                    <Sparkles size={18} className="mr-2" />
                    Generate Book with AI
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === 'all' && (
                  <div 
                    className="bg-white rounded-lg shadow-md p-6 border-2 border-dashed border-book-purple/30 flex flex-col items-center justify-center text-center cursor-pointer hover:border-book-purple transition-colors h-full"
                    onClick={handleCreateBook}
                  >
                    <div className="w-16 h-16 rounded-full bg-book-purple/10 flex items-center justify-center mb-4">
                      <PlusCircle size={32} className="text-book-purple" />
                    </div>
                    <h3 className="text-lg font-semibold text-book-darkText mb-2">
                      Create New Book
                    </h3>
                    <p className="text-slate-500">
                      Start generating your next masterpiece with AI
                    </p>
                  </div>
                )}
                
                {filteredBooks.map((book) => (
                  <div 
                    key={book.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-slate-100"
                  >
                    <div className="h-3 bg-gradient-to-r from-book-purple to-book-orange"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 
                          className="text-lg font-semibold text-book-darkText mb-1 line-clamp-1 cursor-pointer hover:text-book-purple transition-colors"
                          onClick={() => handleViewBook(book.id)}
                        >
                          {book.title || "Untitled Book"}
                        </h3>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:bg-red-50 hover:text-red-600 -mt-1"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Book</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{book.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() => handleDeleteBook(book.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      
                      <div 
                        className="flex flex-wrap gap-2 mb-4 cursor-pointer"
                        onClick={() => handleViewBook(book.id)}
                      >
                        <span className="bg-book-purple/10 text-book-purple px-2 py-0.5 rounded-full text-xs font-medium">
                          {book.type}
                        </span>
                        <span className="bg-book-orange/10 text-book-orange px-2 py-0.5 rounded-full text-xs font-medium">
                          {book.category}
                        </span>
                      </div>
                      
                      <p 
                        className="text-sm text-slate-600 mb-4 line-clamp-2 cursor-pointer"
                        onClick={() => handleViewBook(book.id)}
                      >
                        {book.description || "No description available."}
                      </p>
                      
                      <div 
                        className="flex items-center justify-between mb-2 cursor-pointer"
                        onClick={() => handleViewBook(book.id)}
                      >
                        <span className="text-sm text-slate-500 flex items-center">
                          <Clock size={14} className="mr-1" />
                          {new Date(book.timestamp).toLocaleDateString()}
                        </span>
                        <span className="text-sm font-medium">
                          {book.progress === 100 ? (
                            <span className="text-green-600 flex items-center">
                              <CheckCircle size={14} className="mr-1" />
                              Complete
                            </span>
                          ) : (
                            <span className="text-book-purple">{book.progress}% Complete</span>
                          )}
                        </span>
                      </div>
                      
                      <Progress 
                        value={book.progress} 
                        className="h-1.5 bg-slate-200"
                        indicatorClassName={book.progress === 100 ? "bg-green-500" : "bg-book-purple"}
                      />
                      
                      <div className="mt-4">
                        <Button 
                          className="w-full mt-2 bg-book-purple hover:bg-book-purple/90" 
                          onClick={() => handleViewBook(book.id)}
                        >
                          <BookOpen size={14} className="mr-2" />
                          {book.progress === 0 ? "Start" : book.progress === 100 ? "View" : "Continue"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
