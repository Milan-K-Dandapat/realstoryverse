import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF8owksJ20Hm-BvHNYD8fSdMqIYOUzQWw",
  authDomain: "realstoryverse.firebaseapp.com",
  projectId: "realstoryverse",
  storageBucket: "realstoryverse.firebasestorage.app",
  messagingSenderId: "86615105464",
  appId: "1:86615105464:web:27798e27a72d198d58394d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;