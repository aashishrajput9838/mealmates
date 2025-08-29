# 🍽️ MealMates - Food Donation Platform

A modern, full-stack web application for connecting food donors with recipients, built with Next.js 14, Firebase, and shadcn/ui.

## ✨ Features

- **🔐 User Authentication**: Secure login/signup with Firebase Auth
- **📱 Modern UI**: Beautiful, responsive design with shadcn/ui components
- **☁️ Cloud Storage**: Firebase Firestore for data persistence
- **🖼️ Image Upload**: Base64 image storage for food photos
- **📊 Real-time Updates**: Live data synchronization across devices
- **🔍 Search & Filter**: Find available food donations easily
- **📱 Mobile Responsive**: Works perfectly on all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Backend**: Firebase Firestore (Database)
- **Authentication**: Firebase Auth
- **Image Storage**: Base64 encoding in Firestore
- **Deployment**: Vercel-ready

## 🏗️ Project Structure

```
mealmates/
├── app/                    # Next.js App Router
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # User dashboard
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── ImageUpload.tsx   # Image upload component
│   ├── Navbar.tsx        # Navigation bar
│   └── ProtectedRoute.tsx # Route protection
├── contexts/              # React contexts
│   └── AuthContext.tsx   # Authentication context
├── lib/                   # Utility libraries
│   ├── firebase.ts       # Firebase configuration
│   └── firebase-services.ts # Firestore services
└── public/                # Static assets
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### 1. Clone the Repository
```bash
git clone https://github.com/aashishrajput9838/mealmates.git
cd mealmates
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password, Google, Facebook)
3. Enable Firestore Database
4. Copy your Firebase config to `lib/firebase.ts`

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Firebase Configuration
Update `lib/firebase.ts` with your Firebase project details:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

### Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

## 📱 Features Overview

### For Donors
- **Add Surplus Food**: Upload photos and details
- **Manage Donations**: View, edit, and delete your donations
- **Track Status**: Monitor donation status (available, claimed, expired)

### For Recipients
- **Browse Available Food**: View all available donations
- **Request Food**: Contact donors for food pickup
- **Search & Filter**: Find food by location, type, or availability

### Authentication
- **Email/Password**: Traditional signup/login
- **Google Sign-in**: One-click Google authentication
- **Facebook Sign-in**: Social media integration
- **Protected Routes**: Secure access to user-specific features

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Firebase](https://firebase.google.com/) - Backend services
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📞 Support

If you have any questions or need help:
- Create an [Issue](https://github.com/aashishrajput9838/mealmates/issues)
- Contact: [Your Contact Info]

---

**Made with ❤️ for reducing food waste and helping communities**
