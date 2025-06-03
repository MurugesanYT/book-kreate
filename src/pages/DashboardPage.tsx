
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
import { BookOpen, LogOut, PlusCircle, Clock, CheckCircle, Trash2, MoreVertical, Star, TrendingUp } from 'lucide-react';
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
  progress: number;
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
      
      const booksWithProgress = storedBooks.map((book: any) => {
        const bookData = JSON.parse(localStorage.getItem(`book_${book.id}`) || '{}');
        const planItems = bookData.tasks || [];
        
        const chaptersCount = book.chapters?.length || 0;
        const completedChaptersCount = (book.chapters || []).filter((ch: any) => ch.content && ch.content.length > 100).length;
        
        const totalTasks = planItems.length || 1;
        const completedTasks = planItems.filter((item: any) => item.status === 'completed').length;
        
        const chapterProgress = chaptersCount > 0 ? (completedChaptersCount / chaptersCount) * 70 : 0;
        const taskProgress = (completedTasks / totalTasks) * 30;
        
        const progress = Math.round(chapterProgress + taskProgress);
        
        return {
          id: book.id,
          title: book.title,
          type: book.type,
          category: book.category,
          timestamp: book.timestamp,
          progress: Math.min(Math.max(progress, 0), 100),
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
      
      const storedBooks = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
      const updatedBooks = storedBooks.filter((book: any) => book.id !== bookId);
      
      localStorage.setItem('bookKreateBooks', JSON.stringify(updatedBooks));
      localStorage.removeItem(`book_${bookId}`);
      localStorage.removeItem(`bookPlan_${bookId}`);
      
      setBooks(books.filter(book => book.id !== bookId));
      
      toast.success("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Loading your dashboard...</h2>
          <p className="text-slate-600">Preparing your writing workspace</p>
        </div>
      </div>
    );
  }
  
  if (!currentUser && !loading) {
    return <Navigate to="/auth" replace />;
  }

  const sortedBooks = [...books].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const totalWords = sortedBooks.reduce((acc, book) => acc + (book.chaptersCount * 1500), 0);
  const completedBooks = sortedBooks.filter(book => book.progress === 100).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Enhanced Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center text-white mr-4 shadow-xl">
              <span className="text-xl font-bold">BK</span>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                Book-Kreate
              </span>
              <p className="text-sm text-slate-500 mt-1">Your AI Writing Companion</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && currentUser.photoURL && (
              <div className="relative">
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || "User"} 
                  className="w-12 h-12 rounded-2xl border-3 border-purple-200 shadow-lg hover:shadow-xl transition-shadow"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              className="text-purple-600 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              onClick={logOut}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Welcome Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full text-white mb-8 shadow-2xl">
            <BookOpen className="h-12 w-12" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4 leading-tight">
            Welcome back, <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">{currentUser?.displayName?.split(' ')[0] || "Creator"}</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Continue your writing journey or start a new masterpiece with our AI-powered tools
          </p>

          {/* Enhanced Stats Section */}
          {sortedBooks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4 mx-auto">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{sortedBooks.length}</div>
                <div className="text-slate-600">Total Books</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4 mx-auto">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{completedBooks}</div>
                <div className="text-slate-600">Completed</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4 mx-auto">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{totalWords.toLocaleString()}</div>
                <div className="text-slate-600">Est. Words</div>
              </div>
            </div>
          )}
          
          <Button 
            className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg font-semibold transform hover:scale-105"
            onClick={handleCreateBook}
          >
            <BookOpen size={20} className="mr-3" />
            Create New Masterpiece
          </Button>
        </div>
        
        {sortedBooks.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-16 text-center border border-purple-100">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <BookOpen className="h-16 w-16 text-purple-600" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-slate-800">
              Your Writing Journey Starts Here
            </h2>
            <p className="text-slate-600 mb-10 text-xl max-w-2xl mx-auto leading-relaxed">
              Ready to create your first masterpiece? Our advanced AI will help you transform your ideas into a complete book, chapter by chapter.
            </p>
            
            <Button 
              className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-10 py-5 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105" 
              onClick={handleCreateBook}
            >
              <BookOpen size={24} className="mr-3" />
              Begin Your Story
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Enhanced Create New Book Card */}
            <div 
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border-3 border-dashed border-purple-300 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-400 hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              onClick={handleCreateBook}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl">
                <PlusCircle size={40} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Create New Book
              </h3>
              <p className="text-slate-600 text-lg">
                Start your next literary adventure with AI
              </p>
            </div>
            
            {/* Enhanced Book Cards */}
            {sortedBooks.map((book) => (
              <div 
                key={book.id} 
                className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-purple-100 group"
              >
                <div className="h-3 bg-gradient-to-r from-purple-600 to-orange-500"></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 
                        className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors leading-tight"
                        onClick={() => handleViewBook(book.id)}
                      >
                        {book.title || "Untitled Book"}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                          {book.type}
                        </span>
                        <span className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                          {book.category}
                        </span>
                        {book.chaptersCount > 0 && (
                          <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                            {book.completedChaptersCount}/{book.chaptersCount} chapters
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-slate-100 rounded-full">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-lg shadow-2xl border border-purple-100 rounded-2xl">
                        <DropdownMenuItem onClick={() => handleViewBook(book.id)} className="rounded-xl">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Open Book
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600 rounded-xl">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Book
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white/95 backdrop-blur-lg rounded-3xl border border-purple-100">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-2xl font-bold">Delete Book</AlertDialogTitle>
                              <AlertDialogDescription className="text-lg">
                                Are you sure you want to delete "{book.title}"? This action cannot be undone and all content will be permanently lost.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-red-500 text-white hover:bg-red-600 rounded-xl"
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
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-slate-500 flex items-center bg-slate-50 px-3 py-1 rounded-full">
                      <Clock size={14} className="mr-2" />
                      {new Date(book.timestamp).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-semibold">
                      {book.progress === 100 ? (
                        <span className="text-green-600 flex items-center bg-green-50 px-3 py-1 rounded-full">
                          <CheckCircle size={16} className="mr-1" />
                          Complete
                        </span>
                      ) : (
                        <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{book.progress}% Complete</span>
                      )}
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-3 mb-6 shadow-inner">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 shadow-lg ${
                        book.progress === 100 
                          ? 'bg-gradient-to-r from-green-400 to-green-600' 
                          : 'bg-gradient-to-r from-purple-600 to-orange-500'
                      }`}
                      style={{ width: `${book.progress}%` }}
                    ></div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold" 
                    onClick={() => handleViewBook(book.id)}
                  >
                    <BookOpen size={18} className="mr-2" />
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
