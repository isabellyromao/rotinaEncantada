import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from "../../styles/geral"
import { ComponenteTelaIntro, BotaoSecundario } from  "../../componentes/geral";
import { router } from "expo-router";

export default function TelaIntro2(){
    return(
        <View style={styles.container}>
            <ComponenteTelaIntro imagem={require("../assets/img-dinossauro.png")}
            titulo=" Ajudar Na Rotina Da Criançada" 
            subtitulo="Construa uma Rotina Encantada ,com perfis separados, para cada criança se divertir também"/>

            <View style={styles.botoesLadoaLado}>
                <BotaoSecundario titulo='VOLTAR' width={162} borderColor='white' onPress={() => router.back()} />
                <BotaoSecundario titulo='PRÓXIMO' width={162} onPress={() => router.push('')} />
            </View>
            <StatusBar style="auto"/>
        </View>
    )
}