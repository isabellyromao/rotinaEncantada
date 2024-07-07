import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BotaoPrincipal = (props) => {
  return(
    <TouchableOpacity style={[styles.botaoPrincipal, 
    {width: props.width || 322, height: props.height || 49, backgroundColor: "#CDE1DE", borderRadius:  8}]} onPress={props.onPress}>
      <Text style={[styles.botaoTextoPrincipal, {color: "#300030"}]}>
        {props.titulo}
      </Text>
    </TouchableOpacity>
)
};

const BotaoSecundario = (props) => {
  return(
  <TouchableOpacity style={[styles.botaoSecundario, 
    {width: props.width || 322, height: props.heighat || 49, borderColor: "#300030", borderWidth: 1, borderRadius: 8}]} onPress={props.onPress}>
      <Text style={[styles.botaoTextoSecundario, {color: "#300030"}]}>
        {props.titulo}
      </Text>
  </TouchableOpacity>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      
      <View style={styles.logo}>
      <Image source={require('./assets/logo-texto.png')}/>
      <Image source={require('./assets/logo-sapo.png')}/>
      </View>

      <Text>Seja Bem-Vindo!</Text>

      <View style={styles.botoes}>
        <BotaoPrincipal titulo="ENTRAR" />
        <BotaoSecundario titulo="CADASTRAR"/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 50

  },

  botaoPrincipal: {
    alignItems: 'center',
    justifyContent: "center",
  },

  botaoSecundario:{
    alignItems:"center",
    justifyContent: "center",
  },

  botoes:{
    gap: 25
  },

  logo:{
    alignItems: "center",
    justifyContent: "center",
  },
});
