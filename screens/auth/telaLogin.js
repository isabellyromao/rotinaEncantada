import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { Alert, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Keyboard } from "react-native";
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BotaoPrincipal, Lembrete } from "../../componentes/geral"
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_400Regular, Poppins_300Light, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const terSeisNumeros = (password) => (password.match(/\d/g) || []).length == 6;

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [esconderSenha, setEsconderSenha] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  //Função para capturar se o teclado está ativo ou desativo
  useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => setKeyboardVisible(true)
      );
      const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => setKeyboardVisible(false)
      );
  
      // Limpa
      return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
      };
  }, []);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!emailValido(email)) {
      Alert.alert("Erro", "E-mail inválido. \nVerifique o formato do seu e-mail. \nTente novamente com atenção :)");
      return;
    }

    if (!terSeisNumeros(senha)) {
      Alert.alert("Erro", "Senha inválida. \nVerifique se estão os 6 números. \nTente novamente com atenção :)");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Verifica se o e-mail foi verificado
      if (user.emailVerified) {
        setLoading(false);
        router.replace('/entrando');
      } else {
        setLoading(false);
        await sendEmailVerification(userCredential.user);
        Alert.alert("Verificação de E-mail", "Seu e-mail ainda não foi verificado. \nPor favor, verifique sua caixa de entrada antes de fazer login.");
      }
    } catch (error) {
      console.log("Código do erro Firebase:", error.code);
      console.error(error.message);
      setLoading(false);
      let errorMessage = "Ocorreu um erro. \nTente novamente com atenção :).";

      switch (error.code) {
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = "E-mail ou senha incorretos. \nTente novamente com atenção :)";
          break;
        case 'auth/user-not-found':
          errorMessage = "Email não cadastrado. \nTente novamente com atenção :)";
          break;
        default:
          errorMessage = "Ocorreu um erro. \nTente novamente com atenção :)";
      }

      Alert.alert("Erro", errorMessage);
    }
  }

  let [fonteCarregada, fonteErro] = useFonts({
    Pompiere_400Regular, Poppins_400Regular, Poppins_300Light, Poppins_600SemiBold
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: keyboardVisible ? 250 : 16 }]}>
        <StatusBar style="auto" />
        <View style={styles.containerSecundario}>
          <Text style={styles.titulo}>Bem-Vindo De Volta</Text>
          <Image source={require('../../assets/icone-sapo.png')} />
        </View>
        < View style={styles.containerSecundario}>
          <Lembrete/>
          <View style={styles.containerCampos}>
            <MaterialCommunityIcons name="email-outline" size={22} color="#300030" style={styles.iconeBotao}/>
            <TextInput style={styles.campo}
              value={email} 
              onChangeText={setEmail} 
              placeholder='Insira seu email cadastrado' 
              keyboardType="email-address" />
          </View>
          <View style={styles.containerCampos}>
            <TouchableOpacity 
              style={[styles.iconeBotaoSenha, esconderSenha && styles.iconeBotaoAtivado]} 
              onPress={() => setEsconderSenha(true)}>
              <MaterialCommunityIcons 
                name="lock-outline" 
                size={22} color="#300030" 
                style={{alignSelf:"center"}}
              />
            </TouchableOpacity>
            <TextInput style={styles.campo}
              secureTextEntry={esconderSenha} 
              value={senha} 
              onChangeText={setSenha} 
              keyboardType="numeric" 
              placeholder="Insira sua senha cadastrada"
            />
            <TouchableOpacity 
              style={[styles.iconeBotaoSenha, !esconderSenha && styles.iconeBotaoAtivado]} 
              onPress={() => setEsconderSenha(false)}>
              <MaterialCommunityIcons 
                name="lock-open-outline" 
                size={22} color="#300030" 
                style={{alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
          <BotaoPrincipal titulo="ENTRAR" onPress={handleLogin} loading={loading} />
        </View>
        <View style={styles.containerOu} >
          <Text>______________________</Text>
          <Text style={styles.textoOu}> OU </Text>
          <Text>______________________</Text>
        </View>
        <BotaoPrincipal 
          titulo="ESQUECI A SENHA" 
          backgroundColor="#415E3E" 
          color="#FFFFFF" 
          onPress={() => router.push('/esqueci-senha')}/>
        <View style={styles.containerTextoFinal}>
          <Text style={styles.textoFinal}>Ainda não tem uma conta?</Text>
          <Link style={styles.textoFinalLink} href={'\intro'}>Se cadastre!</Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: "center",
    padding: 16,
    gap: 45
  },
  containerSecundario: {
    alignItems: "center",
    gap: 20
  },
  titulo:{
    fontFamily: "Pompiere_400Regular", 
    fontSize: 40 
  },
  containerCampos:{
    paddingHorizontal:15, 
    flexDirection: "row", 
    gap: 10,
    height:49,
    borderColor:"#300030", 
    borderWidth: 1, 
    borderRadius: 8,
    width: 322
  },
  iconeBotao:{
    alignSelf: "center", 
    width: 35
  },
  campo:{
    flex: 1, 
    fontFamily: "Poppins_300Light", 
    fontSize: 14 
  },
  iconeBotaoSenha: {
    borderRadius: 100,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center"
  },
  iconeBotaoAtivado: {
    backgroundColor: '#CDE1DE',
  },
  containerOu:{
    flexDirection: "row", 
    gap: 10, 
    alignContent:"center" 
  },
  textoOu:{
    fontFamily: "Poppins_400Regular", 
    fontSize: 14 
  },
  containerTextoFinal:{ 
    flexDirection: "row", 
    gap: 10, 
    alignContent: "center"
  },
  textoFinal:{
    fontFamily: "Poppins_300Light", 
    fontSize: 14 
  },
  textoFinalLink:{
    fontFamily: "Poppins_600SemiBold", 
    fontSize: 14
  }
})