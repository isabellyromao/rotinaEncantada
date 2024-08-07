import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from "../../styles/geral"
import { ComponenteTransicaoEstrela } from  "../../componentes/geral";

export default function TelaEntrando(){
    return(
        <View style={styles.container}>
            <ComponenteTransicaoEstrela titulo="Entrando..."/>
            <StatusBar style="auto"/>
        </View>
    )
} 
