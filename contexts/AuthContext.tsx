"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/lib/firebase';

// Add validation for Firebase auth initialization
if (!auth) {
  console.error('Firebase auth is not properly initialized');
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if auth is properly initialized
    if (!auth) {
      console.error('Firebase auth is not initialized');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with email:', email);
      if (!auth) {
        throw new Error('Firebase auth is not initialized');
      }
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful:', result.user);
    } catch (error) {
      console.error('Sign in error:', error);
      const authError = error as Error & { code?: string; message?: string };
      console.error('Error code:', authError.code);
      console.error('Error message:', authError.message);
      
      // Provide more user-friendly error messages
      if (authError.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      } else if (authError.code === 'auth/user-not-found') {
        throw new Error('No user found with this email. Please check your email or sign up.');
      } else if (authError.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else if (authError.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please try again later.');
      } else {
        throw new Error(authError.message || 'Failed to sign in. Please try again.');
      }
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign up with email:', email);
      if (!auth) {
        throw new Error('Firebase auth is not initialized');
      }
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Sign up successful:', result.user);
    } catch (error) {
      console.error('Sign up error:', error);
      const authError = error as Error & { code?: string; message?: string };
      console.error('Error code:', authError.code);
      console.error('Error message:', authError.message);
      
      // Provide more user-friendly error messages
      if (authError.code === 'auth/email-already-in-use') {
        throw new Error('An account already exists with this email address. Please sign in instead.');
      } else if (authError.code === 'auth/invalid-email') {
        throw new Error('Invalid email address. Please check your email and try again.');
      } else if (authError.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use a stronger password (at least 6 characters).');
      } else {
        throw new Error(authError.message || 'Failed to sign up. Please try again.');
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      if (!auth) {
        throw new Error('Firebase auth is not initialized');
      }
      if (!googleProvider) {
        throw new Error('Google provider is not initialized');
      }
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      if (!auth) {
        throw new Error('Firebase auth is not initialized');
      }
      if (!facebookProvider) {
        throw new Error('Facebook provider is not initialized');
      }
      await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      console.error('Facebook sign in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (!auth) {
        throw new Error('Firebase auth is not initialized');
      }
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}