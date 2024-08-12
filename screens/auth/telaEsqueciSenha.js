import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useRouter, router } from 'expo-router';
import { Alert } from "react-native";
import styles from "../../styles/geral"
import {  BotaoPrincipal } from "../../componentes/geral";
import { View, Image, Text, ScrollView, TextInput } from "react-native";
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// Função para validar e-mail
const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function TelaEsqueciSenha() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEsqueciSenha = async () => {
        if (!email) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");  // Alert for empty fields
            return;
          }
      
        if (!emailValido(email)) {
            Alert.alert("Erro", "E-mail inválido. \nVerifique o formato do seu e-mail. \nTente novamente com atenção :)");
            return;
          }
      
          try {
            setLoading(true);
            // Envia o e-mail de redefinição de senha
            await sendPasswordResetEmail(auth, email);
            setLoading(false);
            Alert.alert("Enviamos um e-mail com instruções para redefinir sua senha.", `Verifique sua caixa de entrada em ${email}.`);
            router.replace('/');
        } catch (error) {
            setLoading(false);
            console.log("Código do erro Firebase:", error.code);
            console.error(error.message);
    
            switch (error.code) {
                case 'auth/network-request-failed':
                    Alert.alert("Erro", "Erro de rede. Por favor, \nverifique sua conexão e tente novamente :)");
                    break;
                default:
                    Alert.alert("Erro", "Ocorreu um erro inesperado. \nPor favor, tente novamente mais tarde.");
                    break;
            }
        }
    };

    let [fonteCarregada, fonteErro] = useFonts({
        Pompiere_400Regular,
        Poppins_300Light
      });

    if (!fonteCarregada && !fonteErro) {
        return null;
    };

    return(
        <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingTop: 50 }} 
      >
        <View style={[styles.container, {gap: 20}]}>
            <StatusBar style="auto" />
            <Text style={[{color: "#300030", fontFamily: "Pompiere_400Regular", fontSize: 40}]}>Esqueceu a Senha?</Text>
            <Image source={require("../../assets/icone-estrela-confusa.png")}/>
            <Text style={[{color: "#300030", fontFamily: "Pompiere_400Regular", fontSize: 20, textAlign: "center", paddingHorizontal:20}]}>Por favor insira o Email cadastrado para receber as instruções e acessar sua conta.</Text>
            <View style={{paddingVertical:40, gap:30}}>
            <View style={styles.Campos}>
                <MaterialCommunityIcons name="email-outline" size={22} color="#300030" style={{alignSelf: "center", width:35 }} />
                <TextInput style={{flex: 1, fontFamily:"Poppins_300Light", fontSize: 14}}
                    label="E-mail" value={email} onChangeText={setEmail} placeholder='Insira seu email cadastrado' keyboardType='email-address'/>
            </View>
                <BotaoPrincipal titulo="ENVIAR" backgroundColor="#415E3E" color="#FFFFFF" onPress={handleEsqueciSenha} loading={loading}/>
            </View>
        </View>
        </ScrollView>
    )
}

//falta concluir teste de envio em email que está no firebase.