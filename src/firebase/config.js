// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAza085MzWWj5O6bm5jS6qsDJaL3AjFUTU",
  authDomain: "rakshanet-e60ee.firebaseapp.com",
  projectId: "rakshanet-e60ee",
  storageBucket: "rakshanet-e60ee.firebasestorage.app",
  messagingSenderId: "666826385310",
  appId: "1:666826385310:web:95439d37d44fcb1668988f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;