
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Plus, Clock, CheckCircle, FileText, Crown, Settings, Sparkles, TrendingUp, Zap, Target, BarChart3 } from 'lucide-react';
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

  const totalWords = books.reduce((acc, book) => {
    const chaptersWords = book.chapters?.reduce((chapterAcc, chapter) => {
      return chapterAcc + (chapter.content ? chapter.content.split(' ').length : 0);
    }, 0) || 0;
    return acc + chaptersWords;
  }, 0);

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Section */}
      <div className="relative bg-gradient-to-br from-book-purple via-book-lightPurple to-book-orange rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-6 right-6 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-6 left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6 backdrop-blur-sm">
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-2">
                  Welcome back, {currentUser?.displayName?.split(' ')[0] || 'Creator'}!
                </h1>
                <p className="text-white/90 text-lg">
                  Ready to bring your next story to life with AI?
                </p>
              </div>
            </div>
            {currentUser?.photoURL && (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || "User"} 
                className="w-16 h-16 rounded-2xl border-3 border-white/30 shadow-xl"
              />
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-white text-book-purple hover:bg-white/90 font-semibold px-8 py-3 rounded-xl shadow-lg">
              <Link to="/create-book">
                <Zap className="mr-2 h-5 w-5" />
                Create New Book
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <Link to="/account/settings">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-book-purple/20 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Books</p>
                <p className="text-3xl font-bold text-gray-900">{books.length}</p>
                <p className="text-xs text-gray-500 mt-1">Stories created</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-book-purple to-book-lightPurple rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Chapters</p>
                <p className="text-3xl font-bold text-gray-900">
                  {books.reduce((acc, book) => acc + (book.chapters?.length || 0), 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Chapters written</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-amber-200 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-gray-900">
                  {books.filter(book => book.status === 'draft').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Active projects</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Words Written</p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalWords.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total word count</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Books Section */}
      <Card className="shadow-xl border-2 border-gray-100">
        <CardHeader className="pb-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-2xl flex items-center">
              <TrendingUp className="h-6 w-6 mr-3 text-book-purple" />
              Your Creative Library
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild className="hover:bg-book-purple hover:text-white transition-colors">
                <Link to="/account/plan">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade Plan
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-book-purple border-t-transparent mx-auto mb-6"></div>
              <p className="text-gray-500 text-lg">Loading your creative works...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-book-purple/10 to-book-orange/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <BookOpen className="h-12 w-12 text-book-purple" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Your story begins here</h3>
              <p className="text-gray-500 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
                Create your first book with our AI-powered writing assistant. From concept to completion, 
                we'll help you craft compelling stories that captivate readers.
              </p>
              <Button asChild className="bg-gradient-to-r from-book-purple to-book-orange hover:opacity-90 shadow-lg px-8 py-6 text-lg rounded-2xl">
                <Link to="/create-book">
                  <Plus className="mr-3 h-5 w-5" />
                  Start Your First Book
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Card key={book.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-book-purple/20 bg-gradient-to-br from-white to-gray-50/50">
                  <Link to={`/book/${book.id}`}>
                    <CardContent className="p-6">
                      <div className="aspect-[4/3] bg-gradient-to-br from-book-lightPurple/30 via-book-purple/20 to-book-orange/30 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-inner">
                        <BookOpen className="h-12 w-12 text-book-purple drop-shadow-lg" />
                      </div>
                      <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-book-purple transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {book.description}
                      </p>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="px-3 py-1 bg-book-purple/10 text-book-purple rounded-full font-medium capitalize">
                          {book.status}
                        </span>
                        <span className="text-gray-500 font-medium">
                          {book.chapters?.length || 0} chapters
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 border-t pt-3">
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
