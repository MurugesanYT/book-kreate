
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, FileText } from 'lucide-react';
import BookActions from './BookActions';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    type: string;
    category: string;
    timestamp: string;
    progress: number;
    chaptersCount: number;
    completedChaptersCount: number;
    isListed?: boolean;
  };
  onView: (bookId: string) => void;
  onDelete: (bookId: string) => void;
  onRename: (bookId: string, newTitle: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onView, onDelete, onRename }) => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold text-gray-800 truncate pr-2">
              {book.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {book.type}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {book.category}
              </Badge>
              {book.isListed && (
                <Badge className="text-xs bg-green-100 text-green-800">
                  Listed
                </Badge>
              )}
            </CardDescription>
          </div>
          <BookActions
            bookId={book.id}
            bookTitle={book.title}
            isListed={book.isListed}
            onRename={(newTitle) => onRename(book.id, newTitle)}
            onDelete={() => onDelete(book.id)}
          />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-800">{book.progress}%</span>
            </div>
            <Progress 
              value={book.progress} 
              className="h-2"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="h-4 w-4" />
              <span>{book.completedChaptersCount}/{book.chaptersCount} chapters</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(book.timestamp)}</span>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => onView(book.id)}
            className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-medium"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Continue Writing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
