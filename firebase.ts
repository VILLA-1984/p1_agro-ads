// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbjfcnGumKN_SXhqL5am2pYD0mfWHj8_0",
  authDomain: "ads-agro-segunda.firebaseapp.com",
  databaseURL: "https://ads-agro-segunda.firebaseapp.com",
  projectId: "ads-agro-segunda",
  storageBucket: "ads-agro-segunda.firebasestorage.app",
  messagingSenderId: "537806901154",
  appId: "1:537806901154:web:a7c805aaafc4fe63ddacfb",
  measurementId: "G-MR48774JMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;