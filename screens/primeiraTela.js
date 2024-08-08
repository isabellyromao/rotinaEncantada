import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import { View, Image, Text} from 'react-native';
import styles from "../styles/geral"
import { BotaoPrincipal, BotaoSecundario } from  "../componentes/geral"

import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';

//Tela 100%

export default function PrimeiraTela(){
  //O useFonts ajuda a carregar as fontes 
  let [fonteCarregada, fonteErro] = useFonts({
    Pompiere_400Regular
  });

  //verifica se a fonte foi carregada e se não existe erro
  if (!fonteCarregada && !fonteErro) {
    return null;
  }

    return(
      <View style={styles.containerInicial}>
        <StatusBar style="auto" />
        <View style={styles.logo}>
          <Image source={require('../assets/logo-texto.png')}/>
          <Image source={require('../assets/logo-sapo.png')} style={{width:160, height:174}}/>
        </View>
        <Text  style={[{color: "#300030", fontFamily: "Pompiere_400Regular", fontSize: 50}]}>Seja Bem-Vindo!</Text>
        <View style={{gap:25}}>
          <BotaoPrincipal titulo="ENTRAR" onPress={() => router.push('/login')}/>
          <BotaoSecundario titulo="CADASTRAR" onPress={() => router.push('/intro')}/>
        </View>
      </View>
    );
  }
