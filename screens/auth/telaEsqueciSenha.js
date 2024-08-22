import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useRouter } from 'expo-router';
import { Alert, View, Image, Text, TextInput, Keyboard, SafeAreaView, StyleSheet } from "react-native";
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import { BotaoPrincipal, SetaVoltar } from "../../componentes/geral";

const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function TelaEsqueciSenha() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    //Função para capturar se o teclado está ativo ou desativo
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );
    
        // Limpa
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleEsqueciSenha = async () => {
        if (!email) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        if (!emailValido(email)) {
            Alert.alert("Erro", "E-mail inválido. \nVerifique o formato do seu e-mail. \nTente novamente com atenção :)");
            return;
        }

        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);

            setLoading(false);
            Alert.alert(
                "Enviamos um e-mail com instruções para redefinir sua senha.",
                `Verifique sua caixa de entrada em ${email}.`,
                [{ text: "OK", onPress: () => router.replace('/tudo-pronto') }]
            );

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.container, { paddingTop: keyboardVisible ? 250 : 16 }]}>
                <StatusBar style="auto" />
                <SetaVoltar />
                <Text style={styles.titulo}>Esqueceu a Senha?</Text>
                <Image source={require("../../assets/icone-estrela-confusa.png")} />
                <Text style={styles.subtitulo}>
                    Por favor insira o Email cadastrado para receber as instruções e acessar sua conta.
                </Text>
                <View style={styles.containerEmail}>
                    <View style={styles.campoEmail}>
                        <MaterialCommunityIcons 
                            name="email-outline" 
                            size={22} 
                            color="#300030" 
                            style={styles.iconeEmail}
                        />
                        <TextInput
                            style={styles.textoInputEmail}
                            value={email}
                            onChangeText={setEmail}
                            placeholder='Insira seu email cadastrado'
                            keyboardType='email-address'
                        />
                    </View>
                    <BotaoPrincipal titulo="ENVIAR" backgroundColor="#415E3E" color="#FFFFFF"
                        onPress={handleEsqueciSenha}
                        loading={loading}
                    />
                </View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: 16,
        gap: 20
    },
    titulo: {
        color: "#300030",
        fontFamily: "Pompiere_400Regular",
        fontSize: 40
    },
    subtitulo: {
        color: "#300030",
        fontFamily: "Pompiere_400Regular",
        fontSize: 20,
        textAlign: "center",
        paddingHorizontal: 20
    },
    containerEmail: {
        paddingVertical: 40,
        gap: 30
    },
    campoEmail:{
        paddingHorizontal:15, 
        flexDirection: "row", 
        gap: 10,
        height:49,
        borderColor:"#300030", 
        borderWidth: 1, 
        borderRadius: 8,
        width: 322,
    },
    iconeEmail: {
        alignSelf: "center",
        width: 35
    },
    textoInputEmail:{
        flex: 1, 
        fontFamily: "Poppins_300Light", 
        fontSize: 14 
    }
})