import { Pressable, Text, View, Image, ScrollView } from "react-native"
import { useFonts } from "expo-font";
import { Pompiere_400Regular } from "@expo-google-fonts/pompiere";
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import styles from "../styles/geral"
import { StatusBar } from "expo-status-bar"

export default function TelaHome(){
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
        <View style={styles.homeHeader}>
            <StatusBar style="auto" />
            <View style={{flexDirection:"row", alignItems:"center", justifyContent: "space-between"}}>
                <Text style={{fontFamily:"Pompiere_400Regular", fontSize:40, borderBottomColor: "#415E3E", borderBottomWidth: 2, paddingBottom:5}}>Olá, [Primeiro Nome]</Text>
                <Pressable>
                    <Image source={require('../assets/logo-sapo.png')} style={{width:60, height:60}} resizeMode="contain"/>
                </Pressable>
            </View>
            <Text style={{fontFamily:"Poppins_300Light", fontSize:14}}>Hoje é [Dia Tal]</Text>
            {/* <Image source={require('../assets/flor-de-lotus-fundo.png')} style={{alignSelf: 'center'}}/> */}
        </View>
    </ScrollView>
    )
}