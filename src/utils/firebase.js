// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZX569Y4QnZN1dswYq5cOvhSbhJVyINZU",
  authDomain: "ottgpt-4dd91.firebaseapp.com",
  projectId: "ottgpt-4dd91",
  storageBucket: "ottgpt-4dd91.appspot.com",
  messagingSenderId: "808492412853",
  appId: "1:808492412853:web:6341efee25cd1437b073fc",
  measurementId: "G-SNNH143TGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();