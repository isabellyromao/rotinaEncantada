import { View, Text, ScrollView, Image, TextInput, Pressable } from "react-native";
import { useFonts } from "expo-font";
import styles from "../../styles/geral"
import { BotaoPrincipal } from "../../componentes/geral";
import { Pompiere_400Regular } from "@expo-google-fonts/pompiere";
import { NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";
import {signOut} from "firebase/auth"
import {auth} from '../../firebaseConfig'
import { router } from "expo-router";
import {BotaoSecundario} from "../../componentes/geral"

export default function TelaPerfil(){
    let [fonteCarregada, fonteErro] = useFonts({
        Pompiere_400Regular,
        NotoSans_600SemiBold
      });

    if (!fonteCarregada && !fonteErro) {
        return null;
    };

    const handleSair = async () => {
        try {
          await signOut(auth);
          router.replace('/');
        } catch (error) {
          console.error(error.code);
          console.error(error.message);
        }
      }

    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 50 }} >
        <View style={[styles.container, {gap:40, paddingTop:50}]}>
            <Text style={{ fontFamily: "Pompiere_400Regular", fontSize: 40}}>Tela de Perfil</Text>
            <View style={{flexDirection:"row"}}>
                <Image source={require("../../assets/logo-sapo.png")} style={styles.fundoAvatar}/>
                <Pressable style={{width:50, height:50, position: 'absolute', bottom: 0,left:100, alignItems: "center"}}>
                    <Image source={require("../../assets/icone-editar.png")} style={{}}/>
                </Pressable>
            </View>

            <View style={styles.fundoDados}>
                <Text style={{ fontFamily: "Pompiere_400Regular", fontSize: 35, borderBottomColor: "#415E3E", borderBottomWidth: 2, paddingBottom: 5, maxWidth: "90%" }}>
                    Dados Básicos
                </Text>
                
                <View style={{gap:10, paddingBottom:10}}>
                    <>
                        <Text style={{fontFamily:"NotoSans_600SemiBold", fontSize:16}}>Nome Completo</Text>
                        <TextInput style={{borderBottomWidth: 1, width:320, fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="Fulano da Silva"/>
                    </>
                    <>
                        <Text style={{fontFamily:"NotoSans_600SemiBold", fontSize:16}}>Data de Nascimento</Text>
                        <View style={{flexDirection:"row", alignItems: "center"}}>
                            <TextInput style={{borderBottomWidth: 1, width:75, textAlign: 'center', fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="XX"/>
                            <Text style={{fontSize: 20, alignSelf: "flex-end"}}>/</Text>
                            <TextInput style={{borderBottomWidth: 1, width:75, textAlign: 'center', fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="XX"/>
                            <Text style={{fontSize: 20, alignSelf: "flex-end"}}>/</Text>
                            <TextInput style={{borderBottomWidth: 1, width:145, textAlign: 'center', fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="XXXX"/>
                        </View>
                    </>
                    <>
                        <Text style={{fontFamily:"NotoSans_600SemiBold", fontSize:16}}>Gênero</Text>
                        <TextInput style={{borderBottomWidth: 1, width:320, fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="TalTalTal"/>
                    </>
                </View>

                <BotaoPrincipal titulo="EDITAR" backgroundColor="#415E3E" color="#FFFFFF" width={188} />
            </View>

            <View style={[styles.fundoDados]}>
                <Text style={{ fontFamily: "Pompiere_400Regular", fontSize: 35, borderBottomColor: "#415E3E", borderBottomWidth: 2, paddingBottom: 5, maxWidth: "90%" }}>
                    Dados de Login
                </Text>
                <View style={{paddingVertical:20, gap:20}}>
                    <BotaoPrincipal titulo="ATUALIZAR EMAIL" backgroundColor="#415E3E" color="#FFFFFF" width={188} />
                    <BotaoPrincipal titulo="ATUALIZAR SENHA" backgroundColor="#415E3E" color="#FFFFFF" width={188} />
                </View>
            </View>  

            <BotaoSecundario titulo="DESCONECTAR CONTA" onPress={handleSair}/>
            <Image source={require("../../assets/detalhe-estrela.png")} style={{width:35, height:35, resizeMode:"contain"}}/>
        </View>
        </ScrollView>
    )
}