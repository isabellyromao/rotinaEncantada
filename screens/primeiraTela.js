import { StatusBar } from 'expo-status-bar';
import { View, Image, Text} from 'react-native';
import styles from "../styles/geral"
import { BotaoPrincipal, BotaoSecundario } from  "../componentes/geral"
import { router } from 'expo-router';

//As rotas são provisórias enquanto as outras telas não estão prontas e preciso testar as que estão

export default function PrimeiraTela(){
    return(
      <View style={styles.containerInicial}>
        <View style={styles.logo}>
        <Image source={require('../assets/logo-texto.png')}/>
        <Image source={require('../assets/logo-sapo.png')}/>
        </View>
        <Text>Seja Bem-Vindo!</Text>
        <View style={styles.botoes}>
          <BotaoPrincipal titulo="ENTRAR" onPress={() => router.push('../app/(rotas)/cadastro-realizado')}/>
          <BotaoSecundario titulo="CADASTRAR" onPress={() => router.push('../app/(rotas)/tudo-pronto')}/>
        </View>
  
        <StatusBar style="auto" />
      </View>
    );
  }