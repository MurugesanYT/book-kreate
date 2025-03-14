
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, LogOut } from 'lucide-react';

const DashboardPage = () => {
  const { currentUser, logOut, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-purple"></div>
      </div>
    );
  }
  
  if (!currentUser && !loading) {
    return <Navigate to="/auth" replace />;
  }

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
            
            <Button 
              variant="outline" 
              size="sm"
              className="text-book-purple border-book-purple"
              onClick={logOut}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-book-darkText">
            Welcome, {currentUser?.displayName || "User"}
          </h1>
          
          <Button className="btn-accent">
            <BookOpen size={16} className="mr-2" />
            Create New Book
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-book-darkText">
            Your Book Dashboard
          </h2>
          <p className="text-slate-600 mb-6">
            You haven't created any books yet. Get started by clicking the "Create New Book" button.
          </p>
          
          <div className="max-w-md mx-auto">
            <Button className="btn-accent w-full py-6">
              <BookOpen size={18} className="mr-2" />
              Generate Book with AI
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
