import { Redirect } from "expo-router";
import { app } from "../firebaseConfig";
import {signInwithEmailAndPassword,inicializeAuto,getReactNativePersistence } from "firebase/auth;";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";



export default function Home() {
  return ( <Redirect href={"/(rotas)/primeira"}/>


)};

const fazerLogin =() =>{
  const auth = inicializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
  
  signInwithEmailAndPassword(auth, email, senha)
  .then((userCredential)=>{
    const user = userCredential.user;
    console.log("User signed in successfully:");
    console.log(user.uid);
    console.log(user);
  })
.catch((error) =>{
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log("Error signing in:", errorCode);
  console.log(errorMessage);
  console.log(errorMessage);
});

};
