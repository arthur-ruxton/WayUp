// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore  } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4-AKVwL5dhfkOBDiY0ka8NwCP1D5kDKo",
  authDomain: "posit-tree.firebaseapp.com",
  projectId: "posit-tree",
  storageBucket: "posit-tree.appspot.com",
  messagingSenderId: "1002023640843",
  appId: "1:1002023640843:web:4701799362ef1934b28c0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider
export { db }
export { auth }
export { provider }