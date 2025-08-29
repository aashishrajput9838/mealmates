import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDoPE2smc_MeZplbW2022EF9ba_0at7E2s",
  authDomain: "mealmates-f6f74.firebaseapp.com",
  projectId: "mealmates-f6f74",
  storageBucket: "mealmates-f6f74.firebasestorage.app",
  messagingSenderId: "467406988910",
  appId: "1:467406988910:web:9596c80aa3ee25b42ea87f",
  measurementId: "G-6X7D0Z23VQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export default app;
