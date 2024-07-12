import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import styles from "../../styles/geral"
import { ComponenteTransicaoEstrela } from  "../../componentes/geral";

export default function TelaTudoPronto(){
    return(
        <View style={styles.container}>
            <ComponenteTransicaoEstrela titulo="Tudo Pronto!"/>
            <Text style={styles.textoFooter}>Você será encaminhado {"\n"}para entrar na sua conta</Text>
            <StatusBar style="auto"/>
        </View>
    )
} 
