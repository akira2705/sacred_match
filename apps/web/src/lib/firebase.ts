/**
 * Firebase client — Google Sign-In
 *
 * Required environment variables (add to Vercel + .env):
 *   VITE_FIREBASE_API_KEY
 *   VITE_FIREBASE_AUTH_DOMAIN
 *   VITE_FIREBASE_PROJECT_ID
 *   VITE_FIREBASE_APP_ID
 */
import { initializeApp, getApps } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

// Guard: only initialise once
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

/**
 * Opens the Google sign-in popup and returns a Firebase ID token string.
 * Throws if the user cancels or if Firebase is misconfigured.
 */
export async function signInWithGoogle(): Promise<string> {
  if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    throw new Error("Firebase is not configured. Contact support.");
  }
  const result = await signInWithPopup(auth, googleProvider);
  return result.user.getIdToken();
}
