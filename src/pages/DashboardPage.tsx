
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { listBooks, deleteBook } from '@/lib/api';
import { PlusCircle, BookOpen, Trash2, LogOut } from 'lucide-react';
import { BookDocument } from '@/lib/api/bookService';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DashboardPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const userBooks = await listBooks();
      setBooks(userBooks);
    } catch (error) {
      console.error("Failed to load books:", error);
      toast.error("Failed to load your books");
    } finally {
      setLoading(false);
    }
  };

  const handleNewBook = () => {
    navigate('/book/create');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const confirmDeleteBook = (bookId: string) => {
    setBookToDelete(bookId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteBook = async () => {
    if (!bookToDelete) return;

    try {
      await deleteBook(bookToDelete);
      setBooks(books.filter(book => book.id !== bookToDelete));
      toast.success("Book deleted successfully");
    } catch (error) {
      console.error("Failed to delete book:", error);
      toast.error("Failed to delete book");
    } finally {
      setIsDeleteDialogOpen(false);
      setBookToDelete(null);
    }
  };

  const getCompletionPercentage = (book: BookDocument) => {
    if (!book.tasks || !Array.isArray(book.tasks) || book.tasks.length === 0) {
      return 0;
    }
    
    const completedTasks = book.tasks.filter(task => task.status === 'completed');
    return Math.round((completedTasks.length / book.tasks.length) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
                Book-Kreate
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && (
              <>
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || "User"}
                    className="w-10 h-10 rounded-full border-2 border-book-purple"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-book-purple text-white flex items-center justify-center font-semibold">
                    {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || "U"}
                  </div>
                )}
                
                <Button variant="ghost" onClick={handleLogout} className="text-slate-700">
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Books</h1>
            <p className="text-slate-500">
              {currentUser?.displayName ? `Welcome back, ${currentUser.displayName}!` : "Welcome to your dashboard"}
            </p>
          </div>
          
          <Button onClick={handleNewBook} className="bg-book-purple hover:bg-book-purple/90">
            <PlusCircle size={18} className="mr-2" />
            Create New Book
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded-md w-full mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded-md w-5/6"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card key={book.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-1">{book.title}</h2>
                    <p className="text-slate-500 text-sm mb-3">{book.type} • {book.category}</p>
                    <p className="text-slate-700 line-clamp-2">{book.description}</p>
                  </div>
                  
                  <div className="mt-4 mb-4">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-book-purple h-2 rounded-full"
                        style={{ width: `${getCompletionPercentage(book)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-500">
                        Progress: {getCompletionPercentage(book)}%
                      </span>
                      <span className="text-xs text-slate-500">
                        {book.tasks && Array.isArray(book.tasks) ? 
                          `${book.tasks.filter(t => t.status === 'completed').length} of ${book.tasks.length} tasks` :
                          "0 of 0 tasks"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Link to={`/book/plan/${book.id}`}>
                      <Button variant="outline" className="text-book-purple border-book-purple/30 hover:bg-book-purple/10">
                        <BookOpen size={16} className="mr-2" />
                        Open Book
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => confirmDeleteBook(book.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-slate-200">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No Books Yet</h2>
            <p className="text-slate-600 mb-6">Create your first book to get started</p>
            <Button onClick={handleNewBook} className="bg-book-purple hover:bg-book-purple/90">
              <PlusCircle size={18} className="mr-2" />
              Create New Book
            </Button>
          </div>
        )}
      </main>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this book?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The book and all its content will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBook} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardPage;
