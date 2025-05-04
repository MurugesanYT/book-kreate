
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY0MqFKd-byDk880Ane3R4vc-2FQOsHEc",
  authDomain: "book-kreate.firebaseapp.com",
  projectId: "book-kreate",
  storageBucket: "book-kreate.firebasestorage.app",
  messagingSenderId: "629855600496",
  appId: "1:629855600496:web:89c0a8fa4524ed726499b5",
  measurementId: "G-51XTXN688K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    
    // Specific handling for unauthorized domain error
    if (error.code === 'auth/unauthorized-domain') {
      const currentDomain = window.location.origin;
      throw new Error(
        `Authentication domain not authorized. Your current domain "${currentDomain}" needs to be added to your Firebase project's authorized domains.`
      );
    }
    
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Auth state listener
export const subscribeToAuthChanges = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { app, auth, analytics };
