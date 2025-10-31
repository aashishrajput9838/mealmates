import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Validate that required environment variables are present
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'
];

// Check if we're in a build environment (Vercel)
const isBuildEnvironment = process.env.NEXT_PHASE === 'phase-production-build';

const missingEnvVars: string[] = [];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    // Only warn in development or runtime, not during build
    if (!isBuildEnvironment) {
      console.warn(`Warning: Missing environment variable ${envVar}`);
      missingEnvVars.push(envVar);
    }
  } else {
    console.log(`Found environment variable ${envVar}: ${process.env[envVar].substring(0, 10)}...`); // Log first 10 chars for security
  }
}

// If any required environment variables are missing, show a more helpful error message
if (missingEnvVars.length > 0 && !isBuildEnvironment) {
  console.error(`
========================================
🔥 FIREBASE CONFIGURATION ERROR 🔥

Missing required environment variables:
${missingEnvVars.map(envVar => `  • ${envVar}`).join('\n')}

🔧 FIX THIS ISSUE:
1. Create a .env.local file in your project root
2. Add the missing environment variables with your Firebase config values
3. See FIREBASE_SETUP.md for detailed instructions

Example .env.local content:
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
========================================
`);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Log the firebase config (without sensitive data) for debugging
console.log('Firebase config keys present:', {
  hasApiKey: !!firebaseConfig.apiKey,
  hasAuthDomain: !!firebaseConfig.authDomain,
  hasProjectId: !!firebaseConfig.projectId,
  hasStorageBucket: !!firebaseConfig.storageBucket,
  hasMessagingSenderId: !!firebaseConfig.messagingSenderId,
  hasAppId: !!firebaseConfig.appId,
  hasMeasurementId: !!firebaseConfig.measurementId
});

// Initialize Firebase only if we have a valid API key
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let facebookProvider: FacebookAuthProvider | null = null;

if (firebaseConfig.apiKey) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase Authentication and get a reference to the service
    auth = getAuth(app);
    
    // Initialize Firestore Database
    db = getFirestore(app);
    
    // Initialize Analytics (only in browser environment)
    analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
    
    // Initialize providers
    googleProvider = new GoogleAuthProvider();
    facebookProvider = new FacebookAuthProvider();
    
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Firebase:', error);
    // Create mock objects for build process
    app = null;
    auth = null;
    db = null;
    googleProvider = null;
    facebookProvider = null;
  }
} else {
  console.warn('⚠️ Firebase not initialized due to missing API key');
  // Create mock objects for build process
  app = null;
  auth = null;
  db = null;
  googleProvider = null;
  facebookProvider = null;
}

export { app, auth, db, analytics, googleProvider, facebookProvider };
export default app;