import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCrjkAUpqkhcuvPjMrYQ6PCWKrzpwKz1d4",
  authDomain: "rotina-encantada.firebaseapp.com",
  projectId: "rotina-encantada",
  storageBucket: "rotina-encantada.appspot.com",
  messagingSenderId: "834120439331",
  appId: "1:834120439331:web:f77bd798329e94d71fc396"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export{auth};