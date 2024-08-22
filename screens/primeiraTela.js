import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import { View, Image, Text} from 'react-native';
import { StyleSheet } from "react-native";
import { BotaoPrincipal, BotaoSecundario } from  "../componentes/geral"
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';

export default function PrimeiraTela(){
  let [fonteCarregada, fonteErro] = useFonts({
    Pompiere_400Regular
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
  }

    return(
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.logo}>
          <Image source={require('../assets/logo-texto.png')}/>
          <Image source={require('../assets/logo-sapo.png')} style={styles.tamanhoLogoSapo}/>
        </View>
        <Text style={styles.titulo}>Seja Bem-Vindo!</Text>
        <View style={{gap:25}}>
          <BotaoPrincipal titulo="ENTRAR" onPress={() => router.push('/login')}/>
          <BotaoSecundario titulo="CADASTRAR" onPress={() => router.push('/intro')}/>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 40
  },
  
  logo:{
    alignItems: "center",
    justifyContent: "center"
  },

  tamanhoLogoSapo:{
    width:160, 
    height:174
  },

  titulo:{
    color: "#300030", 
    fontFamily: "Pompiere_400Regular", 
    fontSize: 50}
})