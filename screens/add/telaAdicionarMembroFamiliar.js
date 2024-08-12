import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";
import styles from "../../styles/geral"
import { BotaoSecundario } from  "../../componentes/geral";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Pompiere_400Regular } from "@expo-google-fonts/pompiere";

export default function TelaAdicionarMembro(){
    let [fonteCarregada, fonteErro] = useFonts({
        Pompiere_400Regular,
        Poppins_400Regular
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
                <Text style={[{color: "#300030", fontFamily: "Pompiere_400Regular", fontSize: 40}]}>Adicionar Membro Familiar</Text>
                <Image source={require('../../assets/icone-estrela-Feliz.png')}/>
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
                <TextInput style={{borderBottomWidth: 1, width:270, fontFamily:"Poppins_300Light", fontSize: 14}} placeholder="O que essa pessoa é sua?"/>
            </View>
            <BotaoSecundario titulo="CONTINUAR" width={162} onPress={() => router.push('/cadastro-login')}/>
        </View>
        </ScrollView>
       

    )
}