import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import React, { useState, useRef, useMemo } from 'react';
import { TouchableOpacity, Text, View, Image, Dimensions, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { NotoSans_600SemiBold  } from '@expo-google-fonts/noto-sans';
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import moment from 'moment';
import 'moment/locale/pt-br'; // Certifique-se de importar o locale para português
import Swiper from 'react-native-swiper';

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
// Configuração de idioma para português
moment.locale('pt-br');

const { width } = Dimensions.get('window');

export const CalendarioVertical = () => {
  const [fonteCarregada] = useFonts({
    Pompiere_400Regular,
    Poppins_400Regular,
  });

  const swiper = useRef();
  const [valor, setValor] = useState(new Date());
  const [semana, setSemana] = useState(0);

  // Calcula as semanas com base no estado da semana
  const semanas = useMemo(() => {
    const inicio = moment().add(semana, 'weeks').startOf('week');
    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const data = moment(inicio).add(adj, 'weeks').add(index, 'days');
        return {
          diaDaSemana: data.format('ddd').toUpperCase(),
          data: data.toDate(),
        };
      });
    });
  }, [semana]);

  const mesAtual = moment(valor).format('MMMM YYYY').toUpperCase();
  const hoje = new Date();

  if (!fonteCarregada) {
    return null;
  }

  return (
    <View style={styles.seletor}>
      <Text style={styles.mesAtual}>{mesAtual}</Text>
      <Swiper
        index={1}
        ref={swiper}
        loop={false}
        showsPagination={false}
        onIndexChanged={(indice) => {
          if (indice === 1) {
            return;
          }
          setTimeout(() => {
            const novoIndice = indice - 1;
            const novaSemana = semana + novoIndice;
            setSemana(novaSemana);
            setValor(moment(valor).add(novoIndice, 'weeks').toDate());
            swiper.current.scrollTo(1, false);
          }, 100);
        }}
      >
        {semanas.map((datas, index) => (
          <View style={styles.linhaItens} key={index}>
            {datas.map((item, indexData) => {
              const isAtivo = valor.toDateString() === item.data.toDateString();
              const isHoje = hoje.toDateString() === item.data.toDateString();
              return (
                <TouchableWithoutFeedback
                  key={indexData}
                  onPress={() => setValor(item.data)}
                >
                  <View
                    style={[
                      styles.item,
                      isHoje && styles.itemHoje,
                      isAtivo && !isHoje && styles.itemAtivo,
                    ]}
                  >
                    <Text
                      style={[
                        styles.diaDaSemana,
                        (isHoje || isAtivo) && { color: '#000000' },
                      ]}
                    >
                      {item.diaDaSemana}
                    </Text>
                    <Text
                      style={[
                        styles.data,
                        (isHoje || isAtivo) && { color: '#000000' },
                      ]}
                    >
                      {item.data.getDate()}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        ))}
      </Swiper>
    </View>
  );
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
  seletor: {
    flex: 1,
    maxHeight: 120,
    alignItems: 'center',
    justifyContent: "center",
  },

  linhaItens: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 17,

  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#300030',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemHoje: {
    backgroundColor: '#FBF4E2', // Cor de fundo específica para o dia atual
  },
  itemAtivo: {
    backgroundColor: '#CDE1DE', // Cor de fundo específica para o dia selecionado
  },
  diaDaSemana: {
    fontSize: 12,
    fontFamily: "Pompiere_400Regular",
    color: '#000000',
  },
  data: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: '#000000',
  },
  mesAtual: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    color: '#300030',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});
