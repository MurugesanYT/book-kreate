
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  updateProfile,
  User,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  DocumentData,
  DocumentReference,
  CollectionReference
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
// Using placeholders to prevent API key error. In a production app, you would use valid credentials.
const firebaseConfig = {
  apiKey: "AIzaSyCoQjoQEyrEUJOJqurJeGgqQJvUYQBNn4o",
  authDomain: "fake-app-demo.firebaseapp.com",
  projectId: "fake-app-demo",
  storageBucket: "fake-app-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6a7b8c9d0e1",
  measurementId: "G-MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// Auth functions
const signIn = (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = async (email: string, password: string, displayName: string): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName });
  return userCredential;
};

const signOut = (): Promise<void> => {
  return firebaseSignOut(auth);
};

const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error in signInWithGoogle:", error);
    throw error; // Re-throw to handle in calling code
  }
};

// Create document
const createDocument = async (
  collectionName: string,
  documentId: string,
  data: Record<string, any>
): Promise<void> => {
  const docRef = doc(db, collectionName, documentId);
  await setDoc(docRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

// Update document
const updateDocument = async (
  collectionName: string,
  documentId: string,
  data: Record<string, any>
): Promise<void> => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

// Delete document
const deleteDocument = async (
  collectionName: string,
  documentId: string
): Promise<void> => {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
};

// Get document
const getDocument = async (
  collectionName: string,
  documentId: string
): Promise<Record<string, any> | null> => {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      ...data,
      id: documentId,
    };
  }
  
  return null;
};

// Get documents by user ID
const getDocuments = async (
  collectionName: string,
  userId: string
): Promise<Record<string, any>[]> => {
  const q = query(
    collection(db, collectionName),
    where("userId", "==", userId)
  );
  
  const querySnapshot = await getDocs(q);
  const documents: Record<string, any>[] = [];
  
  querySnapshot.forEach((doc) => {
    documents.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  
  return documents;
};

// File storage functions
const uploadFile = async (
  path: string,
  file: File
): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Listen to auth state changes
const onAuthChange = (callback: (user: User | null) => void): () => void => {
  return onAuthStateChanged(auth, callback);
};

export {
  auth,
  db,
  storage,
  signIn,
  signUp,
  signOut,
  signInWithGoogle,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocument,
  getDocuments,
  uploadFile,
  onAuthChange,
};
