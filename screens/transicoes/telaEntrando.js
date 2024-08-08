import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from "../../styles/geral"
import { ComponenteTransicaoEstrela } from  "../../componentes/geral";

export default function TelaEntrando(){
    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <ComponenteTransicaoEstrela titulo="Entrando..."/>
            
        </View>
    )
} 
