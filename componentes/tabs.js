import moment from 'moment';
import 'moment/locale/pt-br'; // Certifique-se de importar o locale para português
import Swiper from 'react-native-swiper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from 'expo-font';
import { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { NotoSans_600SemiBold } from '@expo-google-fonts/noto-sans';

export const CampoDataDeNascimento = ({ onChangeDate, value, editable }) => {
    const [fonteCarregada] = useFonts({
        NotoSans_600SemiBold,
        Poppins_300Light,
      });
    
      if (!fonteCarregada && !fonteErro) {
        return null;
      }

    const [date, setDate] = useState(value ? new Date(value) : new Date());
    const [show, setShow] = useState(false);
    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
  
    useEffect(() => {
      if (value) {
        const parsedDate = new Date(value);
        setDate(parsedDate);
        setDia(formatDay(parsedDate));
        setMes(formatMonth(parsedDate));
        setAno(formatYear(parsedDate));
      }
    }, [value]);
  
    const toggleDatePicker = () => {
      if (editable) {
        setShow(!show);
      }
    };
  
    const onChange = (_, selectedDate) => {
      if (selectedDate && selectedDate instanceof Date) {
        setDate(selectedDate);
        const formattedDate = formatDate(selectedDate);
        if (onChangeDate) onChangeDate(formattedDate);
        setDia(formatDay(selectedDate));
        setMes(formatMonth(selectedDate));
        setAno(formatYear(selectedDate));
      }
      toggleDatePicker();
    };
  
    // Funções ajustadas para UTC
    const formatDay = (date) => date.getUTCDate().toString().padStart(2, '0');
    const formatMonth = (date) => (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const formatYear = (date) => date.getUTCFullYear().toString();
    const formatDate = (date) => `${formatYear(date)}-${formatMonth(date)}-${formatDay(date)}`;
  
    return (
      <View style={{ gap: 5 }}>
        <Text style={styles.label}>Data de Nascimento</Text>
        <TouchableOpacity onPress={toggleDatePicker}>
          <View style={styles.containerDatadeNascimento}>
            <TextInput
              style={[styles.containerInput, {width:75}]}
              value={dia}
              editable={false}
              placeholder="Dia"
            />
            <Text style={styles.barra}>/</Text>
            <TextInput
              style={[styles.containerInput, {width:75}]}
              value={mes}
              editable={false}
              placeholder="Mês"
            />
            <Text style={styles.barra}>/</Text>
            <TextInput
              style={[styles.containerInput, {width:145}]}
              value={ano}
              editable={false}
              placeholder="Ano"
            />
          </View>
        </TouchableOpacity>
  
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}
      </View>
    );
  };

export const CampoGenero = ({ onChangeGender, value, editable }) => {
    const [fonteCarregada] = useFonts({
        NotoSans_600SemiBold,
        Poppins_300Light,
      });
    
      if (!fonteCarregada && !fonteErro) {
        return null;
      }
    const [genero, setGenero] = useState(value || null); 
  
    const generos = [
      { label: 'Feminino', value: 'Feminino' },
      { label: 'Masculino', value: 'Masculino' },
      { label: 'Outro', value: 'Outro' },
      { label: 'Não sei', value: 'Não sei' },
    ];
  
    const handleChange = (selectedGenero) => {
      setGenero(selectedGenero.value);
      if (onChangeGender) {
        onChangeGender(selectedGenero.value);
      }
    };
  
    useEffect(() => {
      setGenero(value); 
    }, [value]);
  
    return (
      <View style={{ gap: 5, marginBottom: 10 }}>
        <Text style={styles.label}>Gênero</Text>
        {editable ? (
          <Dropdown
            style={styles.campos}
            textStyle={styles.textoDrop}
            selectedTextStyle={styles.textoDrop}
            data={generos}
            labelField="label"
            valueField="value"
            placeholder="Selecione seu gênero"
            placeholderStyle={styles.placeholderStyle}
            value={genero}
            onChange={handleChange}
          />
        ) : (
          <TextInput
            style={styles.campos}
            value={value}
            editable={false}
          />
        )}
      </View>
    );
  };

// Configuração de idioma para português
moment.locale('pt-br');
export const CalendarioVertical = () => {
  const [fonteCarregada] = useFonts({
    Pompiere_400Regular,
    Poppins_400Regular,
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
  }

  const swiper = useRef();
  const [valor, setValor] = useState(null); 
  const [semana, setSemana] = useState(0);

  // Calcula as semanas com base no estado da semana
  const semanas = useMemo(() => {
    const inicio = moment().add(semana, 'weeks');
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

  const mesAtual = moment().add(semana, 'weeks').format('MMMM YYYY').toUpperCase();
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
          if (indice === 1) return;
          setTimeout(() => {
            const novoIndice = indice - 1;
            const novaSemana = semana + novoIndice;
            setSemana(novaSemana);
            swiper.current.scrollTo(1, false);
          }, 100);
        }}
      >
        {semanas.map((datas, index) => (
          <View style={styles.linhaItens} key={index}>
            {datas.map((item, indexData) => {
              const isAtivo = valor && valor.toDateString() === item.data.toDateString();
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
};

  const styles = StyleSheet.create({
    label:{ 
        fontFamily: "NotoSans_600SemiBold", 
        fontSize: 14 
    },
    containerDatadeNascimento:{ 
        flexDirection: "row", 
        alignItems: "center" 
    },
    containerInput:{ 
        borderBottomWidth: 1, 
        borderColor: "#300030", 
        textAlign: 'center', 
        fontFamily: "Poppins_300Light", 
        fontSize: 14, 
        color: "#000000" 
    },
    barra:{ 
        fontSize: 20, 
        alignSelf: "flex-end" 
    },

    campos: {
        borderBottomWidth: 1,
        borderColor:'#300030',
        width: 320,
        fontFamily: "Poppins_300Light",
        fontSize: 14,
        color: "#000000"
      },
      textoDrop: {
        fontFamily: 'Poppins_300Light',
        fontSize: 14,
        color: "#000000"
      },
      placeholderStyle: {
        color: "#505050",
        fontFamily: "Poppins_300Light",
        fontSize: 14
      },

      seletor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 150,
        minHeight: 150, 
      },
      mesAtual: {
        fontSize: 18,
        fontFamily: "Poppins_400Regular",
        color: '#300030',
        marginBottom: 20,
      },
      linhaItens: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        paddingHorizontal: 16, 
        width: '100%', 
      },
      item: {
        flex: 1,
        height: 50,
        marginHorizontal: 2, 
        paddingVertical: 6,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#300030',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', 
      },
      itemHoje: {
        backgroundColor: '#FBF4E2', 
      },
      itemAtivo: {
        backgroundColor: '#CDE1DE', 
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
  })
