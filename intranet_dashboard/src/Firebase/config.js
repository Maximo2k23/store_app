// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6VSv9bUNfTw2AASzogch-eVeaPri4IxA",
  authDomain: "dashboard-a626d.firebaseapp.com",
  projectId: "dashboard-a626d",
  storageBucket: "dashboard-a626d.appspot.com",
  messagingSenderId: "472035492680",
  appId: "1:472035492680:web:2850714bde30b1d1dda97d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };