import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from './styles/geral'
import { Explicativa, BotaoSecundario } from "./componentes/geral";


export default function TelaIntro1({navigation}){
    return(
        <View style={styles.container}>
            <Explicativa imagem={require("../assets/img-todolist.png")}
            titulo="Organize Sua Rotina De Forma Mágica!" 
            subtitulo="Crie sua rotina com listas personalizadas com interatividades únicas e se divertindo. "/>

            <View style={styles.botoesLadoaLado}>
                <BotaoSecundario titulo='VOLTAR' width={162} borderColor='white'onPress={() => navigation.goBack()}/>
                <BotaoSecundario titulo='PRÓXIMO' width={162} onPress={() => navigation.navigate('Explicativa2')} />
            </View>
            <StatusBar style="auto"/>
        </View>
    )
}