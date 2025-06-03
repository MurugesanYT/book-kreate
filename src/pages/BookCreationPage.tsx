
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft, Sparkles, Wand2, Zap, PenTool, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BookDetailsForm from '@/components/BookDetailsForm';

const BookCreationPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-book-lightGray via-white to-book-purple/5">
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-book-purple to-book-orange flex items-center justify-center text-white mr-3 shadow-lg">
              <span className="text-xl font-bold">BK</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
              Book-Kreate
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && currentUser.photoURL && (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || "User"} 
                className="w-12 h-12 rounded-xl border-2 border-book-purple/20 shadow-lg"
              />
            )}
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-12">
          <Button 
            variant="ghost" 
            className="text-book-purple hover:bg-book-purple/10 mb-8 px-6 py-3 rounded-xl"
            onClick={handleBackToDashboard}
          >
            <ChevronLeft size={18} className="mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-book-purple to-book-orange rounded-3xl text-white mb-8 shadow-2xl">
              <Wand2 className="h-10 w-10" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-book-darkText mb-6 leading-tight">
              Create Your <span className="bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">Masterpiece</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Transform your wildest ideas into professionally crafted books with our advanced AI writing assistant. 
              From concept to completion, we'll guide you through every step of your creative journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 text-center hover:shadow-xl transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <PenTool className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl text-book-darkText mb-3">Describe Your Vision</h3>
              <p className="text-slate-600 leading-relaxed">Share your book concept, genre, and target audience. The more detail, the better our AI can help you.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 text-center hover:shadow-xl transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-2xl text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl text-book-darkText mb-3">AI-Powered Creation</h3>
              <p className="text-slate-600 leading-relaxed">Our advanced AI analyzes your input and creates a detailed structure, complete with chapters and content.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 text-center hover:shadow-xl transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl text-book-darkText mb-3">Refine & Perfect</h3>
              <p className="text-slate-600 leading-relaxed">Edit, customize, and add your unique voice to create a book that truly represents your vision.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-slate-200/50">
          <BookDetailsForm />
        </div>
      </main>
    </div>
  );
};

export default BookCreationPage;
