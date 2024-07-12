import { StatusBar } from 'expo-status-bar';
import { View, Image, Text} from 'react-native';
import styles from './styles/geral'
import { BotaoPrincipal, BotaoSecundario } from  "./componentes/geral";


export default function PrimeiraTela({navigation}){
    return(
      <View style={styles.containerInicial}>
        
        <View style={styles.logo}>
        <Image source={require('../assets/logo-texto.png')}/>
        <Image source={require('../assets/logo-sapo.png')}/>
        </View>
  
        <Text>Seja Bem-Vindo!</Text>
  
        <View style={styles.botoes}>
          <BotaoPrincipal titulo="ENTRAR" onPress={() => navigation.navigate('Explicativa1')}/>
          <BotaoSecundario titulo="CADASTRAR" onPress={() => navigation.navigate('Explicativa3')}/>
        </View>
  
        <StatusBar style="auto" />
      </View>
    );
  }