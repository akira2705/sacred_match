/**
 * Firebase Admin SDK — server-side token verification
 *
 * Required environment variables (add to Railway):
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY   (the full private key string from your service account JSON)
 */
import admin from "firebase-admin";

let initialised = false;

export function getFirebaseAdmin(): admin.app.App {
  if (!initialised) {
    const projectId = process.env["FIREBASE_PROJECT_ID"];
    const clientEmail = process.env["FIREBASE_CLIENT_EMAIL"];
    const privateKey = process.env["FIREBASE_PRIVATE_KEY"]?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.",
      );
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
      });
    }
    initialised = true;
  }

  return admin.app();
}

export async function verifyFirebaseToken(idToken: string) {
  const app = getFirebaseAdmin();
  return admin.auth(app).verifyIdToken(idToken);
}
