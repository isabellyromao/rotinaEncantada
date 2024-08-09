import { useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { Alert } from "react-native";
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from '../../styles/geral'
import { BotaoPrincipal, Lembrete} from  "../../componentes/geral"
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_400Regular, Poppins_300Light, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// Função para validar e-mail
const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Função para verificar se a senha contém pelo menos 6 números
const terSeisNumeros = (password) => (password.match(/\d/g) || []).length == 6;

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [esconderSenha, setEsconderSenha] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();  

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");  // Alert for empty fields
      return;
    }

    if (!emailValido(email)) {
      Alert.alert("Erro", "E-mail inválido. \nVerifique o formato do seu e-mail. \nTente novamente com atenção :)");
      return;
    }

    if (!terSeisNumeros(senha)){
      Alert.alert("Erro", "Senha inválida. \nVerifique se estão os 6 números. \nTente novamente com atenção :)");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, senha);
      setLoading(false);
      router.replace('/entrando');
    } catch (error) {
      console.log("Código do erro Firebase:", error.code);
      setLoading(false);
      let errorMessage = "Ocorreu um erro. \nTente novamente com atenção :).";  // Default message

      // Customize error messages based on Firebase error codes
      switch (error.code) {
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = "E-mail ou senha incorretos. \nTente novamente com atenção :)";
          break;
        case 'auth/user-not-found':
          errorMessage = "Email não cadastrado. \nTente novamente com atenção :)";
          break;
        default:
          errorMessage = "Ocorreu um erro. \nTente novamente com atenção :)";  // Generic error alert
      }

      Alert.alert("Erro", errorMessage);  // Show customized error message
    }    
  }

  let [fonteCarregada, fonteErro] = useFonts({
    Pompiere_400Regular, Poppins_400Regular, Poppins_300Light, Poppins_600SemiBold
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
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
                <View style={styles.Campos}>
                  <MaterialCommunityIcons name="email-outline" size={22} color="#300030" style={{alignSelf: "center", width:35 }} />
                  <TextInput style={{flex: 1,  fontFamily:"Poppins_300Light", fontSize: 14}}
                    label="E-mail" value={email} onChangeText={setEmail} placeholder='Insira seu email cadastrado' keyboardType="email-address"/>
                </View>   
                <View style={styles.Campos}>
                  <TouchableOpacity style={[styles.iconeBotao, esconderSenha && styles.iconeBotaoAtivado]} onPress={() => setEsconderSenha(true)}>
                    <MaterialCommunityIcons name="lock-outline" size={22} color="#300030" style={{alignSelf: "center"}}/>
                  </TouchableOpacity>
                  <TextInput style={{ flex: 1, fontFamily:"Poppins_300Light", fontSize: 14}}
                    keyboardType="numeric" placeholder="Insira sua senha cadastrada"
                    secureTextEntry={esconderSenha} label="Senha" value={senha} onChangeText={setSenha}/>
                  <TouchableOpacity  style={[styles.iconeBotao, !esconderSenha && styles.iconeBotaoAtivado]} onPress={() => setEsconderSenha(false)}>
                    <MaterialCommunityIcons name="lock-open-outline" size={22} color="#300030" style={{alignSelf: "center"}}/>
                  </TouchableOpacity>
                </View>
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