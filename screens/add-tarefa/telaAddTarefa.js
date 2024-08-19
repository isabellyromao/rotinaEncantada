import { View, Image, Text } from "react-native"
import { useFonts } from "expo-font";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import styles from "../../styles/geral"
import {Calendar} from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { useState } from "react";

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
    let [fonteCarregada, fonteErro] = useFonts({
      Poppins_400Regular
    });
    
    if (!fonteCarregada && !fonteErro) {
      return null;
    };

    return(
        <View style={[styles.container, {paddingBottom:150}]}>
          
              <Image source={require("../../assets/icone-estrela.png")}/>
              <View style={{paddingBottom:40}}>
              <Text style={{fontFamily: "Poppins_400Regular", fontSize: 20, width:320, textAlign: "center"}}>SELECIONE UMA DATA {'\n'} PARA CRIAR UMA TAREFA</Text>
            </View>
            <Calendar
                onDayPress={day => {
                setSelected(day.dateString)
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
                textMonthFontSize: 30,
            }}
              style={{height: 350, width:350, borderRadius:20, justifyContent:"center"}}
            /> 

        </View>
    )
}