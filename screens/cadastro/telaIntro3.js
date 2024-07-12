import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from "../../styles/geral"
import { ComponenteTelaIntro, BotaoSecundario } from  "../../componentes/geral";
import { router } from "expo-router";

export default function TelaIntro3(){
    return(
        <View style={styles.container}>
            <ComponenteTelaIntro imagem={require("../assets/img-pintar1.png")}
            titulo="Recompensas Encantadoras" 
            subtitulo="Desbloqueie desenhos encantadores e explore seu lado artístico pintando."/>

            <View style={{paddingBottom:16}}>
            <BotaoSecundario titulo='COMEÇAR JORNADA' onPress={() => router.replace('')} />
            </View>

            <StatusBar style="auto"/>
        </View>
    )
}