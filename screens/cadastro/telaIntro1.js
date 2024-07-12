import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from "../../styles/geral"
import { ComponenteTelaIntro, BotaoSecundario } from "../../componentes/geral";
import { router } from "expo-router";


export default function TelaIntro1(){
    return(
        <View style={styles.container}>
            <ComponenteTelaIntro imagem={require("../assets/img-todolist.png")}
            titulo="Organize Sua Rotina De Forma Mágica!" 
            subtitulo="Crie sua rotina com listas personalizadas com interatividades únicas e se divertindo. "/>

            <View style={styles.botoesLadoaLado}>
                <BotaoSecundario titulo='VOLTAR' width={162} borderColor='white'onPress={() => router.back()}/>
                <BotaoSecundario titulo='PRÓXIMO' width={162} onPress={() => router.push('')} />
            </View>
            <StatusBar style="auto"/>
        </View>
    )
}