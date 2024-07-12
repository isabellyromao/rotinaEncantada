import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styles from './styles/geral'
import { Explicativa, BotaoSecundario } from  "./componentes/geral";

export default function TelaIntro2({navigation}){
    return(
        <View style={styles.container}>
            <Explicativa imagem={require("../assets/img-dinossauro.png")}
            titulo=" Ajudar Na Rotina Da Criançada" 
            subtitulo="Construa uma Rotina Encantada ,com perfis separados, para cada criança se divertir também"/>

            <View style={styles.botoesLadoaLado}>
                <BotaoSecundario titulo='VOLTAR' width={162} borderColor='white' onPress={() => navigation.goBack()} />
                <BotaoSecundario titulo='PRÓXIMO' width={162} onPress={() => navigation.navigate('Explicativa3')} />
            </View>
            <StatusBar style="auto"/>
        </View>
    )
}