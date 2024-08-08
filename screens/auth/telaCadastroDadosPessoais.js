import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Link } from "expo-router";
import { View, TextInput, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import styles from '../../styles/geral'
import { BotaoSecundario } from "../../componentes/geral";
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_300Light, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Lembrete } from "../../componentes/geral";

export default function TelaCadastroDadosPessoais() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [esconderSenha, setEsconderSenha] = useState(true);

    let [fonteCarregada, fonteErro] = useFonts({
        Pompiere_400Regular,
        Poppins_300Light, Poppins_600SemiBold,
        NotoSans_600SemiBold
      });

    if (!fonteCarregada && !fonteErro) {
        return null;
    };
    
    return(
        <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingTop: 50 }} 
      >
        <View style={[styles.container, {gap:40, paddingTop:50}]}>
        <StatusBar style="auto" />
            <>
                <Text style={[{color: "#300030", fontFamily: "Pompiere_400Regular", fontSize: 40}]}>Cadastre-Se</Text>
                <Image source={require('../../assets/logo-sapo.png')} style={styles.fundoAvatar}/>
            </>
            <View style={{gap:20}}>
                <TextInput style={{borderBottomWidth: 1, width:320, fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="Insira o nome completo"/>
                <View style={{gap:5}}>
                <Text style={{fontFamily:"NotoSans_600SemiBold", fontSize:14}}>Data de Nascimento</Text>
                    <View style={{flexDirection:"row", alignItems: "center"}}>
                        <TextInput style={{borderBottomWidth: 1, width:75, textAlign: 'center', fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="Dia"/>
                        <Text style={{fontSize: 20, alignSelf: "flex-end"}}>/</Text>
                        <TextInput style={{borderBottomWidth: 1, width:75, textAlign: 'center', fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="Mês"/>
                        <Text style={{fontSize: 20, alignSelf: "flex-end"}}>/</Text>
                        <TextInput style={{borderBottomWidth: 1, width:145, textAlign: 'center', fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="Ano"/>
                    </View>
                </View>
                <TextInput style={{borderBottomWidth: 1, width:270, fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="Insira ou selecione seu gênero"/>
            </View>
            <BotaoSecundario titulo="CONTINUAR" width={162} onPress={() => router.push('/cadastro-login')}/>
            <View style={{flexDirection: "row", gap: 10, alignContent: "center", marginTop:100 }}>
                <Text style={{fontFamily: "Poppins_300Light", fontSize: 14}}>Já tem conta?</Text>
                <Link style={{fontFamily: "Poppins_600SemiBold", fontSize: 14}} href={'\login'}>Faça Login!</Link>
            </View>
        </View>
        </ScrollView>
    )
}