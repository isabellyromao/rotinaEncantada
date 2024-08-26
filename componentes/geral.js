import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, View, Image} from 'react-native';
import { NotoSans_600SemiBold } from '@expo-google-fonts/noto-sans';
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';

export const BotaoPrincipal = (props) => {
  let [fonteCarregada, fonteErro] = useFonts({
    NotoSans_600SemiBold
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
  };

  return (
    <TouchableOpacity style={[styles.botaoPrincipal,
    { width: props.width || 322, height: props.height || 49, backgroundColor: props.backgroundColor || "#CDE1DE", borderRadius: 8 }]}
      onPress={props.onPress}>
      <Text style={[{color: props.color || "#300030", fontFamily: "NotoSans_600SemiBold", fontSize: 18 }]}>
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

  return (
    <TouchableOpacity style={[styles.botaoSecundario,
    { width: props.width || 322, height: props.height || 49, borderColor: props.borderColor || "#300030", borderWidth: 1, borderRadius: 8 }]}
      onPress={props.onPress}>
      <Text style={styles.textoBotaoSecundario}>
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

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icone-estrela.png')} />
      <Text style={styles.titulo}>
        {props.titulo}
      </Text>
    </View>
  )
};

export const Lembrete = () => {
  let [fonteCarregada, fonteErro] = useFonts({
    Poppins_400Regular
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
  }
  return (
    <View style={{ flexDirection: "row", gap: 15 }}>
      <Image source={require('../assets/detalhe-estrela.png')} />
      <Text style={styles.textoLembrete}>LEMBRETE: A senha deve ter 6 números</Text>
    </View>
  )
}

export const SetaVoltar = (props) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={router.back || props.onPress} style={styles.setaContainer}>
      <MaterialCommunityIcons
        name={"chevron-double-left"}
        size={35}
        color={"#300030"}
      />
    </TouchableOpacity>
  )
}

export const SetaCancelar = (props) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={router.back || props.onPress} style={styles.setaContainer}>
      <MaterialCommunityIcons
        name={"close"}
        size={35}
        color={"#300030"}
      />
    </TouchableOpacity>
  )
}

styles = StyleSheet.create({
  setaContainer: {
    alignSelf: "flex-start",
    position: "absolute",
    top: 85,
    paddingLeft: 50
  },
  botaoPrincipal: {
    alignItems: 'center',
    justifyContent: "center",
  },

  botaoSecundario: {
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotaoSecundario:{
     color: "#300030", 
     fontFamily: "NotoSans_600SemiBold", 
     fontSize: 18 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  titulo:{
    color: "#300030", 
    fontFamily: "Pompiere_400Regular", 
    fontSize: 40, 
    textAlign: "center", 
    width: 243 
  },
  textoLembrete:{ 
    fontFamily: "Poppins_400Regular", 
    fontSize: 14 
  }
})