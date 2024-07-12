import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import styles from './styles/geral'
import { TelaTransicaoEstrela, BotaoSecundario } from  "./componentes/geral";

export default function TelaCadastroRealizado(props){
    return(
        <View style={styles.container}>
            <TelaTransicaoEstrela titulo="Cadastro Realizado com Sucesso!"/>
            <Text style={styles.textoFooter}>Deseja adicionar {"\n"}algum membro familiar?</Text>
            <View style={styles.botoesLadoaLado}>
                <BotaoSecundario titulo='SIM' width={68} />
                <BotaoSecundario titulo='NÃO' width={68} />
            </View>
            <StatusBar style="auto"/>
        </View>
    )
} 
