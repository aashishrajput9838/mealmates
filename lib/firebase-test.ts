// This file is for testing Firebase connection
// You can run this in the browser console to test if Firebase is working

import { auth, googleProvider, facebookProvider } from './firebase';

export function testFirebaseConnection() {
  console.log('Testing Firebase connection...');
  
  try {
    // Test if auth is initialized
    console.log('✅ Firebase Auth initialized:', !!auth);
    console.log('✅ Google Provider initialized:', !!googleProvider);
    console.log('✅ Facebook Provider initialized:', !!facebookProvider);
    
    // Test if we can access Firebase config
    console.log('✅ Firebase project ID:', auth.app.options.projectId);
    console.log('✅ Firebase auth domain:', auth.app.options.authDomain);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
}

// Test authentication state listener
export function testAuthStateListener() {
  console.log('Testing auth state listener...');
  
  try {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('✅ User is signed in:', user.email);
      } else {
        console.log('✅ User is signed out');
      }
    });
    
    // Return unsubscribe function
    return unsubscribe;
  } catch (error) {
    console.error('❌ Auth state listener failed:', error);
    return null;
  }
}
