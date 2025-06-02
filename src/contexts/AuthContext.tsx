
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, signInWithGoogle, signInWithTwitter, signInWithGitHub, signOut } from '@/lib/firebase';
import { toast } from 'sonner';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
  termsAccepted: boolean;
  signInWithGoogle: () => Promise<FirebaseUser | null>;
  signInWithTwitter: () => Promise<FirebaseUser | null>;
  signInWithGitHub: () => Promise<FirebaseUser | null>;
  logOut: () => Promise<void>;
  acceptTerms: () => void;
  declineTerms: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      // Check if terms were previously accepted
      if (user) {
        const accepted = localStorage.getItem(`terms_accepted_${user.uid}`);
        setTermsAccepted(accepted === 'true');
      } else {
        setTermsAccepted(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleSignIn = async (signInFunction: () => Promise<FirebaseUser>) => {
    try {
      setLoading(true);
      const user = await signInFunction();
      
      if (user) {
        toast.success(`Successfully signed in as ${user.displayName || user.email}!`);
        return user;
      }
      
      return null;
    } catch (error: any) {
      console.error("Sign in error:", error);
      
      // Show user-friendly error messages
      if (error.message.includes('popup')) {
        toast.error("Please allow popups and try again");
      } else if (error.message.includes('credential')) {
        toast.error("Authentication failed. Please try a different sign-in method.");
      } else if (error.message.includes('domain')) {
        setAuthError(error.message);
      } else {
        toast.error(error.message || "Failed to sign in. Please try again.");
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogleHandler = () => handleSignIn(signInWithGoogle);
  const signInWithTwitterHandler = () => handleSignIn(signInWithTwitter);
  const signInWithGitHubHandler = () => handleSignIn(signInWithGitHub);

  const logOut = async () => {
    try {
      await signOut();
      setTermsAccepted(false);
      toast.success("Successfully signed out!");
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
      console.error("Sign out error:", error);
    }
  };

  const acceptTerms = () => {
    if (currentUser) {
      localStorage.setItem(`terms_accepted_${currentUser.uid}`, 'true');
      setTermsAccepted(true);
      toast.success("Terms accepted. Welcome to Book-Kreate!");
    }
  };

  const declineTerms = () => {
    logOut();
    toast.info("You must accept the terms to use Book-Kreate.");
  };

  const value = {
    currentUser,
    loading,
    termsAccepted,
    signInWithGoogle: signInWithGoogleHandler,
    signInWithTwitter: signInWithTwitterHandler,
    signInWithGitHub: signInWithGitHubHandler,
    logOut,
    acceptTerms,
    declineTerms
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AlertDialog open={!!authError} onOpenChange={() => setAuthError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Authentication Configuration Issue</AlertDialogTitle>
            <AlertDialogDescription className="whitespace-pre-line">
              {authError}
              {"\n\nThis is a configuration issue that needs to be resolved in the Firebase console."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAuthError(null)}>
              Understood
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
