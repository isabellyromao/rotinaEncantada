import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useRouter } from 'expo-router';
import { Alert } from "react-native";
import styles from "../../styles/geral"
import {  BotaoPrincipal } from "../../componentes/geral";
import { View, Image, Text, ScrollView, TextInput } from "react-native";
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
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
            
            // Adiciona um log para verificar o e-mail
            console.log("Verificando e-mail:", email);
    
            // Verifica se o e-mail está associado a uma conta
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            console.log("Métodos de login encontrados:", signInMethods);
    
            if (signInMethods.length === 0) {
                Alert.alert("Erro", "Não há uma conta registrada com esse e-mail.");
                setLoading(false);
                return;
            }
    
            // Envia o e-mail de redefinição de senha
            await sendPasswordResetEmail(auth, email);
            setLoading(false);
            
            // Exibe o alerta de sucesso
            Alert.alert("Sucesso", "Enviamos um e-mail com instruções para redefinir sua senha. \nVerifique sua caixa de entrada.");
            router.replace('/');
        } catch (error) {
            console.log("Código do erro Firebase:", error.code);
            console.error(error.message);
            Alert.alert("Erro", "Ocorreu um erro. \nTente novamente mais tarde.");
            setLoading(false);
        }
    };

    let [fonteCarregada, fonteErro] = useFonts({
        Pompiere_400Regular
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