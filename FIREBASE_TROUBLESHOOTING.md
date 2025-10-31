# Firebase Authentication Troubleshooting Guide

## Common Error: Missing Environment Variables

This error occurs when the required Firebase configuration variables are not set in your environment. The application requires these variables to initialize Firebase properly.

### Error Messages You Might See:
```
Warning: Missing environment variable NEXT_PUBLIC_FIREBASE_API_KEY
Warning: Missing environment variable NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Warning: Missing environment variable NEXT_PUBLIC_FIREBASE_PROJECT_ID
Firebase not initialized due to missing API key
Firebase auth is not properly initialized
```

## Solution: Set Up Environment Variables

1. Create a `.env.local` file in your project root directory (if it doesn't exist)
2. Add the following variables with your actual Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## How to Get Your Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon (⚙️) next to "Project Overview" and select "Project settings"
4. Under "General" tab, scroll down to "Your apps" section
5. If you don't have a web app configured, click "</>" to add one
6. Copy the configuration values to your `.env.local` file

## Common Error: `auth/invalid-credential`

This error typically occurs when there's an issue with the Firebase authentication credentials. Here are the steps to diagnose and fix this issue:

## 1. Verify Environment Variables

Check that your `.env.local` file contains the correct Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 2. Check Firebase Project Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon (⚙️) next to "Project Overview" and select "Project settings"
4. Under "General" tab, scroll down to "Your apps" section
5. Verify that the configuration values match those in your `.env.local` file

## 3. Enable Authentication Providers

1. In Firebase Console, click "Authentication" in the left sidebar
2. Click "Sign-in method" tab
3. Enable the following providers:
   - Email/Password
   - Google (if using Google Sign-In)
   - Facebook (if using Facebook Sign-In)

## 4. Verify API Key

Firebase API keys should:
- Start with `AIzaSy`
- Be exactly 39 characters long
- Contain only alphanumeric characters and underscores/dashes

## 5. Test Your Configuration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit the test pages:
   - http://localhost:3000/test-firebase
   - http://localhost:3000/test-auth

3. Check browser console for detailed error messages

## 6. Common Solutions

### Solution 1: Recreate API Key
If the API key is invalid:
1. In Firebase Console, go to Project Settings
2. Scroll to "Your apps" section
3. Click the trash can icon to delete the current app
4. Click "Add app" and register a new web app
5. Copy the new configuration values to your `.env.local` file

### Solution 2: Check Network Issues
If you're behind a corporate firewall:
1. Try connecting from a different network
2. Check if any browser extensions are blocking requests
3. Disable ad blockers for localhost

### Solution 3: Clear Browser Data
1. Clear browser cache and cookies for localhost
2. Try in an incognito/private browsing window
3. Try a different browser

## 7. Debugging Steps

1. Check browser console for detailed error messages
2. Verify the Firebase SDK is loading correctly
3. Ensure there are no Content Security Policy (CSP) violations
4. Check if the Firebase project exists and is not disabled

## 8. Still Having Issues?

1. Create a new Firebase project and update your configuration
2. Check Firebase status dashboard for service outages
3. Review Firebase Authentication documentation
4. Contact Firebase support if the issue persists

## 9. Testing with Test Accounts

For development, you can create test accounts:
1. In Firebase Console, go to Authentication > Users
2. Click "Add user"
3. Create a test user with email/password
4. Use these credentials for testing

## 10. Environment-Specific Configuration

Make sure you're using the correct environment:
- Development: `.env.local`
- Production: Environment variables set in your deployment platform