import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyB_FWYzohCfQvVvqqu1IwjLGv5iG2xphz0",
  authDomain: "lolkarakter-73f7a.firebaseapp.com",
  projectId: "lolkarakter-73f7a",
  storageBucket: "lolkarakter-73f7a.firebasestorage.app",
  messagingSenderId: "331087578640",
  appId: "1:331087578640:web:d4422cff93abb5447eec95",
  measurementId: "G-RYE70PJ146"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);