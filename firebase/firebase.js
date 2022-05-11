// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore  } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlr9hD0iTE9tFbP6F0BL8evb3zXMauo_Q",
  projectId: "wayup-fe4d7",
  storageBucket: "wayup-fe4d7.appspot.com",
  messagingSenderId: "363315687532",
  appId: "1:363315687532:web:2e45a6d4e7e2cc44f4a849"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db }