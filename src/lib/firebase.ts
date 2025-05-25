
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
// import { getAnalytics, type Analytics } from "firebase/analytics"; // Temporarily commented out

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
// let analyticsInstance: Analytics | undefined; // Temporarily commented out
let authInitializationError: Error | null = null;

// Check if all necessary Firebase config values are provided
if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId ||
  !firebaseConfig.appId
) {
  const missingKeys = Object.entries(firebaseConfig)
    .filter(([key, value]) => !value && ['apiKey', 'authDomain', 'projectId', 'appId'].includes(key))
    .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`)
    .join(', ');

  authInitializationError = new Error(
    `Firebase configuration is missing or invalid. Please ensure environment variables are correctly set (${missingKeys}). Firebase cannot be initialized.`
  );
} else {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    authInstance = getAuth(app);
    // Temporarily comment out Analytics initialization to simplify
    // if (firebaseConfig.measurementId && typeof window !== 'undefined') {
    //   analyticsInstance = getAnalytics(app);
    // }
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    authInitializationError = error instanceof Error ? error : new Error(String(error));
    authInstance = undefined;
  }
}

export function getFirebaseAuthInstance(): Auth {
  if (authInitializationError) {
    throw authInitializationError;
  }
  if (!authInstance) {
    // This case should ideally be covered by authInitializationError,
    // but as a fallback:
    throw new Error('Firebase Auth is not available. Initialization may have failed or config is missing.');
  }
  return authInstance;
}

// Temporarily export null for analytics
// export { app, analyticsInstance as analytics, authInitializationError };
export { app, authInitializationError };
// Re-add analyticsInstance when re-enabling:
// export { app, analyticsInstance as analytics, authInitializationError };
