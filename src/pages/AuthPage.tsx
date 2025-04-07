
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Info, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from 'sonner';

const AuthPage = () => {
  const { currentUser, signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Show alert in development environment after a short delay
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        setShowAlert(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSignIn = async () => {
    if (isSigningIn) return; // Prevent multiple clicks
    
    setIsSigningIn(true);
    try {
      const result = await signIn();
      if (result && result.user) {
        // Success is already handled by toast in AuthContext
        navigate('/dashboard');
      }
    } catch (error: any) {
      // Error is already handled by toast in AuthContext
      console.error("Sign in error in component:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  // If already logged in, redirect to dashboard
  if (currentUser && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gradient-to-br from-white via-book-purple/5 to-book-orange/5">
        <div className="max-w-md w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100"
          >
            <div className="h-2 bg-gradient-to-r from-book-purple to-book-orange"></div>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-book-purple/10 mb-4">
                  <Sparkles className="h-8 w-8 text-book-purple" />
                </div>
                <h2 className="text-2xl font-bold text-book-darkText">
                  Welcome to Book-Kreate
                </h2>
                <p className="text-slate-600 mt-2">
                  Sign in to start creating amazing books with AI
                </p>
              </div>
              
              {showAlert && process.env.NODE_ENV === 'development' && (
                <Alert className="mb-6 bg-amber-50 border border-amber-200">
                  <Info className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-800">
                    In development mode, make sure <code className="bg-amber-100 px-1 py-0.5 rounded">localhost</code> is added 
                    to your Firebase authorized domains.
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={handleSignIn}
                className="w-full py-6 bg-white hover:bg-slate-50 text-book-darkText border border-slate-300 flex items-center justify-center gap-3 transition-all duration-200 mb-4 hover:shadow-md"
                variant="outline"
                disabled={loading || isSigningIn}
              >
                {isSigningIn ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-t-2 border-book-purple rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <FcGoogle size={24} />
                    <span>Continue with Google</span>
                  </>
                )}
              </Button>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-center text-sm font-medium text-slate-700 mb-4">What you'll get</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BookOpen className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">AI-Powered Book Creation</p>
                      <p className="text-xs text-slate-500">Generate books with AI assistance in minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
                        <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Smart Content Editor</p>
                      <p className="text-xs text-slate-500">Edit and refine AI-generated content easily</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-purple-600">
                        <path d="M6 19V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14m-5-10v10"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">PDF Export</p>
                      <p className="text-xs text-slate-500">Download your books in professional PDF format</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center text-xs text-slate-500 mt-6">
            <p>By signing in, you agree to our</p>
            <p className="mt-1">
              <a href="/terms" className="text-book-purple hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-book-purple hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default AuthPage;
