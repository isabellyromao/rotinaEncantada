import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";
import styles from "../../styles/geral"
import { ComponenteTransicaoEstrela } from  "../../componentes/geral";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function TelaTudoPronto(){
//O useFonts ajuda a carregar as fontes 
let [fonteCarregada, fonteErro] = useFonts({
    Poppins_400Regular
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
  };

    return(
        <View style={styles.container}>
          <StatusBar style="auto"/>
          <ComponenteTransicaoEstrela titulo="Tudo Pronto!"/>
          <Text style={[styles.textoFooter, {fontFamily: "Poppins_400Regular"}]}>
              Você será encaminhado {"\n"}para entrar na sua conta
          </Text> 
        </View>
    );
}; 
