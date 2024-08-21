import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import React, { useState, useRef } from 'react';
import { TouchableOpacity, Text, View, Image, Dimensions, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { NotoSans_600SemiBold  } from '@expo-google-fonts/noto-sans';
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
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
  const swiper = useRef();
  const [valor, setValor] = useState(new Date());
  const [semana, setSemana] = useState(0);

  // Calcula as semanas com base no estado da semana
  const semanas = React.useMemo(() => {
    const inicio = moment().add(semana, 'weeks').startOf('week');
    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const data = moment(inicio).add(adj, 'weeks').add(index, 'days');
        return {
          diaDaSemana: data.format('ddd').toUpperCase(), // Abreviação do dia da semana em português
          data: data.toDate(),
        };
      });
    });
  }, [semana]);

  return (
        <View style={styles.seletor}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={indice => {
              if (indice === 1) {
                return;
              }
              setTimeout(() => {
                const novoIndice = indice - 1;
                const novaSemana = semana + novoIndice;
                setSemana(novaSemana);
                setValor(moment(valor).add(novoIndice, 'semana').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {semanas.map((datas, index) => (
              <View style={styles.linhaItens} key={index}>
                {datas.map((item, indexData) => {
                  const isAtivo = valor.toDateString() === item.data.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={indexData}
                      onPress={() => setValor(item.data)}>
                      <View
                        style={[
                          styles.item,
                          isAtivo && {
                            backgroundColor: '#111',
                            borderColor: '#111',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.diaDaSemana,
                            isAtivo && { color: '#fff' },
                          ]}>
                          {item.diaDaSemana}
                        </Text>
                        <Text
                          style={[
                            styles.data,
                            isAtivo && { color: '#fff' },
                          ]}>
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
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  linhaItens: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  diaDaSemana: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',// Configuração de idioma para português
  }})