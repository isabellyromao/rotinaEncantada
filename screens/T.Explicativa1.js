import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Explicativa, BotaoSecundario } from "./componentes";
import styles from "./styles";

export default function Explicativa1(props){
    return(
        <View style={styles.container}>
            <Explicativa imagem={require("../assets/img-todolist.png")}
            titulo="Organize Sua Rotina De Forma Mágica!" 
            subtitulo="Crie sua rotina com listas personalizadas com interatividades únicas e se divertindo. "/>

            <View style={styles.botoesLadoaLado}>
                <BotaoSecundario titulo='VOLTAR' width={162} borderColor='white'/>
                <BotaoSecundario titulo='PRÓXIMO' width={162} />
            </View>
            <StatusBar style="auto"/>
        </View>
    )
}