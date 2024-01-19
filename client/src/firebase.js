// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-89109.firebaseapp.com",
  projectId: "mern-auth-89109",
  storageBucket: "mern-auth-89109.appspot.com",
  messagingSenderId: "625738412009",
  appId: "1:625738412009:web:aabcca9cd46f44ee9a2578"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);