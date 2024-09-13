// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlpjUX1JL0yxzdyVoMGB3zjy2petGHiHI",
  authDomain: "week7-xinrong.firebaseapp.com",
  projectId: "week7-xinrong",
  storageBucket: "week7-xinrong.appspot.com",
  messagingSenderId: "257955301281",
  appId: "1:257955301281:web:6ff56c2d98b123b0feade0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db