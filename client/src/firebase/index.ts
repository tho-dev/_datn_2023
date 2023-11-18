// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPUFhy6XQHedGMnKaKxcZGPosYN3ZcpCw",
    authDomain: "datn-2023-c6aef.firebaseapp.com",
    databaseURL: "https://datn-2023-c6aef-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "datn-2023-c6aef",
    storageBucket: "datn-2023-c6aef.appspot.com",
    messagingSenderId: "23337930854",
    appId: "1:23337930854:web:d3513d7de6c55b32d11da7",
    measurementId: "G-F095PNWNTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);