import { View, Text, Modal, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from "react-native"
import { useFonts } from "expo-font";
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { Poppins_400Regular, Poppins_300Light } from "@expo-google-fonts/poppins";
import { Pompiere_400Regular } from "@expo-google-fonts/pompiere";
import { NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";
import styles from "../../styles/geral"
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { BotaoPrincipal, BotaoSecundario } from "../../componentes/geral";

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};

// Definindo o local padrão
LocaleConfig.defaultLocale = 'pt-br';

const categoriasCores = {
  CONSULTA: "#9BE199",
  CASA: "#EBB4C9",
  TRABALHO: "#5AB8F2",
  ESCOLA: "#8BCDFC",
  "EVENTO ESPECIAL": "#FFDE59",
  CONTA: "#FFC059",
  LAZER: "#89C96D",
  COMPRAS: "#ED9DCD"
}

export default function TelaAddTarefa() {
  const [selected, setSelected] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [caracteresRestantes, setCaracteresRestantes] = useState(150);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const user = auth.currentUser;

  const handleDescricaoChange = (text) => {
    setDescricao(text);
    setCaracteresRestantes(150 - text.length);
  };

  const handleCriarTarefa = async () => {

    if (!titulo || !descricao || !categoriaSelecionada) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const corCategoria = categoriasCores[categoriaSelecionada];

    try {
      await addDoc(collection(db, "tarefas"), {
        titulo: titulo,
        descricao: descricao,
        dataSelecionada: selected,
        dataDeCriacao: new Date(),
        concluida: false,
        userId: user.uid,
        categoria: categoriaSelecionada,
        corCategoria: corCategoria,
      });
      Alert.alert("Sucesso", "Tarefa criada com sucesso!");
      setTitulo('');
      setDescricao('');
      setCategoriaSelecionada('');
      setModalVisivel(false);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao salvar a tarefa.");
      console.error(error.code);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleCancelar = () => {
    setCategoriaSelecionada('');
    setModalVisivel(false);
  };

  let [fonteCarregada, fonteErro] = useFonts({
    Poppins_400Regular, Poppins_300Light,
    Pompiere_400Regular,
    NotoSans_600SemiBold
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
  };

  return (
    <View style={[styles.container, { paddingBottom: 50 }]}>
      <StatusBar style="auto" />
      <View style={{ paddingBottom: 40 }}>
        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 20, width: 250, textAlign: "center", borderBottomColor: "#415E3E", borderBottomWidth: 2, paddingBottom: 10, color: "#300030" }}>SELECIONE UMA DATA {'\n'} PARA CRIAR UMA TAREFA</Text>
      </View>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString),
            setModalVisivel(true);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}
        theme={{
          calendarBackground: '#FBF4E2',
          textSectionTitleColor: '#415E3E',
          selectedDayBackgroundColor: '#300030',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#FFC059',
          dayTextColor: '#300030',
          textDisabledColor: '#b6c1cd',
          monthTextColor: "#415E3E",
          arrowColor: "#415E3E",
          textMonthFontSize: 25,
        }}
        style={{ height: 350, width: 350, borderRadius: 20, justifyContent: "center" }}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(!modalVisivel);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={[
                {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                },
              ]}
            >
              <View
                style={{
                  borderColor: "#300030",
                  borderWidth: 2,
                  width: "95%",
                  borderRadius: 20,
                  backgroundColor: "#ffffff", 
                  alignItems: "center",
                  padding: 20,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Pompiere_400Regular",
                    fontSize: 35,
                    borderBottomColor: "#415E3E",
                    borderBottomWidth: 2,
                    paddingBottom: 5,
                  }}
                >
                  Criar Tarefa
                </Text>

                <View style={{ width: '100%', alignItems: 'center', gap: 20 }}>
                  <View style={{ gap: 5 }}>
                    <Text style={{ fontFamily: "NotoSans_600SemiBold", fontSize: 16 }}>
                      Título
                    </Text>
                    <TextInput
                      label="Título"
                      style={{
                        borderBottomWidth: 1,
                        width: 320,
                        fontFamily: "Poppins_300Light",
                        fontSize: 14,
                      }}
                      value={titulo}
                      onChangeText={setTitulo}
                      multiline={true}
                      maxLength={50}
                    />
                  </View>

                  <View style={{ gap: 5, paddingBottom: 10 }}>
                    <Text style={{ fontFamily: "NotoSans_600SemiBold", fontSize: 16 }}>
                      Descrição
                    </Text>
                    <TextInput
                      label="Descrição"
                      style={{
                        borderBottomWidth: 1,
                        width: 320,
                        fontFamily: "Poppins_300Light",
                        fontSize: 14,
                        maxHeight: 100,
                      }}
                      value={descricao}
                      onChangeText={handleDescricaoChange}
                      multiline={true}
                      maxLength={150}
                    />
                    <Text style={{ fontFamily: "Poppins_300Light", fontSize: 12, color: "gray" }}>
                      {caracteresRestantes} caracteres restantes
                    </Text>
                  </View>

                  <View style={{ gap: 10, width: 320 }}>
                    <Text style={{ fontFamily: "NotoSans_600SemiBold", fontSize: 16 }}>
                      Categorias
                    </Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                      {Object.keys(categoriasCores).map((categoria) => (
                        <TouchableOpacity
                          key={categoria}
                          style={{
                            backgroundColor: categoriasCores[categoria],
                            opacity: categoriaSelecionada === categoria ? 1 : 0.6,
                            padding: 10,
                            borderRadius: 5,
                            marginVertical: 2,
                          }}
                          onPress={() => setCategoriaSelecionada(categoria)}
                        >
                          <Text
                            style={{
                              color: "#300030",
                              textAlign: "center",
                              fontFamily: "Poppins_400Regular",
                              fontSize: 12,
                            }}
                          >
                            {categoria}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    paddingVertical: 20,
                    gap: 20,
                    alignItems: "center",
                    marginTop: 20, // Ajuste para evitar que os botões subam com o teclado
                  }}
                >
                  <BotaoPrincipal
                    titulo="Salvar"
                    onPress={handleCriarTarefa}
                    loading={loading}
                    backgroundColor="#415E3E"
                    color="#FFFFFF"
                    width={188}
                  />
                  <BotaoSecundario titulo="Cancelar" onPress={handleCancelar} />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>


    </View>

  )
}