
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import AuthForm from '@/components/ui/auth-form';
import TermsDialog from '@/components/TermsDialog';

const AuthPage = () => {
  const { currentUser, signInWithGoogle, signInWithTwitter, signInWithGitHub, loading, termsAccepted, acceptTerms, declineTerms } = useAuth();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async (signInFunction: () => Promise<any>) => {
    setIsSigningIn(true);
    try {
      const user = await signInFunction();
      if (user && termsAccepted) {
        navigate('/dashboard');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  // If already logged in and terms accepted, redirect to dashboard
  if (currentUser && termsAccepted && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show terms dialog if user is logged in but hasn't accepted terms
  const showTermsDialog = currentUser && !termsAccepted && !loading;

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow flex items-center justify-center hero-gradient">
        <AuthForm
          onGoogleSignIn={() => handleSignIn(signInWithGoogle)}
          onTwitterSignIn={() => handleSignIn(signInWithTwitter)}
          onGithubSignIn={() => handleSignIn(signInWithGitHub)}
          isLoading={loading || isSigningIn}
        />
      </main>
      
      <TermsDialog
        isOpen={showTermsDialog}
        onAccept={acceptTerms}
        onDecline={declineTerms}
      />
      
      <LandingFooter />
    </div>
  );
};

export default AuthPage;
