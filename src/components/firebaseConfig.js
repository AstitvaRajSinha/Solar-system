import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveConfig = async (planets) => {
  await addDoc(collection(db, "solarSystems"), { planets });
};

export const loadConfig = async (setPlanets) => {
  const snapshot = await getDocs(collection(db, "solarSystems"));
  if (!snapshot.empty) setPlanets(snapshot.docs[0].data().planets);
};
