"use client"

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function TestFirebasePage() {
  const [status, setStatus] = useState<string>('Checking Firebase connection...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        console.log('Firebase auth object:', auth);
        console.log('Firebase db object:', db);
        
        // Test Firestore connection
        const testCollection = collection(db, 'test');
        const snapshot = await getDocs(testCollection);
        console.log('Firestore test successful. Documents count:', snapshot.size);
        
        setStatus('Firebase connection successful!');
      } catch (err: any) {
        console.error('Firebase test error:', err);
        setError(`Firebase test failed: ${err.message}`);
        setStatus('Firebase connection failed');
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Firebase Connection Test</h1>
      <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg w-full max-w-md">
        <p className="mb-4">Status: {status}</p>
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-destructive">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Check the browser console for detailed logs.</p>
        </div>
      </div>
    </div>
  );
}