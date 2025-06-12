
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getMarketplaceBooks, MarketplaceBook } from '@/lib/api/marketplaceService';
import { Search, Download, Star, Filter, ArrowUpDown, Grid, List, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const MarketplacePage = () => {
  const [books, setBooks] = useState<MarketplaceBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<MarketplaceBook[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMarketplaceBooks();
  }, []);

  useEffect(() => {
    filterAndSortBooks();
  }, [books, searchTerm, categoryFilter, priceFilter, sortBy]);

  const loadMarketplaceBooks = async () => {
    try {
      const marketplaceBooks = await getMarketplaceBooks();
      setBooks(marketplaceBooks);
    } catch (error) {
      console.error('Error loading marketplace books:', error);
      toast.error('Failed to load marketplace books');
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortBooks = () => {
    let filtered = books;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(book => book.category === categoryFilter);
    }

    // Price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(book => book.isFree);
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(book => !book.isFree);
    }

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
        case 'oldest':
          return new Date(a.listedAt).getTime() - new Date(b.listedAt).getTime();
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  };

  const handleDownload = (book: MarketplaceBook) => {
    // Simulate download
    toast.success(`Downloaded "${book.title}"`);
  };

  const categories = [...new Set(books.map(book => book.category))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Marketplace</h1>
            <p className="text-gray-600">Discover and download books created by our community</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search books, authors, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="downloads">Most Downloaded</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </div>

        {/* Books Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {filteredBooks.map((book) => (
            <Card key={book.id} className={`hover:shadow-lg transition-shadow ${
              viewMode === 'list' ? 'flex flex-row' : ''
            }`}>
              <CardHeader className={viewMode === 'list' ? 'flex-1' : ''}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                    <CardDescription className="mt-1">
                      By {book.author || 'Unknown'}
                    </CardDescription>
                  </div>
                  {book.isFree ? (
                    <Badge variant="secondary">Free</Badge>
                  ) : (
                    <Badge variant="default">${book.price}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className={viewMode === 'list' ? 'flex-1' : ''}>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{book.rating.toFixed(1)}</span>
                    <span className="text-xs text-gray-500">({book.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{book.downloadCount}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">{book.category}</Badge>
                  <Badge variant="outline" className="text-xs">{book.type}</Badge>
                </div>
                
                <Button 
                  onClick={() => handleDownload(book)}
                  className="w-full"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
