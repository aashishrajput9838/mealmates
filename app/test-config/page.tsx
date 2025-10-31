'use client';

import { useEffect, useState } from 'react';
import { app, auth, db } from '@/lib/firebase';

export default function TestConfigPage() {
  const [configStatus, setConfigStatus] = useState({
    firebaseInitialized: false,
    authInitialized: false,
    dbInitialized: false,
    envVars: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
    },
  });

  useEffect(() => {
    // Check Firebase initialization status
    setConfigStatus({
      firebaseInitialized: !!app,
      authInitialized: !!auth,
      dbInitialized: !!db,
      envVars: {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Firebase Configuration Test</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">Environment Variables</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="font-medium">NEXT_PUBLIC_FIREBASE_API_KEY:</span>
                    <span className={configStatus.envVars.apiKey.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                      {configStatus.envVars.apiKey}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:</span>
                    <span className={configStatus.envVars.authDomain.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                      {configStatus.envVars.authDomain}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">NEXT_PUBLIC_FIREBASE_PROJECT_ID:</span>
                    <span className={configStatus.envVars.projectId.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                      {configStatus.envVars.projectId}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">Firebase Services</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="font-medium">Firebase App:</span>
                    <span className={configStatus.firebaseInitialized ? 'text-green-600' : 'text-red-600'}>
                      {configStatus.firebaseInitialized ? '✅ Initialized' : '❌ Not Initialized'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Firebase Auth:</span>
                    <span className={configStatus.authInitialized ? 'text-green-600' : 'text-red-600'}>
                      {configStatus.authInitialized ? '✅ Initialized' : '❌ Not Initialized'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Firestore Database:</span>
                    <span className={configStatus.dbInitialized ? 'text-green-600' : 'text-red-600'}>
                      {configStatus.dbInitialized ? '✅ Initialized' : '❌ Not Initialized'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {!configStatus.firebaseInitialized && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Configuration Required</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Firebase is not properly initialized. Please check the following:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>Ensure you have created a <code className="bg-gray-100 px-1 rounded">.env.local</code> file in your project root</li>
                        <li>Verify that all required environment variables are set with correct values</li>
                        <li>Restart your development server after making changes</li>
                        <li>Refer to <code className="bg-gray-100 px-1 rounded">FIREBASE_SETUP.md</code> for detailed instructions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {configStatus.firebaseInitialized && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Configuration Successful</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        Firebase has been successfully initialized! All required services are ready to use.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}