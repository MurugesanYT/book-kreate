
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Plus, Clock, CheckCircle, FileText, Crown, Settings } from 'lucide-react';
import { Book } from '@/lib/api/types';
import { getAllBooks } from '@/lib/api/bookService';
import { toast } from 'sonner';

const DashboardHome = () => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const fetchedBooks = await getAllBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        toast.error("Failed to load books. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-book-darkText">
            Welcome back, {currentUser?.displayName?.split(' ')[0] || 'Creator'}!
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Ready to create your next masterpiece?
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/create-book">
              <Plus className="mr-2 h-4 w-4" />
              New Book
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="/account/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Account Settings</span>
              <span className="sm:hidden">Settings</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-book-purple" />
              <div className="ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Books</p>
                <p className="text-xl sm:text-2xl font-bold">{books.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-book-orange" />
              <div className="ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Chapters</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {books.reduce((acc, book) => acc + (book.chapters?.length || 0), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {books.filter(book => (book as any).status === 'draft').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {books.filter(book => (book as any).status === 'published').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Books */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl">Your Books</CardTitle>
            <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
              <Link to="/account/plan">
                <Crown className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Manage Plan</span>
                <span className="sm:hidden">Plan</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-book-purple mx-auto"></div>
              <p className="text-gray-500 mt-2 text-sm">Loading your books...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No books yet</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                Get started by creating your first book. Our AI will help you bring your ideas to life.
              </p>
              <Button asChild className="mt-6 w-full sm:w-auto">
                <Link to="/create-book">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Book
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link to={`/book/${book.id}`}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="aspect-[3/4] bg-gradient-to-br from-book-lightPurple to-book-orange rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                      </div>
                      <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-book-purple transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                        {book.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="capitalize">{(book as any).status || 'draft'}</span>
                        <span>{book.chapters?.length || 0} chapters</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
