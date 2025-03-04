// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCkEnosm26nIdTWslyRQcbjhmod97ofKFs",
  authDomain: "solar-system-4d894.firebaseapp.com",
  projectId: "solar-system-4d894",
  storageBucket: "solar-system-4d894.firebasestorage.app",
  messagingSenderId: "38071123726",
  appId: "1:38071123726:web:cc32714bbcae1c3ea1215f",
  measurementId: "G-HVEC2D50MB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const configsCollection = collection(db, "solarConfigs");
