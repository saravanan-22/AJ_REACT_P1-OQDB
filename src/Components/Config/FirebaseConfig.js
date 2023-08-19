import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6fFj-7KH295H3S9BTiFbFpadl0ADclH0",
  authDomain: "oqdb-182a0.firebaseapp.com",
  projectId: "oqdb-182a0",
  storageBucket: "oqdb-182a0.appspot.com",
  messagingSenderId: "650785889465",
  appId: "1:650785889465:web:536237529fa15f51208f68",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
