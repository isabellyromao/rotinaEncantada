import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, View, Image, Dimensions, TouchableWithoutFeedback, SafeAreaView, TextInput } from 'react-native';
import { NotoSans_600SemiBold } from '@expo-google-fonts/noto-sans';
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/pt-br'; // Certifique-se de importar o locale para português
import Swiper from 'react-native-swiper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

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
      <Text style={[styles.botaoTextoPrincipal, { color: props.color || "#300030", fontFamily: "NotoSans_600SemiBold", fontSize: 18 }]}>
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
      <Text style={[styles.botaoTextoSecundario, { color: "#300030", fontFamily: "NotoSans_600SemiBold", fontSize: 18 }]}>
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
      <Text style={[{ color: "#300030", fontFamily: "Pompiere_400Regular", fontSize: 40, textAlign: "center", width: 243 }]}>
        {props.titulo}
      </Text>
    </View>
  )
};

export const Lembrete = () => {
  return (
    <View style={{ flexDirection: "row", gap: 15 }}>
      <Image source={require('../assets/detalhe-estrela.png')} />
      <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 14 }}>LEMBRETE: A senha deve ter 6 números</Text>
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

export const CampoDataDeNascimento = ({ onChangeDate, value, editable }) => {
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
      <Text style={{ fontFamily: "NotoSans_600SemiBold", fontSize: 14 }}>Data de Nascimento</Text>
      <TouchableOpacity onPress={toggleDatePicker}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{ borderBottomWidth: 1, borderColor: "#300030", width: 75, textAlign: 'center', fontFamily: "Poppins_300Light", fontSize: 14, color: "#000000" }}
            value={dia}
            editable={false}
            placeholder="Dia"
          />
          <Text style={{ fontSize: 20, alignSelf: "flex-end" }}>/</Text>
          <TextInput
            style={{ borderBottomWidth: 1, borderColor: "#300030", width: 75, textAlign: 'center', fontFamily: "Poppins_300Light", fontSize: 14, color: "#000000" }}
            value={mes}
            editable={false}
            placeholder="Mês"
          />
          <Text style={{ fontSize: 20, alignSelf: "flex-end" }}>/</Text>
          <TextInput
            style={{ borderBottomWidth: 1, borderColor: "#300030", width: 145, textAlign: 'center', fontFamily: "Poppins_300Light", fontSize: 14, color: "#000000" }}
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
  const [genero, setGenero] = useState(value || null); // Sincroniza com o valor inicial

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
    setGenero(value); // Atualiza o estado quando o valor vindo das props muda
  }, [value]);

  return (
    <View style={{ gap: 5, marginBottom: 10 }}>
      <Text style={{ fontFamily: "NotoSans_600SemiBold", fontSize: 14 }}>Gênero</Text>
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

const { width } = Dimensions.get('window');

export const CalendarioVertical = () => {
  const [fonteCarregada] = useFonts({
    Pompiere_400Regular,
    Poppins_400Regular,
  });

  const swiper = useRef();
  const [valor, setValor] = useState(null); // Valor inicial null
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
                  onPress={() => setValor(item.data)} // Atualiza o valor ao clicar
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

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },

  textoExplicativo: {
    alignItems: "center",
    gap: 18,
  },

  subtitulo: {
    textAlign: "center"
  },
  campoLogin: {
    height: 49,
    borderColor: "#300030",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    width: 322,
    alignSelf: "center",
    padding: 14
  },
  seletor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 150, // Ajuste a altura máxima do calendário
    minHeight: 150, // Ajuste a altura mínima do calendário
  },

  linhaItens: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Garante que todos os itens fiquem distribuídos de forma uniforme
    paddingHorizontal: 16, // Adiciona espaçamento horizontal adequado
    width: '100%', // Garante que a linha ocupe toda a largura disponível
  },

  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 2, // Reduz a margem para evitar que o último item seja cortado
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#300030',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
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
    marginBottom: 20,
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
})