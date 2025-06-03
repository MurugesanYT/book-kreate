
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft, Sparkles, Wand2, PenTool, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BookDetailsForm from '@/components/BookDetailsForm';

const BookCreationPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <header className="bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center text-white mr-3 shadow-lg">
              <span className="text-xl font-bold">BK</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Book-Kreate
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && currentUser.photoURL && (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || "User"} 
                className="w-12 h-12 rounded-2xl border-2 border-purple-200 shadow-md"
              />
            )}
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Button 
            variant="ghost" 
            className="text-purple-600 hover:bg-purple-50 mb-8 px-6 py-3 rounded-xl font-medium"
            onClick={handleBackToDashboard}
          >
            <ChevronLeft size={18} className="mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-orange-500 rounded-3xl text-white mb-8 shadow-2xl">
              <Wand2 className="h-12 w-12" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              Create Your <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Masterpiece</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Transform your wildest ideas into professionally crafted books with our advanced AI writing assistant. 
              From concept to completion, we'll guide you through every step of your creative journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 text-center hover:shadow-2xl transition-all duration-300 group hover:scale-105">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-3xl text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <PenTool className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-2xl text-slate-800 mb-4">Describe Your Vision</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Share your book concept, genre, and target audience. The more detail, the better our AI can help you.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 text-center hover:shadow-2xl transition-all duration-300 group hover:scale-105">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/10 rounded-3xl text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-2xl text-slate-800 mb-4">AI-Powered Creation</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Our advanced AI analyzes your input and creates a detailed structure, complete with chapters and content.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 text-center hover:shadow-2xl transition-all duration-300 group hover:scale-105">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-3xl text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-2xl text-slate-800 mb-4">Write & Perfect</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Use our AI tools to generate chapters, edit content, and add your unique voice to create your perfect book.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-slate-200/50">
          <BookDetailsForm />
        </div>
      </main>
    </div>
  );
};

export default BookCreationPage;
