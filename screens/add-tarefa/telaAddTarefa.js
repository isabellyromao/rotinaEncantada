import { View } from "react-native"
import styles from "../../styles/geral"
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
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
    return(
        <View style={styles.container}>
            <Calendar
                onDayPress={day => {
                setSelected(day.dateString)
              }}
              markedDates={{
                [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
              }}
              theme={{
                calendarBackground: '#FBF4E2',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#300030',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#415E3E',
                dayTextColor: '#300030',
                textDisabledColor: '#b6c1cd'
            }}
              style={{height: 350, width:350, borderRadius:20, padding:20}}
            /> 
        </View>
    )
}