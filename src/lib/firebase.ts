import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhJTZ50kc8SCEWfarOSj9waxIVs2x2UCs",
  authDomain: "bm-truss.firebaseapp.com",
  projectId: "bm-truss",
  storageBucket: "bm-truss.firebasestorage.app",
  messagingSenderId: "892684225374",
  appId: "1:892684225374:web:1a2fd3f1a1a3f087fd9dcf",
  measurementId: "G-HLJRFMDB4P",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
