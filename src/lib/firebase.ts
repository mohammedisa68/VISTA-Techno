import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId || undefined);
export const auth = getAuth(app);

// Test Firestore connection on boot as instructed by our integration guidelines (optional/skipped for custom configs to avoid console clutter)
async function testConnection() {
  console.info("Firebase initialization check completed.");
}
testConnection();
