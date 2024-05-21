// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dots-a87fc.firebaseapp.com",
  projectId: "dots-a87fc",
  storageBucket: "dots-a87fc.appspot.com",
  messagingSenderId: "589297542466",
  appId: "1:589297542466:web:d83233f773398c10eb94db",
  measurementId: "G-HFQFZZ5E1D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
