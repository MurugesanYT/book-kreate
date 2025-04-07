
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
      
      // Show more informative error messages
      if (error.code === 'auth/api-key-not-valid') {
        setAuthError(
          "The Firebase API key is not valid. This is a development environment issue."
        );
      } else if (error.code === 'auth/configuration-not-found') {
        setAuthError(
          "Firebase configuration is incorrect. Please check your Firebase setup."
        );
      } else if (error.message && error.message.includes('Authentication domain not authorized')) {
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
              {(authError && authError.includes("API key") || authError?.includes("configuration")) && (
                <p className="mt-2 text-amber-600">
                  Since this is a demo app, we're using placeholder Firebase credentials. In a real application, you would need valid Firebase credentials.
                </p>
              )}
              {authError && authError.includes("domain not authorized") && (
                <p className="mt-2">
                  To fix this issue, go to your Firebase Console {'>'} Authentication {'>'} Settings {'>'} Authorized domains and add the domain you're using.
                </p>
              )}
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
