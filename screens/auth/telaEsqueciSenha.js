import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useRouter } from 'expo-router';
import styles from "../../styles/geral"
import { CampoEmail, BotaoPrincipal } from "../../componentes/geral";
import { View, Image, Text, ScrollView } from "react-native";
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";

export default function TelaEsqueciSenha() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEsqueciSenha = async () => {
        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            setLoading(false)
            router.replace('/');
        } catch (error) {
            console.error(error.code);
            console.error(error.message);
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
                <CampoEmail/>
                <BotaoPrincipal titulo="ENVIAR" backgroundColor="#415E3E" color="#FFFFFF" onPress={handleEsqueciSenha} loading={loading}/>
            </View>
        </View>
        </ScrollView>
    )
}