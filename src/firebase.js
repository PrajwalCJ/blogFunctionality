import { initializeApp } from "firebase/app"
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBE4ghpSuL1hRKpbFv0QYIxIe-_3Koy9Nk",
    authDomain: "miurac-midl.firebaseapp.com",
    databaseURL: "https://miurac-midl-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "miurac-midl",
    storageBucket: "miurac-midl.appspot.com",
    messagingSenderId: "746589407161",
    appId: "1:746589407161:web:43b67c5533c9ef2b369868",
    measurementId: "G-Y8HNDQ29E1"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()