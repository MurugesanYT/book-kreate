
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  UserCredential,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, signInWithGoogle, signOut } from '@/lib/firebase';
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
  signIn: () => Promise<UserCredential | null>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      const result = await signInWithGoogle();
      toast.success("Successfully signed in!");
      return result;
    } catch (error: any) {
      console.error("Sign in error:", error);
      
      // Check for specific unauthorized domain error
      if (error.message && error.message.includes('Authentication domain not authorized')) {
        setAuthError(
          "This app is running on a domain not authorized in Firebase. Please add this domain to your Firebase project's authorized domains list."
        );
      } else {
        toast.error(`Failed to sign in: ${error.message || 'Unknown error'}`);
      }
      
      return null;
    }
  };

  const logOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out!");
    } catch (error: any) {
      toast.error(`Failed to sign out: ${error.message || 'Unknown error'}`);
      console.error("Sign out error:", error);
    }
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    signIn,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AlertDialog open={!!authError} onOpenChange={() => setAuthError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Authentication Error</AlertDialogTitle>
            <AlertDialogDescription>
              {authError}
              <p className="mt-2">
                To fix this issue, go to your Firebase Console {'>'} Authentication {'>'} Settings {'>'} Authorized domains and add the domain you're using.
              </p>
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
