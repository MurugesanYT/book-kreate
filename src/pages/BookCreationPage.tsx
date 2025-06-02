
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft, Sparkles, Wand2 } from 'lucide-react';
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
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-book-purple to-book-orange flex items-center justify-center text-white mr-2">
              <span className="text-lg font-bold">BK</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
              Book-Kreate
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && currentUser.photoURL && (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || "User"} 
                className="w-10 h-10 rounded-full border-2 border-book-purple shadow-lg"
              />
            )}
          </div>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="text-book-purple hover:bg-book-purple/10 mb-6"
            onClick={handleBackToDashboard}
          >
            <ChevronLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-book-purple to-book-orange rounded-2xl text-white mb-6 shadow-lg">
              <Wand2 className="h-8 w-8" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-book-darkText mb-4">
              Create Your <span className="bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">Amazing Book</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into a professionally crafted book with our AI-powered writing assistant. 
              Just describe your vision and watch the magic happen!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl text-blue-600 mb-4">
                <span className="font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-book-darkText mb-2">Describe Your Idea</h3>
              <p className="text-sm text-slate-600">Tell us about your book concept, genre, and target audience</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-xl text-purple-600 mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-book-darkText mb-2">AI Magic</h3>
              <p className="text-sm text-slate-600">Our AI creates a detailed plan and structure for your book</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-xl text-green-600 mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-book-darkText mb-2">Start Writing</h3>
              <p className="text-sm text-slate-600">Edit, customize, and bring your unique voice to the story</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-200">
          <BookDetailsForm />
        </div>
      </main>
    </div>
  );
};

export default BookCreationPage;
