import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, Text, View, Image, TextInput} from 'react-native';
import { NotoSans_600SemiBold  } from '@expo-google-fonts/noto-sans';
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';

export const BotaoPrincipal = (props) => {
  let [fonteCarregada, fonteErro] = useFonts({
    NotoSans_600SemiBold
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
  };

    return(
      <TouchableOpacity style={[styles.botaoPrincipal, 
        {width: props.width || 322, height: props.height || 49, backgroundColor: props.backgroundColor || "#CDE1DE", borderRadius:  8}]} 
        onPress={props.onPress}>
        <Text style={[styles.botaoTextoPrincipal, {color: props.color || "#300030", fontFamily: "NotoSans_600SemiBold", fontSize:18}]}>
          {props.titulo}
        </Text>
      </TouchableOpacity>
  )
  };
  
export const BotaoSecundario = (props) => { 
  let [fonteCarregada, fonteErro] = useFonts({
    NotoSans_600SemiBold
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
  };

  return(
  <TouchableOpacity style={[styles.botaoSecundario, 
      {width: props.width || 322, height: props.height || 49, borderColor: props.borderColor || "#300030", borderWidth: 1, borderRadius: 8}]} 
      onPress={props.onPress}>
      <Text style={[styles.botaoTextoSecundario, {color: "#300030", fontFamily: "NotoSans_600SemiBold", fontSize:18}]}>
        {props.titulo}
      </Text>
  </TouchableOpacity>
  )
}

export const ComponenteTransicaoEstrela = (props) => {
    let [fonteCarregada, fonteErro] = useFonts({
      Pompiere_400Regular
    });
  
    if (!fonteCarregada && !fonteErro) {
      return null;
    }
    
  return(
      <View style={styles.container}>
          <Image source={require('../assets/icone-estrela.png')}/>
          <Text style={[{color: "#300030", fontFamily: "Pompiere_400Regular", fontSize: 40, textAlign: "center", width: 243}]}>
              {props.titulo}
          </Text>
      </View>    
  )
};



export const Lembrete = () => {
  return(
    <View style={{flexDirection: "row", gap: 15}}>
        <Image source={require('../assets/detalhe-estrela.png')}/>
        <Text style={{fontFamily: "Poppins_400Regular", fontSize: 14}}>LEMBRETE: A senha deve ter 6 números</Text>
    </View>
  )
}


styles = StyleSheet.create({
  botaoPrincipal: {
    alignItems: 'center',
    justifyContent: "center",
  },

  botaoSecundario:{
    alignItems:"center",
    justifyContent: "center",
  },

  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },

  textoExplicativo:{
    alignItems: "center",
    gap: 18,
  },

  subtitulo:{
    textAlign: "center"
  },
  campoLogin:{
    height:49,
    borderColor:"#300030", 
    borderWidth: 1, 
    borderRadius: 8,
    justifyContent: "center",
    width: 322,
    alignSelf: "center",
    padding: 14
  },

  

})
