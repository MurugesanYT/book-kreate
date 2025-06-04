
import React from 'react';
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Clock, CheckCircle, Trash2, MoreVertical } from 'lucide-react';

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

interface BookCardProps {
  book: BookSummary;
  onViewBook: (bookId: string) => void;
  onDeleteBook: (bookId: string) => void;
}

const BookCard = ({ book, onViewBook, onDeleteBook }: BookCardProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-purple-100 group">
      <div className="h-3 bg-gradient-to-r from-purple-600 to-orange-500"></div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 
              className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors leading-tight"
              onClick={() => onViewBook(book.id)}
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
              <DropdownMenuItem onClick={() => onViewBook(book.id)} className="rounded-xl">
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
                      onClick={() => onDeleteBook(book.id)}
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
          onClick={() => onViewBook(book.id)}
        >
          <BookOpen size={18} className="mr-2" />
          Continue Writing
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
