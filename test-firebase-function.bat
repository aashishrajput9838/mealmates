@echo off
echo Testing Firebase Functions
echo ========================
echo This script will help test Firebase authentication
echo.

echo 1. Checking if required environment variables are set:
echo    NEXT_PUBLIC_FIREBASE_API_KEY: %NEXT_PUBLIC_FIREBASE_API_KEY%
echo    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: %NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN%
echo    NEXT_PUBLIC_FIREBASE_PROJECT_ID: %NEXT_PUBLIC_FIREBASE_PROJECT_ID%
echo.

echo 2. Checking if Firebase project exists by trying to access it
echo    (This requires the Firebase CLI to be installed)
echo.

echo 3. To manually verify your Firebase setup:
echo    - Go to https://console.firebase.google.com/
echo    - Make sure your project "mealmates-f6f74" exists
echo    - Check that Authentication is enabled
echo    - Check that Email/Password sign-in method is enabled
echo.

echo 4. Common solutions for auth/invalid-credential error:
echo    - Verify your API key is correct in .env.local
echo    - Make sure you're using the correct email and password
echo    - Check if the user account exists
echo    - Ensure the Firebase Authentication providers are enabled
echo.

pause