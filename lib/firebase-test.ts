import { auth } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';

// Test function to verify Firebase authentication
export const testAuthFunctions = async () => {
  console.log('Testing Firebase Authentication Functions');
  console.log('=====================================');
  
  // Check if auth is initialized
  if (!auth) {
    console.error('Firebase Auth is not initialized');
    return false;
  }
  
  console.log('Firebase Auth initialized successfully');
  console.log('Current user:', auth.currentUser);
  
  return true;
};

// Test sign in function
export const testSignIn = async (email: string, password: string) => {
  try {
    console.log(`Attempting to sign in with email: ${email}`);
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log('Sign in successful');
    console.log('User:', result.user);
    return result.user;
  } catch (error) {
    const err = error as Error & { code?: string };
    console.error('Sign in failed:', err.code, err.message);
    throw error;
  }
};

// Test sign up function
export const testSignUp = async (email: string, password: string) => {
  try {
    console.log(`Attempting to sign up with email: ${email}`);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Sign up successful');
    console.log('User:', result.user);
    return result.user;
  } catch (error) {
    const err = error as Error & { code?: string };
    console.error('Sign up failed:', err.code, err.message);
    throw error;
  }
};

// Test sign out function
export const testSignOut = async () => {
  try {
    console.log('Attempting to sign out');
    await signOut(auth);
    console.log('Sign out successful');
    return true;
  } catch (error) {
    const err = error as Error & { code?: string };
    console.error('Sign out failed:', err.code, err.message);
    throw error;
  }
};