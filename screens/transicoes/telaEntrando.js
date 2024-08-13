import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from "../../styles/geral"
import { ComponenteTransicaoEstrela } from  "../../componentes/geral";
import {useEffect} from 'react'
import { router } from "expo-router";

export default function TelaEntrando(){
  useEffect(() => {
    // Simula um tempo de carregamento
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500); // 2.5 segundos de tela de transição
  }, []);

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <ComponenteTransicaoEstrela titulo="Entrando..."/>
            
        </View>
    )
} 
