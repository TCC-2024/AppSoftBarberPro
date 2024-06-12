import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyDp9giQC4MIw0_8aODEoJctGRmNTbhD-Ws",
    authDomain: "softbarberprotcc.firebaseapp.com",
    projectId: "softbarberprotcc",
    storageBucket: "softbarberprotcc.appspot.com",
    messagingSenderId: "780812922675",
    appId: "1:780812922675:web:69cae2384db309cd551846",
    measurementId: "G-D63QGC4EH5"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
