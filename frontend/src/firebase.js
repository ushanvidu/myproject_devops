import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 1. Go to console.firebase.google.com
// 2. Create a project -> Project Settings -> General -> "Your apps" -> Select Web (</>)
// 3. Copy the config object below:

const firebaseConfig = {
    apiKey: "AIzaSyDOFW64ivIQkm3uuLxHHCle7_ATA88Waes",
    authDomain: "unbox-me-f1151.firebaseapp.com",
    projectId: "unbox-me-f1151",
    storageBucket: "unbox-me-f1151.firebasestorage.app",
    messagingSenderId: "439524552686",
    appId: "1:439524552686:web:ed16d7139c3cd197b768ff"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();