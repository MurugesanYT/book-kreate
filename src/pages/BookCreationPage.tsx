
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft, Sparkles, Wand2, PenTool, Target, Zap, Heart, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BookDetailsForm from '@/components/BookDetailsForm';

const BookCreationPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Enhanced Header */}
      <header className="bg-white/98 backdrop-blur-xl shadow-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center text-white mr-4 shadow-xl">
              <span className="text-xl font-bold">BK</span>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                Book-Kreate
              </span>
              <p className="text-sm text-slate-500 mt-1">Your AI Writing Companion</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && currentUser.photoURL && (
              <div className="relative">
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || "User"} 
                  className="w-12 h-12 rounded-2xl border-3 border-purple-200 shadow-lg"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Button 
            variant="ghost" 
            className="text-purple-600 hover:bg-purple-50 mb-8 px-6 py-3 rounded-2xl font-medium border border-purple-200 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all"
            onClick={handleBackToDashboard}
          >
            <ChevronLeft size={18} className="mr-2" />
            Back to Dashboard
          </Button>
          
          {/* Enhanced Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-purple-600 to-orange-500 rounded-3xl text-white mb-10 shadow-3xl relative">
              <Wand2 className="h-14 w-14" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-yellow-800" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-slate-800 mb-8 leading-tight">
              Create Your <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Masterpiece</span>
            </h1>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Transform your wildest ideas into professionally crafted books with our advanced AI writing assistant. 
              From concept to completion, we'll guide you through every step of your creative journey.
            </p>
            
            {/* Enhanced Features Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 border border-blue-100 text-center hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl text-white mb-8 group-hover:scale-110 transition-transform shadow-xl">
                  <PenTool className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-3xl text-slate-800 mb-6">Describe Your Vision</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Share your book concept, genre, and target audience. The more detail, the better our AI can help you craft your story.</p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 border border-purple-100 text-center hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl text-white mb-8 group-hover:scale-110 transition-transform shadow-xl">
                  <Sparkles className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-3xl text-slate-800 mb-6">AI-Powered Creation</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Our advanced AI analyzes your input and creates a detailed structure, complete with chapters and engaging content.</p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 border border-green-100 text-center hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl text-white mb-8 group-hover:scale-110 transition-transform shadow-xl">
                  <Target className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-3xl text-slate-800 mb-6">Write & Perfect</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Use our AI tools to generate chapters, edit content, and add your unique voice to create your perfect masterpiece.</p>
              </div>
            </div>

            {/* Additional Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-yellow-900 mb-2">Lightning Fast</h4>
                <p className="text-yellow-700 text-sm">Generate chapters in seconds</p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border border-pink-200 text-center">
                <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-pink-900 mb-2">Personalized</h4>
                <p className="text-pink-700 text-sm">Adapts to your writing style</p>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200 text-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-indigo-900 mb-2">Professional</h4>
                <p className="text-indigo-700 text-sm">Publishing-ready quality</p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-emerald-900 mb-2">Complete</h4>
                <p className="text-emerald-700 text-sm">Full book creation suite</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Form Container */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-3xl p-12 border border-purple-100 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-orange-500"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-100 to-orange-100 rounded-full opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-orange-100 to-purple-100 rounded-full opacity-50"></div>
          
          <div className="relative">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Ready to Begin?</h2>
              <p className="text-xl text-slate-600">Tell us about your book and let's bring your vision to life</p>
            </div>
            <BookDetailsForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookCreationPage;
