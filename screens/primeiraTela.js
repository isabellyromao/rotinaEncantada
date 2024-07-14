import { StatusBar } from 'expo-status-bar';
import { View, Image, Text} from 'react-native';
import styles from "../styles/geral"
import { BotaoPrincipal, BotaoSecundario } from  "../componentes/geral"
import { router } from 'expo-router';
import { useFonts, Pompiere_400Regular } from '@expo-google-fonts/pompiere';

//As rotas são provisórias enquanto as outras telas não estão prontas e preciso testar as que estão

export default function PrimeiraTela(){
  //O useFonts ajuda a carregar as fontes 
  let [fonteCarregada, fonteErro] = useFonts({
    Pompiere_400Regular
  });

  //verrifica se a fonte foi carregada e se não existe erro
  if (!fonteCarregada && !fonteErro) {
    return null;
  }

    return(
      <View style={styles.containerInicial}>
        <View style={styles.logo}>
        <Image source={require('../assets/logo-texto.png')}/>
        <Image source={require('../assets/logo-sapo.png')}/>
        </View>
        <Text  style={[{color: "#300030", fontFamily: "Pompiere_400Regular", fontSize: 50, marginBottom: 20}]}
          >Seja Bem-Vindo!
        </Text>
        <View style={{gap:25}}>
          <BotaoPrincipal titulo="ENTRAR" onPress={() => router.push('/cadastro-realizado')}/>
          <BotaoSecundario titulo="CADASTRAR" onPress={() => router.push('/intro')}/>
        </View>
  
        <StatusBar style="auto" />
      </View>
    );
  }
