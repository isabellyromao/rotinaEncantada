import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from './styles/geral'
import { Explicativa, BotaoSecundario } from  "./componentes/geral";

export default function TelaIntro3(props){
    return(
        <View style={styles.container}>
            <Explicativa imagem={require("../assets/img-pintar1.png")}
            titulo="Recompensas Encantadoras" 
            subtitulo="Desbloqueie desenhos encantadores e explore seu lado artístico pintando."/>

            <View style={{paddingBottom:16}}>
            <BotaoSecundario titulo='COMEÇAR JORNADA' />
            </View>

            <StatusBar style="auto"/>
        </View>
    )
}