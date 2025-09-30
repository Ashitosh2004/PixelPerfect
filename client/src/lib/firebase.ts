import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB3YBlGN_tp51ydtCEn5qFyntZAHsKVX2U",
  authDomain: "next-fb8cc.firebaseapp.com",
  databaseURL: "https://next-fb8cc-default-rtdb.firebaseio.com",
  projectId: "next-fb8cc",
  storageBucket: "next-fb8cc.appspot.com",
  messagingSenderId: "402023480465",
  appId: "1:402023480465:web:6113da9b8a102f2d9c1330",
  measurementId: "G-HJ4MX6GJYP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

let database: ReturnType<typeof getDatabase> | null = null;
let databaseError: Error | null = null;

try {
  database = getDatabase(app);
} catch (error) {
  databaseError = error as Error;
  console.error("Firebase Database initialization error:", error);
}

export { database, databaseError };
