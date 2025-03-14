
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BookDetailsForm from '@/components/BookDetailsForm';

const BookCreationPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-book-lightGray">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
              Book-Kreate
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && currentUser.photoURL && (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || "User"} 
                className="w-10 h-10 rounded-full border-2 border-book-purple"
              />
            )}
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="text-book-purple hover:bg-book-purple/10"
            onClick={handleBackToDashboard}
          >
            <ChevronLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-book-darkText mt-4">
            Create Your Book
          </h1>
          <p className="text-slate-600 mt-2">
            Fill in the details below to start generating your book with AI
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <BookDetailsForm />
        </div>
      </main>
    </div>
  );
};

export default BookCreationPage;
