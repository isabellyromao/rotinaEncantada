import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from "../../styles/geral"
import { TelaTransicaoEstrela } from  "../../componentes/geral";

export default function TelaEntrando(){
    return(
        <View style={styles.container}>
            <TelaTransicaoEstrela titulo="Entrando..."/>
            <StatusBar style="auto"/>
        </View>
    )
} 
