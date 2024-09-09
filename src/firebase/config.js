import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";

export const App = initializeApp({
    apiKey: `${import.meta.env.VITE_APP_API_KEY}`,
    authDomain: `${import.meta.env.VITE_APP_AUTH_DOMAIN}`,
    projectId: `${import.meta.env.VITE_APP_PROJECT_ID}`,
    databaseURL: `${import.meta.env.VITE_APP_DATABASE_URL}`,
    storageBucket: `${import.meta.env.VITE_APP_STORAGE_BUCKET}`,
    appId: `${import.meta.env.VITE_APP_APPID}`,
    messagingSenderId: `${import.meta.env.VITE_APP_MESSAGING_SENDER_ID}`,
    measurementId: `${import.meta.env.VITE_APP_MEASUREMENT_ID}`,
});
export const analytics = getAnalytics(App);
export const auth = getAuth(App);
export const db_firestore = getFirestore(App);
export const storage = getStorage(App);
export const db_database = getDatabase(App);
export const functions = getFunctions(App, "asia-south1");
export const provider = new GoogleAuthProvider();
