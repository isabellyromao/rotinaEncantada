import { TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import styles from './styles'

export const BotaoPrincipal = (props) => {
    return(
      <TouchableOpacity style={[styles.botaoPrincipal, 
      {width: props.width || 322, height: props.height || 49, backgroundColor: "#CDE1DE", borderRadius:  8}]} onPress={props.onPress}>
  
        <Text style={[styles.botaoTextoPrincipal, {color: "#300030"}]}>
          {props.titulo}
        </Text>
  
      </TouchableOpacity>
  )
  };
  
export const BotaoSecundario = (props) => {
  return(
  <TouchableOpacity style={[styles.botaoSecundario, 
    {width: props.width || 322, height: props.heighat || 49, borderColor: props.borderColor || "#300030", borderWidth: 1, borderRadius: 8}]} onPress={props.onPress}>

      <Text style={[styles.botaoTextoSecundario, {color: "#300030"}]}>
        {props.titulo}
      </Text>

  </TouchableOpacity>
  )
}

export const TelaTransicaoEstrela = (props) => {
  return(
      <View style={styles.container}>
          <Image source={require('../assets/icone-estrela.png')}/>

          <Text style={[styles.texto, {color: "#300030"}]}>
              {props.titulo}
          </Text>
      </View>    
  )
};

export const Explicativa = (props) => {
  return(
    <View style={styles.container}>
      <Image source={props.imagem}/>

      <View style={styles.textoExplicativo}>
        <Text>{props.titulo}</Text>

        <Text style={styles.subtitulo}>{props.subtitulo}</Text>
      </View>
    </View>
  )
};


