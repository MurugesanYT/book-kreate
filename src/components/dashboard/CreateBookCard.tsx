
import React from 'react';
import { PlusCircle } from 'lucide-react';

interface CreateBookCardProps {
  onCreateBook: () => void;
}

const CreateBookCard = ({ onCreateBook }: CreateBookCardProps) => {
  return (
    <div 
      className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border-3 border-dashed border-purple-300 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-400 hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
      onClick={onCreateBook}
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl">
        <PlusCircle size={40} className="text-purple-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-3">
        Create New Book
      </h3>
      <p className="text-slate-600 text-lg">
        Start your next literary adventure with AI
      </p>
    </div>
  );
};

export default CreateBookCard;
