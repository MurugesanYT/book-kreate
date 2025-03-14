
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

const AuthPage = () => {
  const { currentUser, signIn, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const user = await signIn();
    if (user) {
      navigate('/dashboard');
    }
  };

  // If already logged in, redirect to dashboard
  if (currentUser && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4 hero-gradient">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-book-darkText">
                Welcome to Book-Kreate
              </h2>
              <p className="text-slate-600 mt-2">
                Sign in to start creating amazing books with AI
              </p>
            </div>
            
            <Button 
              onClick={handleSignIn}
              className="w-full py-6 bg-white hover:bg-slate-50 text-book-darkText border border-slate-300 flex items-center justify-center gap-3 transition-colors duration-200 mb-4"
              variant="outline"
              disabled={loading}
            >
              <FcGoogle size={24} />
              <span>Continue with Google</span>
            </Button>
            
            <div className="text-center text-sm text-slate-500 mt-6">
              <p>By signing in, you agree to our</p>
              <p className="mt-1">
                <a href="/terms" className="text-book-purple hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-book-purple hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default AuthPage;
