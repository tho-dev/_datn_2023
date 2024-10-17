// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGclGOSpF0qK7C1gP5uGITWvOhXNxid7k",
    authDomain: "qlht-3dd7c.firebaseapp.com",
    projectId: "qlht-3dd7c",
    storageBucket: "qlht-3dd7c.appspot.com",
    messagingSenderId: "677435536874",
    appId: "1:677435536874:web:f70f1f3a02d3fe485fee93",
    measurementId: "G-66MZ916G9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);