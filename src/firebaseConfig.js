// import firebase from "firebase/app";
// https://firebase.google.com/docs/database/rtdb-vs-firestore?hl=ja
// cloud firestoreとrealtime databaseの違い
// 初心者は前者がおすすめらしい

// 自分が直感的に理解できそうな箇所
// https://qiita.com/Naoya_pro/items/a42f1ecae8acce249ef3
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// Config
const firebaseConfig = {
    apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app); // export const db = firebase.database();

const auth = getAuth(app)

const firestore = getFirestore(app)

const storage = getStorage(app)

const collectionAccessLogID = process.env.PUBLIC_FIREBASE_COLLECTION_ID;

const documentID = process.env.PUBLIC_FIREBASE_DOCUMENT_ID;

export { database, auth, firestore, storage, collectionAccessLogID, documentID }