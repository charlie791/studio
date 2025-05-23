
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

// IMPORTANT: Replace with your actual Firebase project configuration
// These can be found in your Firebase project settings.
// It's recommended to use environment variables for these values.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let authInitializationError: Error | null = null;

if (!firebaseConfig.apiKey) {
  authInitializationError = new Error(
    'Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is not set in environment variables. Firebase cannot be initialized.'
  );
  console.error(authInitializationError.message);
} else {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    authInstance = getAuth(app);
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    authInitializationError = error instanceof Error ? error : new Error(String(error));
  }
}

export function getFirebaseAuthInstance(): Auth {
  if (authInitializationError) {
    throw authInitializationError;
  }
  if (!authInstance) {
    throw new Error('Firebase Auth is not available. Initialization may have failed or API key is missing.');
  }
  return authInstance;
}

export { app, authInitializationError };
