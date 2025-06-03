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
import { BookOpen, LogOut, PlusCircle, Clock, CheckCircle, Trash2, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BookSummary {
  id: string;
  title: string;
  type: string;
  category: string;
  timestamp: string;
  progress: number; // 0-100
  chaptersCount: number;
  completedChaptersCount: number;
}

const DashboardPage = () => {
  const { currentUser, logOut, loading } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookSummary[]>([]);
  
  useEffect(() => {
    loadBooks();
  }, []);
  
  const loadBooks = () => {
    try {
      const storedBooks = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
      
      // Calculate progress for each book
      const booksWithProgress = storedBooks.map((book: any) => {
        // Get book-specific data
        const bookData = JSON.parse(localStorage.getItem(`book_${book.id}`) || '{}');
        const planItems = bookData.tasks || [];
        
        // Count chapters and completed items
        const chaptersCount = book.chapters?.length || 0;
        const completedChaptersCount = (book.chapters || []).filter((ch: any) => ch.content && ch.content.length > 100).length;
        
        // Calculate book completion progress - more accurate calculation
        const totalTasks = planItems.length || 1;
        const completedTasks = planItems.filter((item: any) => item.status === 'completed').length;
        
        // Weight the progress based on chapters (70%) and tasks (30%)
        const chapterProgress = chaptersCount > 0 ? (completedChaptersCount / chaptersCount) * 70 : 0;
        const taskProgress = (completedTasks / totalTasks) * 30;
        
        // Combined progress
        const progress = Math.round(chapterProgress + taskProgress);
        
        return {
          id: book.id,
          title: book.title,
          type: book.type,
          category: book.category,
          timestamp: book.timestamp,
          progress: Math.min(Math.max(progress, 0), 100), // Ensure between 0-100
          chaptersCount,
          completedChaptersCount
        };
      });
      
      setBooks(booksWithProgress);
    } catch (error) {
      console.error("Error loading books:", error);
      toast.error("Failed to load your books");
    }
  };
  
  const handleCreateBook = () => {
    navigate('/book/create');
  };
  
  const handleViewBook = (bookId: string) => {
    navigate(`/book/plan/${bookId}`);
  };

  const handleDeleteBook = (bookId: string) => {
    try {
      console.log("Deleting book with ID:", bookId);
      
      // Get current books from localStorage
      const storedBooks = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
      
      // Filter out the book to delete
      const updatedBooks = storedBooks.filter((book: any) => book.id !== bookId);
      
      // Save updated books list back to localStorage
      localStorage.setItem('bookKreateBooks', JSON.stringify(updatedBooks));
      
      // Remove book data
      localStorage.removeItem(`book_${bookId}`);
      localStorage.removeItem(`bookPlan_${bookId}`);
      
      // Update state to reflect changes
      setBooks(books.filter(book => book.id !== bookId));
      
      toast.success("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-opacity-25 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!currentUser && !loading) {
    return <Navigate to="/auth" replace />;
  }

  // Sort books by most recent
  const sortedBooks = [...books].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <header className="bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center text-white mr-3 shadow-lg">
              <span className="text-xl font-bold">BK</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Book-Kreate
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && currentUser.photoURL && (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || "User"} 
                className="w-12 h-12 rounded-2xl border-2 border-purple-200 shadow-md"
              />
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
              onClick={logOut}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Welcome back, {currentUser?.displayName || "Creator"}
            </h1>
            <p className="text-slate-600 text-lg">Continue your writing journey or start a new masterpiece</p>
          </div>
          
          <Button 
            className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleCreateBook}
          >
            <BookOpen size={18} className="mr-2" />
            Create New Book
          </Button>
        </div>
        
        {sortedBooks.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-slate-200/50">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <BookOpen className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-800">
              Your Writing Journey Starts Here
            </h2>
            <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
              Ready to create your first masterpiece? Our AI will help you transform your ideas into a complete book.
            </p>
            
            <Button 
              className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200" 
              onClick={handleCreateBook}
            >
              <BookOpen size={20} className="mr-3" />
              Start Writing Your Book
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border-2 border-dashed border-purple-300/50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-400 hover:bg-white/80 transition-all duration-300 hover:scale-105"
              onClick={handleCreateBook}
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center mb-6">
                <PlusCircle size={36} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Create New Book
              </h3>
              <p className="text-slate-600 text-lg">
                Start your next literary adventure with AI
              </p>
            </div>
            
            {sortedBooks.map((book) => (
              <div 
                key={book.id} 
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-slate-200/50"
              >
                <div className="h-2 bg-gradient-to-r from-purple-600 to-orange-500"></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 
                      className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors"
                      onClick={() => handleViewBook(book.id)}
                    >
                      {book.title || "Untitled Book"}
                    </h3>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewBook(book.id)}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Open Book
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Book
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Book</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{book.title}"? This action cannot be undone and all content will be permanently lost.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() => handleDeleteBook(book.id)}
                              >
                                Delete Book
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div 
                    className="flex flex-wrap gap-2 mb-6 cursor-pointer"
                    onClick={() => handleViewBook(book.id)}
                  >
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      {book.type}
                    </span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                      {book.category}
                    </span>
                    {book.chaptersCount > 0 && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {book.completedChaptersCount}/{book.chaptersCount} chapters
                      </span>
                    )}
                  </div>
                  
                  <div 
                    className="flex items-center justify-between mb-4 cursor-pointer"
                    onClick={() => handleViewBook(book.id)}
                  >
                    <span className="text-sm text-slate-500 flex items-center">
                      <Clock size={14} className="mr-2" />
                      {new Date(book.timestamp).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-semibold">
                      {book.progress === 100 ? (
                        <span className="text-green-600 flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          Complete
                        </span>
                      ) : (
                        <span className="text-purple-600">{book.progress}% Complete</span>
                      )}
                    </span>
                  </div>
                  
                  <div 
                    className="w-full bg-slate-200 rounded-full h-2 cursor-pointer mb-6"
                    onClick={() => handleViewBook(book.id)}
                  >
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        book.progress === 100 
                          ? 'bg-gradient-to-r from-green-400 to-green-600' 
                          : 'bg-gradient-to-r from-purple-600 to-orange-500'
                      }`}
                      style={{ width: `${book.progress}%` }}
                    ></div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
                    onClick={() => handleViewBook(book.id)}
                  >
                    <BookOpen size={16} className="mr-2" />
                    Continue Writing
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
