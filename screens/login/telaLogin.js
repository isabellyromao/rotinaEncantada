import { Text, View, TextInput, Image } from "react-native";
import styles from '../../styles/geral'
import { BotaoPrincipal} from  "../../componentes/geral"
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_400Regular, Poppins_300Light, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

export default function TelaLogin() {
 //O useFonts ajuda a carregar as fontes 
 let [fonteCarregada, fonteErro] = useFonts({
    Pompiere_400Regular, Poppins_400Regular, Poppins_300Light, Poppins_600SemiBold
  });

  //verrifica se a fonte foi carregada e se não existe erro
  if (!fonteCarregada && !fonteErro) {
    return null;
  }

    return(
        <View style={[styles.container, {gap:45, marginTop: 50} ]}>
            <View style={{alignItems: "center", gap: 20}}>
                <Text style={{fontFamily: "Pompiere_400Regular", fontSize: 40}}>Bem-Vindo De Volta</Text>
                <Image source={require('../../assets/icone-sapo.png')}/>
            </View>
            < View style={{alignItems: "center", gap: 20}}>
                <View style={{flexDirection: "row", gap: 15}}>
                    <Image source={require('../../assets/detalhe-estrela.png')}/>
                    <Text style={{fontFamily: "Poppins_400Regular", fontSize: 14}}>LEMBRETE: A senha deve ter 6 números</Text>
                </View>
                <TextInput style={styles.renderBotao}></TextInput>
                <TextInput style={styles.renderBotao}></TextInput>
            <BotaoPrincipal titulo="ENTRAR"/>
            </View>
            <View style={{flexDirection: "row", gap: 10, alignContent: "center"}} >
                <Text>______________________</Text>
                <Text style={{fontFamily: "Poppins_400Regular", fontSize: 14}}> OU </Text>
                <Text>______________________</Text>
            </View>
            <BotaoPrincipal titulo="ESQUECI A SENHA" backgroundColor="#415E3E" color="#FFFFFF"/>
            <View style={{flexDirection: "row", gap: 10, alignContent: "center"}}>
                <Text style={{fontFamily: "Poppins_300Light", fontSize: 14}}>Ainda não tem uma conta?</Text>
                <Link style={{fontFamily: "Poppins_600SemiBold", fontSize: 14}} href={''}>Se cadastre!</Link>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}