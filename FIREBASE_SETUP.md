# Firebase Authentication Setup for MealMates

## Prerequisites
- Firebase account (free tier available)
- Google account for Google Sign-In
- Facebook Developer account for Facebook Sign-In (optional)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Enter project name (e.g., "mealmates-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable the following providers:

### Email/Password
- Click "Email/Password"
- Enable "Email/Password"
- Click "Save"

### Google Sign-In
- Click "Google"
- Enable "Google"
- Add your support email
- Click "Save"

### Facebook Sign-In (Optional)
- Click "Facebook"
- Enable "Facebook"
- You'll need to configure Facebook App ID and App Secret
- Click "Save"

## Step 3: Get Firebase Config

1. In Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web app icon (</>)
5. Register app with a nickname (e.g., "mealmates-web")
6. Copy the `firebaseConfig` object

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables with your Firebase config values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 5: Configure Authorized Domains

1. In Firebase Authentication > Settings > Authorized domains
2. Add `localhost` for development
3. Add your production domain when deploying

## Step 6: Test Authentication

1. Start your development server: `npm run dev`
2. Navigate to `/auth` page
3. Try signing up with email/password
4. Test Google and Facebook sign-in (if configured)

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to authorized domains in Firebase console

2. **"Firebase: Error (auth/popup-closed-by-user)"**
   - User closed the popup before completing sign-in
   - This is normal behavior

3. **"Firebase: Error (auth/network-request-failed)"**
   - Check your internet connection
   - Verify Firebase project is active

4. **Google Sign-In not working**
   - Ensure Google provider is enabled in Firebase
   - Check if popup blockers are disabled

5. **Facebook Sign-In not working**
   - Verify Facebook App ID and App Secret
   - Ensure Facebook provider is properly configured

## Security Notes

- Never commit `.env.local` to version control
- Use Firebase Security Rules for database access
- Enable email verification if needed
- Consider implementing phone number verification for production

## Additional Features

Once basic authentication is working, you can add:
- Email verification
- Password reset
- Phone number authentication
- Multi-factor authentication
- Custom claims for user roles
