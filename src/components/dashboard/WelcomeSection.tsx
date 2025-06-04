
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';

interface WelcomeSectionProps {
  currentUser: any;
  onCreateBook: () => void;
}

const WelcomeSection = ({ currentUser, onCreateBook }: WelcomeSectionProps) => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full text-white mb-8 shadow-2xl">
        <BookOpen className="h-12 w-12" />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4 leading-tight">
        Welcome back, <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">{currentUser?.displayName?.split(' ')[0] || "Creator"}</span>
      </h1>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
        Continue your writing journey or start a new masterpiece with our AI-powered tools
      </p>
      
      <Button 
        className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg font-semibold transform hover:scale-105"
        onClick={onCreateBook}
      >
        <BookOpen size={20} className="mr-3" />
        Create New Masterpiece
      </Button>
    </div>
  );
};

export default WelcomeSection;
