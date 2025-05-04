import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Plus, ChevronRight, Book, Settings, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { BookData } from '@/lib/api/types';
import { listBooks } from '@/lib/api/bookService';
import { getUserPlan, PLANS, canCreateBook } from '@/lib/api/planService';

const DashboardHome = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [recentBooks, setRecentBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get the user's plan
  const userPlan = getUserPlan();
  const currentPlanDetails = PLANS[userPlan];
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookList = await listBooks();
        setBooks(bookList);
        
        // Get the 3 most recently updated books
        const sorted = [...bookList].sort((a, b) => {
          // Safely handle possibly invalid dates
          const dateA = new Date(a.updatedAt || 0).getTime();
          const dateB = new Date(b.updatedAt || 0).getTime();
          
          // If either date is invalid (NaN), use 0 as fallback
          return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
        });
        setRecentBooks(sorted.slice(0, 3));
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        toast({
          title: "Error loading books",
          description: "Please try again later",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, [toast]);
  
  const handleCreateBook = () => {
    // Check if user can create another book based on their plan
    if (canCreateBook(books)) {
      navigate('/book/create');
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-book-darkText">Dashboard</h1>
          <p className="text-slate-500">Manage your book projects</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            to="/account/plan" 
            className="bg-book-lightPurple/10 text-book-purple rounded-full px-4 py-1 text-sm font-medium hover:bg-book-lightPurple/20 transition-colors"
          >
            {userPlan} Plan
          </Link>
          <Button variant="outline" onClick={() => navigate('/account/settings')}>
            <Settings className="h-4 w-4 mr-2" />
            Account
          </Button>
          <Button onClick={handleCreateBook}>
            <Plus className="h-4 w-4 mr-2" />
            New Book
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Stats and quick access */}
        <div className="space-y-6">
          {/* User card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>My Account</CardTitle>
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium leading-none">Plan</div>
                  <div className="text-sm text-slate-500 flex items-center justify-between">
                    {userPlan} 
                    <Button variant="link" className="text-book-purple p-0 h-auto" asChild>
                      <Link to="/account/plan">Manage</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm font-medium leading-none">Books</div>
                  <div className="text-sm text-slate-500">
                    {books.length} / {currentPlanDetails.books === Infinity ? "∞" : currentPlanDetails.books}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm font-medium leading-none">Chapters per book</div>
                  <div className="text-sm text-slate-500">
                    Up to {currentPlanDetails.chapters === Infinity ? "∞" : currentPlanDetails.chapters}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/book/create">
                  <Plus className="mr-2 h-4 w-4" /> Create New Book
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/templates">
                  <Book className="mr-2 h-4 w-4" /> Browse Templates
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/account/plan">
                  <Settings className="mr-2 h-4 w-4" /> Manage Plan
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Main column - Book tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="all" className="flex-1">All Books ({books.length})</TabsTrigger>
              <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {loading ? (
                <div className="text-center py-12">Loading books...</div>
              ) : books.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-16 w-16 text-book-purple/30 mb-4" />
                    <h3 className="text-xl font-medium text-book-darkText mb-2">No books yet</h3>
                    <p className="text-slate-500 text-center max-w-md mb-6">
                      Create your first book to get started with Book-Kreate
                    </p>
                    <Button onClick={handleCreateBook}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Book
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {books.map((book) => (
                    <Card key={book.id} className="group hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                        <CardDescription className="flex justify-between">
                          <span>Updated: {formatDate(book.updatedAt)}</span>
                          <span>{book.chapters?.length || 0} chapters</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-32 relative mb-3">
                          <AspectRatio ratio={16/9}>
                            <div className="bg-slate-100 rounded-md flex items-center justify-center h-full overflow-hidden">
                              {book.coverImage ? (
                                <img 
                                  src={book.coverImage} 
                                  alt={book.title} 
                                  className="object-cover w-full h-full" 
                                />
                              ) : (
                                <BookOpen className="h-10 w-10 text-slate-300" />
                              )}
                            </div>
                          </AspectRatio>
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-2">
                          {book.description || "No description available"}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full group-hover:bg-book-purple/5" asChild>
                          <Link to={`/book/plan/${book.id}`}>
                            Continue <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              {loading ? (
                <div className="text-center py-12">Loading recent books...</div>
              ) : recentBooks.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-slate-500">No recent books</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {recentBooks.map((book) => (
                    <Card key={book.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 bg-slate-100 flex items-center justify-center p-4">
                          {book.coverImage ? (
                            <img 
                              src={book.coverImage} 
                              alt={book.title} 
                              className="object-cover h-32 md:h-full" 
                            />
                          ) : (
                            <BookOpen className="h-10 w-10 text-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <h3 className="font-medium text-lg mb-2">{book.title}</h3>
                          <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                            {book.description || "No description available"}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-slate-400">
                              Updated {formatDate(book.updatedAt)}
                            </div>
                            <Button size="sm" asChild>
                              <Link to={`/book/plan/${book.id}`}>
                                <Pencil className="h-3 w-3 mr-1" />
                                Continue Editing
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
