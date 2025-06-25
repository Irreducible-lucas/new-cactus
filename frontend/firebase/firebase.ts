// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArgbHChfNwPtrs5Eh2ZM4j-17xAWnuHqo",
  authDomain: "cactu-6876a.firebaseapp.com",
  projectId: "cactu-6876a",
  storageBucket: "cactu-6876a.appspot.com", // ✅ Corrected
  messagingSenderId: "676786150723",
  appId: "1:676786150723:web:45123bd9cea764927423f6",
  measurementId: "G-0CS742LRW4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
