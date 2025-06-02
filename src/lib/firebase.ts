
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY0MqFKd-byDk880Ane3R4vc-2FQOsHEc",
  authDomain: "book-kreate.firebaseapp.com",
  databaseURL: "https://book-kreate-default-rtdb.asia-southeast1.firebasedatabase.app",
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
const database = getDatabase(app);

// Configure providers with additional scopes and custom parameters
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const twitterProvider = new TwitterAuthProvider();
twitterProvider.setCustomParameters({
  lang: 'en'
});

const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user:email');
githubProvider.setCustomParameters({
  allow_signup: 'true'
});

// Enhanced sign in functions with better error handling
export const signInWithGoogle = async () => {
  try {
    console.log('Attempting Google sign in...');
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google sign in successful:', result.user.email);
    return result.user;
  } catch (error: any) {
    console.error("Google sign in error:", error);
    
    // Handle specific Firebase auth errors
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign in was cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked by browser. Please allow popups for this site.');
    } else if (error.code === 'auth/invalid-credential') {
      throw new Error('Invalid credentials. Please check your Google account settings.');
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with the same email but different sign-in credentials.');
    } else if (error.code === 'auth/unauthorized-domain') {
      const currentDomain = window.location.origin;
      throw new Error(
        `This domain "${currentDomain}" is not authorized for authentication. Please contact support.`
      );
    }
    
    throw new Error('Failed to sign in with Google. Please try again.');
  }
};

export const signInWithTwitter = async () => {
  try {
    console.log('Attempting Twitter sign in...');
    const result = await signInWithPopup(auth, twitterProvider);
    console.log('Twitter sign in successful:', result.user.email);
    return result.user;
  } catch (error: any) {
    console.error("Twitter sign in error:", error);
    
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign in was cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked by browser. Please allow popups for this site.');
    } else if (error.code === 'auth/invalid-credential') {
      throw new Error('Twitter authentication failed. Please try again or use a different method.');
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with the same email but different sign-in credentials.');
    } else if (error.code === 'auth/unauthorized-domain') {
      const currentDomain = window.location.origin;
      throw new Error(
        `This domain "${currentDomain}" is not authorized for authentication. Please contact support.`
      );
    }
    
    throw new Error('Failed to sign in with Twitter. Please try again.');
  }
};

export const signInWithGitHub = async () => {
  try {
    console.log('Attempting GitHub sign in...');
    const result = await signInWithPopup(auth, githubProvider);
    console.log('GitHub sign in successful:', result.user.email);
    return result.user;
  } catch (error: any) {
    console.error("GitHub sign in error:", error);
    
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign in was cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked by browser. Please allow popups for this site.');
    } else if (error.code === 'auth/invalid-credential') {
      throw new Error('GitHub authentication failed. Please try again or use a different method.');
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with the same email but different sign-in credentials.');
    } else if (error.code === 'auth/unauthorized-domain') {
      const currentDomain = window.location.origin;
      throw new Error(
        `This domain "${currentDomain}" is not authorized for authentication. Please contact support.`
      );
    }
    
    throw new Error('Failed to sign in with GitHub. Please try again.');
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log('Sign out successful');
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Auth state listener
export const subscribeToAuthChanges = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { app, auth, analytics, database };
