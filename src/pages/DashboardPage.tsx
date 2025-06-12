
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsSection from '@/components/dashboard/StatsSection';
import BookGrid from '@/components/dashboard/BookGrid';

interface BookSummary {
  id: string;
  title: string;
  type: string;
  category: string;
  timestamp: string;
  progress: number;
  chaptersCount: number;
  completedChaptersCount: number;
  isListed?: boolean;
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
          completedChaptersCount,
          isListed: book.isListed || false
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

  const handleRenameBook = (bookId: string, newTitle: string) => {
    try {
      const storedBooks = JSON.parse(localStorage.getItem('bookKreateBooks') || '[]');
      const updatedBooks = storedBooks.map((book: any) => 
        book.id === bookId ? { ...book, title: newTitle } : book
      );
      
      localStorage.setItem('bookKreateBooks', JSON.stringify(updatedBooks));
      
      setBooks(books.map(book => 
        book.id === bookId ? { ...book, title: newTitle } : book
      ));
      
      toast.success("Book renamed successfully");
    } catch (error) {
      console.error("Error renaming book:", error);
      toast.error("Failed to rename book");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <DashboardHeader currentUser={currentUser} onLogOut={logOut} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <WelcomeSection currentUser={currentUser} onCreateBook={handleCreateBook} />
        <StatsSection books={books} />
        <BookGrid 
          books={books}
          onCreateBook={handleCreateBook}
          onViewBook={handleViewBook}
          onDeleteBook={handleDeleteBook}
          onRenameBook={handleRenameBook}
        />
      </main>
    </div>
  );
};

export default DashboardPage;
