import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyBEcqi7it32BzJ7dBNELV87_ydisjklA",
  authDomain: "linkedin-clone-39e08.firebaseapp.com",
  projectId: "linkedin-clone-39e08",
  storageBucket: "linkedin-clone-39e08.appspot.com",
  messagingSenderId: "1020829184425",
  appId: "1:1020829184425:web:1b3b661ec44fac451cd4b8",
  measurementId: "G-PVVVT4DY8B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
