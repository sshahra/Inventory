
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5_ed8E9stVVih38CcW-Q1l9Vod0dI80Y",
  authDomain: "inventory-24e34.firebaseapp.com",
  projectId: "inventory-24e34",
  storageBucket: "inventory-24e34.appspot.com",
  messagingSenderId: "399836952097",
  appId: "1:399836952097:web:3d6349cb310c3fd4131560",
  measurementId: "G-BL6P2ZT8JB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
