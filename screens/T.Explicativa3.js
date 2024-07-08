import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Explicativa, BotaoSecundario } from "./componentes";
import styles from "./styles";

export default function Explicativa3(props){
    return(
        <View style={styles.container}>
            <Explicativa imagem={require("../assets/img-pintar1.png")}
            titulo="Recompensas Encantadoras" 
            subtitulo="Desbloqueie desenhos encantadores e explore seu lado artístico pintando."/>

            <BotaoSecundario titulo='COMEÇAR JORNADA' />

            <StatusBar style="auto"/>
        </View>
    )
}