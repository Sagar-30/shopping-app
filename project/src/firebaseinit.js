// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXtBGoKSTKiMV_YXgArLiU8qQo4d39ZCc",
  authDomain: "expense-management-764b6.firebaseapp.com",
  projectId: "expense-management-764b6",
  storageBucket: "expense-management-764b6.appspot.com",
  messagingSenderId: "1056185128428",
  appId: "1:1056185128428:web:a7613673a3fc7231d09cc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;