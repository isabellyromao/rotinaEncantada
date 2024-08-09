import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Link } from "expo-router";
import { View, TextInput, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import styles from '../../styles/geral'
import { BotaoSecundario } from "../../componentes/geral";
import { Poppins_300Light, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Lembrete } from "../../componentes/geral";


export default function TelaCadastroLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [esconderSenha, setEsconderSenha] = useState(true);

    let [fonteCarregada, fonteErro] = useFonts({
        Poppins_300Light, Poppins_600SemiBold
      });

    if (!fonteCarregada && !fonteErro) {
        return null;
    };
    
    return(
        <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingTop: 50 }} 
      >
        <View style={[styles.container, {gap:40, paddingTop:80}]}>
        <StatusBar style="auto" />
            <>
                <Image source={require('../../assets/logo-sapo.png')} style={styles.fundoAvatar}/>
            </>
            <View style={{gap:20}}>
                <View style={styles.Campos}>
                    <MaterialCommunityIcons name="email-outline" size={22} color="#300030" style={{alignSelf: "center", width:35 }} />
                    <TextInput style={{flex: 1,  fontFamily:"Poppins_300Light", fontSize: 14}}
                        label="E-mail" value={email} onChangeText={setEmail} placeholder='Insira seu email cadastrado'/>
                </View> 
                <Lembrete/>
                <View style={styles.Campos}>
                    <TouchableOpacity style={[styles.iconeBotao, esconderSenha && styles.iconeBotaoAtivado]} onPress={() => setEsconderSenha(true)}>
                    <MaterialCommunityIcons name="lock-outline" size={22} color="#300030" style={{alignSelf: "center"}}/>
                    </TouchableOpacity>
                    <TextInput style={{ flex: 1, fontFamily:"Poppins_300Light", fontSize: 14}}
                    keyboardType="number"placeholder="Insira sua senha cadastrada"
                    secureTextEntry={esconderSenha} label="Senha" value={senha} onChangeText={setSenha}/>
                    <TouchableOpacity  style={[styles.iconeBotao, !esconderSenha && styles.iconeBotaoAtivado]} onPress={() => setEsconderSenha(false)}>
                    <MaterialCommunityIcons name="lock-open-outline" size={22} color="#300030" style={{alignSelf: "center"}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.Campos}>
                    <TouchableOpacity style={[styles.iconeBotao, esconderSenha && styles.iconeBotaoAtivado]} onPress={() => setEsconderSenha(true)}>
                    <MaterialCommunityIcons name="lock-outline" size={22} color="#300030" style={{alignSelf: "center"}}/>
                    </TouchableOpacity>
                    <TextInput style={{ flex: 1, fontFamily:"Poppins_300Light", fontSize: 14}}
                    keyboardType="number"placeholder="Insira sua senha cadastrada"
                    secureTextEntry={esconderSenha} label="Senha" value={senha} onChangeText={setSenha}/>
                    <TouchableOpacity  style={[styles.iconeBotao, !esconderSenha && styles.iconeBotaoAtivado]} onPress={() => setEsconderSenha(false)}>
                    <MaterialCommunityIcons name="lock-open-outline" size={22} color="#300030" style={{alignSelf: "center"}}/>
                    </TouchableOpacity>
                </View>
            </View>
            <BotaoSecundario titulo="CADASTRAR" width={162} onPress={() => router.push('/cadastro-realizado')}/>
            <View style={{flexDirection: "row", gap: 10, alignContent: "center", marginTop:100 }}>
                <Text style={{fontFamily: "Poppins_300Light", fontSize: 14}}>Já tem conta?</Text>
                <Link style={{fontFamily: "Poppins_600SemiBold", fontSize: 14}} href={'\login'}>Faça Login!</Link>
            </View>
        </View>
        </ScrollView>
    )
}