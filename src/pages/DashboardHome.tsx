
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Plus, Clock, CheckCircle, FileText, Crown, Settings, Sparkles, TrendingUp } from 'lucide-react';
import { Book } from '@/lib/api/types';
import { getBooks } from '@/lib/api/bookService';
import { toast } from 'sonner';

const DashboardHome = () => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const fetchedBooks = await getBooks();
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-book-purple via-book-lightPurple to-book-orange rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Welcome back, {currentUser?.displayName?.split(' ')[0] || 'Creator'}!
              </h1>
              <p className="text-white/90 mt-1">
                Ready to create your next masterpiece?
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button asChild className="bg-white text-book-purple hover:bg-white/90 font-semibold">
              <Link to="/create-book">
                <Plus className="mr-2 h-4 w-4" />
                New Book
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              <Link to="/account/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-book-purple/10 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-book-purple" />
              </div>
              <div className="ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Books</p>
                <p className="text-xl sm:text-2xl font-bold">{books.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-500" />
              </div>
              <div className="ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Chapters</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {books.reduce((acc, book) => acc + (book.chapters?.length || 0), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <div className="ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {books.filter(book => book.status === 'draft').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {books.filter(book => book.status === 'published').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Books */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-book-purple" />
              Your Books
            </CardTitle>
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
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-book-purple border-t-transparent mx-auto"></div>
              <p className="text-gray-500 mt-4 text-sm">Loading your books...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-20 h-20 bg-book-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-book-purple" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No books yet</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
                Get started by creating your first book. Our AI will help you bring your ideas to life with professional structure and engaging content.
              </p>
              <Button asChild className="bg-gradient-to-r from-book-purple to-book-orange hover:opacity-90 shadow-lg">
                <Link to="/create-book">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Book
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-book-purple/20">
                  <Link to={`/book/${book.id}`}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="aspect-[4/3] bg-gradient-to-br from-book-lightPurple/20 via-book-purple/20 to-book-orange/20 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 text-book-purple" />
                      </div>
                      <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-book-purple transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                        {book.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span className="capitalize font-medium">{book.status}</span>
                        <span>{book.chapters?.length || 0} chapters</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Updated {formatTimeAgo(book.updatedAt || book.createdAt || '')}
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
