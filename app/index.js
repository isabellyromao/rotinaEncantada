import { Redirect } from "expo-router";
import { app } from "../firebaseConfig";
import {signInWithEmailAndPassword,initializeAuth,getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";



export default function Home() {

  

  return ( <Redirect href={"/(rotas)/primeira"}/>


)};

const fazerLogin =(email,senha) =>{
  const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
  
  signInWithEmailAndPassword(auth, email, senha)
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
