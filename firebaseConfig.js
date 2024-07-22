// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrjkAUpqkhcuvPjMrYQ6PCWKrzpwKz1d4",
  authDomain: "rotina-encantada.firebaseapp.com",
  projectId: "rotina-encantada",
  storageBucket: "rotina-encantada.appspot.com",
  messagingSenderId: "834120439331",
  appId: "1:834120439331:web:f77bd798329e94d71fc396"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export{app};