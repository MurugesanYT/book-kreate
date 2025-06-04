
import React from 'react';
import { BookOpen, CheckCircle, TrendingUp } from 'lucide-react';

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

interface StatsSectionProps {
  books: BookSummary[];
}

const StatsSection = ({ books }: StatsSectionProps) => {
  const totalWords = books.reduce((acc, book) => acc + (book.chaptersCount * 1500), 0);
  const completedBooks = books.filter(book => book.progress === 100).length;

  if (books.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4 mx-auto">
          <BookOpen className="h-6 w-6 text-blue-600" />
        </div>
        <div className="text-3xl font-bold text-slate-800 mb-1">{books.length}</div>
        <div className="text-slate-600">Total Books</div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4 mx-auto">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <div className="text-3xl font-bold text-slate-800 mb-1">{completedBooks}</div>
        <div className="text-slate-600">Completed</div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4 mx-auto">
          <TrendingUp className="h-6 w-6 text-purple-600" />
        </div>
        <div className="text-3xl font-bold text-slate-800 mb-1">{totalWords.toLocaleString()}</div>
        <div className="text-slate-600">Est. Words</div>
      </div>
    </div>
  );
};

export default StatsSection;
