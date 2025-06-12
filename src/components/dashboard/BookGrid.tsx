
import React from 'react';
import { BookOpen } from 'lucide-react';
import CreateBookCard from './CreateBookCard';
import BookCard from './BookCard';

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

interface BookGridProps {
  books: BookSummary[];
  onCreateBook: () => void;
  onViewBook: (bookId: string) => void;
  onDeleteBook: (bookId: string) => void;
  onRenameBook: (bookId: string, newTitle: string) => void;
}

const BookGrid = ({ books, onCreateBook, onViewBook, onDeleteBook, onRenameBook }: BookGridProps) => {
  const sortedBooks = [...books].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (books.length === 0) {
    return (
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
        
        <button 
          className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-10 py-5 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105" 
          onClick={onCreateBook}
        >
          <BookOpen size={24} className="mr-3 inline" />
          Begin Your Story
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <CreateBookCard onCreateBook={onCreateBook} />
      {sortedBooks.map((book) => (
        <BookCard 
          key={book.id} 
          book={book}
          onView={onViewBook}
          onDelete={onDeleteBook}
          onRename={onRenameBook}
        />
      ))}
    </div>
  );
};

export default BookGrid;
