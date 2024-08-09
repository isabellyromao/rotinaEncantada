import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";
import styles from "../../styles/geral"
import { ComponenteTransicaoEstrela, BotaoSecundario } from  "../../componentes/geral";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function TelaCadastroRealizado(){
    let [fonteCarregada, fonteErro] = useFonts({
        Poppins_400Regular
    });

    if (!fonteCarregada && !fonteErro) {
        return null;
    };

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <ComponenteTransicaoEstrela titulo="Cadastro Realizado com Sucesso!"/>
            <Text style={[styles.textoFooter, {fontFamily: "Poppins_400Regular"}]}>
                Deseja adicionar {"\n"}algum membro familiar?
            </Text>
            <View style={styles.botoesLadoaLado}>
                <BotaoSecundario titulo='SIM' width={68} onPress={() => router.push('/adicionar-perfil')}  />
                <BotaoSecundario titulo='NÃO' width={68} onPress={() => router.push('/home')}/>
            </View>
        </View>
    )
}; 


//As telas das duas rotas ainda serão feitas