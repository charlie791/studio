
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvM6UgespxVCGWr_GR-MEYbPXoMYP3zbk",
  authDomain: "surfaceguard-365.firebaseapp.com",
  projectId: "surfaceguard-365",
  storageBucket: "surfaceguard-365.firebasestorage.app",
  messagingSenderId: "126437231158",
  appId: "1:126437231158:web:a141878456d9253e5aa697",
  measurementId: "G-NZHC9LHL48"
};

let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let analyticsInstance: Analytics | undefined;
let authInitializationError: Error | null = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  authInstance = getAuth(app);
  // Initialize Firebase Analytics if the app was successfully initialized
  if (typeof window !== 'undefined') { // Ensure analytics is initialized only on the client
    analyticsInstance = getAnalytics(app);
  }
} catch (error) {
  console.error('Firebase initialization failed:', error);
  authInitializationError = error instanceof Error ? error : new Error(String(error));
  // If app failed to initialize, authInstance would also be undefined.
  // Setting authInstance to undefined explicitly is redundant but harmless.
  authInstance = undefined; 
}

export function getFirebaseAuthInstance(): Auth {
  if (authInitializationError) {
    // If initialization failed (e.g. invalid config), throw the captured error.
    throw authInitializationError;
  }
  if (!authInstance) {
    // This case should ideally be covered by authInitializationError,
    // but as a fallback if auth is somehow undefined without an error.
    throw new Error('Firebase Auth is not available. Initialization may have failed.');
  }
  return authInstance;
}

// Export app and analytics if needed, authInitializationError for debugging
export { app, analyticsInstance as analytics, authInitializationError };
