import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import styles from "../../styles/geral"
import { ComponenteTransicaoEstrela, BotaoSecundario } from  "../../componentes/geral";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function TelaCadastroRealizado(){
//O useFonts ajuda a carregar as fontes 
let [fonteCarregada, fonteErro] = useFonts({
    Poppins_400Regular
  });

  //verrifica se a fonte foi carregada e se não existe erro
  if (!fonteCarregada && !fonteErro) {
    return null;
  }

    return(
        <View style={styles.container}>
            <ComponenteTransicaoEstrela titulo="Cadastro Realizado com Sucesso!"/>
            <Text style={[styles.textoFooter, {fontFamily: "Poppins_400Regular"}]}>
                Deseja adicionar {"\n"}algum membro familiar?
            </Text>
            <View style={styles.botoesLadoaLado}>
                <BotaoSecundario titulo='SIM' width={68}  />
                <BotaoSecundario titulo='NÃO' width={68} />
            </View>
            <StatusBar style="auto"/>
        </View>
    )
} 
