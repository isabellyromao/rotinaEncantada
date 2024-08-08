import { Text, View, Image, ScrollView } from "react-native";
import styles from '../../styles/geral'
import { BotaoPrincipal, CampoEmail, CampoSenha, Lembrete} from  "../../componentes/geral"
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_400Regular, Poppins_300Light, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useFonts } from "expo-font";


export default function TelaLogin() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();  

    //O useFonts ajuda a carregar as fontes 
 let [fonteCarregada, fonteErro] = useFonts({
    Pompiere_400Regular, Poppins_400Regular, Poppins_300Light, Poppins_600SemiBold
  });

  //verrifica se a fonte foi carregada e se não existe erro
  if (!fonteCarregada && !fonteErro) {
    return null;
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, senha);
      setLoading(false);
      router.replace('/entrando');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      console.error(errorMessage);
      setLoading(false);
    }    
  }

    return(
        <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingTop: 50 }} 
      >
          <View style={[styles.container, {gap:45, paddingTop: 50} ]}>
            <StatusBar style="auto" />
            <View style={{alignItems: "center", gap: 20}}>
                <Text style={{fontFamily: "Pompiere_400Regular", fontSize: 40}}>Bem-Vindo De Volta</Text>
                <Image source={require('../../assets/icone-sapo.png')}/>
            </View>
            < View style={{alignItems: "center", gap: 20}}>
                <Lembrete/>
                <CampoEmail/>
                <CampoSenha/>
                <BotaoPrincipal titulo="ENTRAR"onPress={handleLogin} loading={loading}/>
            </View>
            <View style={{flexDirection: "row", gap: 10, alignContent: "center"}} >
                <Text>______________________</Text>
                <Text style={{fontFamily: "Poppins_400Regular", fontSize: 14}}> OU </Text>
                <Text>______________________</Text>
            </View>
            <BotaoPrincipal titulo="ESQUECI A SENHA" backgroundColor="#415E3E" color="#FFFFFF" onPress={() => router.push('/esqueci-senha')}/>
            <View style={{flexDirection: "row", gap: 10, alignContent: "center"}}>
                <Text style={{fontFamily: "Poppins_300Light", fontSize: 14}}>Ainda não tem uma conta?</Text>
                <Link style={{fontFamily: "Poppins_600SemiBold", fontSize: 14}} href={'\cadastro-dados-pessoais'}>Se cadastre!</Link>
            </View>
          </View>
        </ScrollView>
    )
}