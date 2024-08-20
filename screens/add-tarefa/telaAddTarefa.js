import { View, Text, Modal, TextInput, Alert } from "react-native"
import { useFonts } from "expo-font";
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Pompiere_400Regular } from "@expo-google-fonts/pompiere";
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import { NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";
import styles from "../../styles/geral"
import {Calendar} from 'react-native-calendars';
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

export default function TelaAddTarefa(){
    const [selected, setSelected] = useState('');
    const [modalVisivel, setModalVisivel] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);
    const [caracteresRestantes, setCaracteresRestantes] = useState(200); 
    const user = auth.currentUser;

    const handleDescricaoChange = (text) => {
      setDescricao(text);
      setCaracteresRestantes(150 - text.length);
  };
    
    const handleCriarTarefa = async () => {

      if (!titulo || !descricao) {
          Alert.alert("Erro", "Por favor, preencha todos os campos.");  
          return;
        }

        try{
          await addDoc(collection(db, "tarefas"),{
            titulo: titulo,
            descricao: descricao,
            date: selected,
            dataDeCriacao : new Date(),
            concluida: false,
            idUsuario: user.uid
          });
          Alert.alert("Sucesso", "Tarefa criada com sucesso!");
          setTitle('');
          setDescription('');
          setModalVisible(false);
        } catch (error) {
          Alert.alert("Erro", "Ocorreu um erro ao salvar a tarefa.");
        }
        }


    let [fonteCarregada, fonteErro] = useFonts({
      Poppins_400Regular, Poppins_300Light,
      Pompiere_400Regular,
      NotoSans_600SemiBold
    });
    
    if (!fonteCarregada && !fonteErro) {
      return null;
    };

    return(
        <View style={[styles.container, {paddingBottom:50}]}>
          <StatusBar style="auto" />
          <View style={{paddingBottom:40}}>
            <Text style={{fontFamily: "Poppins_400Regular", fontSize: 20, width:250, textAlign: "center", borderBottomColor: "#415E3E", borderBottomWidth: 2, paddingBottom:10, color:"#300030"}}>SELECIONE UMA DATA {'\n'} PARA CRIAR UMA TAREFA</Text>
          </View>
          <Calendar
              onDayPress={day => {
              setSelected(day.dateString),
              setModalVisivel(true);
            }}
            markedDates={{
              [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
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
            style={{height: 350, width:350, borderRadius:20, justifyContent:"center"}}
          /> 

    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(!modalVisivel);
        }}
      >
        <View style={[styles.containerHome, {justifyContent: "center"}]}>
        <View style={[styles.fundoDados, {backgroundColor:"#CDE1DE", height:"95%"}]}>
            <Text style={{ fontFamily: "Pompiere_400Regular", fontSize: 35, borderBottomColor: "#415E3E", borderBottomWidth: 2, paddingBottom: 5 }}>
              Criar Tarefa
            </Text>
            <View>
              <Text style={{fontFamily:"NotoSans_600SemiBold", fontSize:16}}>Título</Text>
              <TextInput
                style={{borderBottomWidth: 1, width:320, fontFamily:"Poppins_300Light", fontSize: 14}}
                value={titulo}
                onChangeText={setTitulo}
                multiline={true}
                maxLength={50}
              />
            </View>
            <View>
            <Text style={{fontFamily:"NotoSans_600SemiBold", fontSize:16}}>Descrição</Text>
              <TextInput
                style={{borderBottomWidth: 1, width:320, fontFamily:"Poppins_300Light", fontSize: 14, maxHeight: 100}}
                value={descricao}
                onChangeText={handleDescricaoChange}
                multiline={true}
                maxLength={150}
            />
            <Text style={{ fontFamily: "Poppins_300Light", fontSize: 12, color: "gray" }}>
                {caracteresRestantes} caracteres restantes
            </Text>
            </View>
            <View style={{paddingVertical:20, gap:20, alignItems: "center" }}>
              <BotaoPrincipal titulo="Salvar" onPress={handleCriarTarefa} loading={loading}  backgroundColor="#415E3E" color="#FFFFFF" width={188}/>
              <BotaoSecundario titulo="Cancelar" onPress={() => setModalVisivel(false)} />
            </View>
          </View>
          </View>
      </Modal>
      </View>
      
    )
}