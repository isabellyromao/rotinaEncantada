import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from './styles'
import { TelaTransicaoEstrela } from "./componentes";

export default function TelaEntrando(props){
    return(
        <View style={styles.container}>
            <TelaTransicaoEstrela titulo="Entrando..."/>
            <StatusBar style="auto"/>
        </View>
    )
} 
