
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
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp,
  DocumentData 
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY0MqFKd-byDk880Ane3R4vc-2FQOsHEc",
  authDomain: "book-kreate.firebaseapp.com",
  projectId: "book-kreate",
  storageBucket: "book-kreate.appspot.com",
  messagingSenderId: "629855600496",
  appId: "1:629855600496:web:89c0a8fa4524ed726499b5",
  measurementId: "G-51XTXN688K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
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
      throw new Error(
        "Authentication domain not authorized. Please add this domain to your Firebase project's authorized domains."
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

// Firestore helpers
export const createDocument = async (collectionPath: string, docId: string, data: Record<string, any>) => {
  try {
    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(doc(db, collectionPath, docId), docData);
    return docId;
  } catch (error) {
    console.error(`Error creating document in ${collectionPath}:`, error);
    throw error;
  }
};

export const updateDocument = async (collectionPath: string, docId: string, data: Record<string, any>) => {
  try {
    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(doc(db, collectionPath, docId), updateData);
    return true;
  } catch (error) {
    console.error(`Error updating document in ${collectionPath}:`, error);
    throw error;
  }
};

export const getDocument = async (collectionPath: string, docId: string) => {
  try {
    const docSnap = await getDoc(doc(db, collectionPath, docId));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() as Record<string, any> };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting document from ${collectionPath}:`, error);
    throw error;
  }
};

export const deleteDocument = async (collectionPath: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionPath, docId));
    return true;
  } catch (error) {
    console.error(`Error deleting document from ${collectionPath}:`, error);
    throw error;
  }
};

export const getDocuments = async (collectionPath: string, userId?: string) => {
  try {
    let q;
    if (userId) {
      q = query(
        collection(db, collectionPath),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(collection(db, collectionPath), orderBy("createdAt", "desc"));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Record<string, any>
    }));
  } catch (error) {
    console.error(`Error getting documents from ${collectionPath}:`, error);
    throw error;
  }
};

export { app, auth, db, storage, analytics };
