import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAv_t9Dwp7NNDuunibaB9rr_0GlRJfOGfY",
  authDomain: "weblabs-6485e.firebaseapp.com",
  projectId: "weblabs-6485e",
  storageBucket: "weblabs-6485e.firebasestorage.app",
  messagingSenderId: "1045634045515",
  appId: "1:1045634045515:web:ad008b332f5a3c63d25fce"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);