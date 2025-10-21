import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCnb3rSNOTb8aWPc7OXjk_CoLbrzMtK0ls",
  authDomain: "business-directory-42aa1.firebaseapp.com",
  projectId: "business-directory-42aa1",
  storageBucket: "business-directory-42aa1.firebasestorage.app",
  messagingSenderId: "717840978111",
  appId: "1:717840978111:web:73d0867fdaab3e4b6db60a",
  measurementId: "G-82YJ463EQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

export default app;