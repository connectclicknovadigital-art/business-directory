// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnb3rSNOTb8aWPc7OXjk_CoLbrzMtK0ls",
  authDomain: "business-directory-42aa1.firebaseapp.com",
  projectId: "business-directory-42aa1",
  storageBucket: "business-directory-42aa1.firebasestorage.app",
  messagingSenderId: "717840978111",
  appId: "1:717840978111:web:73d0867fdaab3e4b6db60a",
  measurementId: "G-82YJ463EQV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Needed for web-based reCAPTCHA (Expo uses web fallback)
auth.languageCode = "en";

export { auth, RecaptchaVerifier, signInWithPhoneNumber };

