
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJhm6KSyEYVHUQrutr9oEZA1DrkyMFG4c",
  authDomain: "fir-app-1211d.firebaseapp.com",
  databaseURL: "https://fir-app-1211d-default-rtdb.firebaseio.com",
  projectId: "fir-app-1211d",
  storageBucket: "fir-app-1211d.appspot.com",
  messagingSenderId: "505357348136",
  appId: "1:505357348136:web:3597a485a7a048d464341d",
  measurementId: "G-X6YBRB6NKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);

export {app,db};
