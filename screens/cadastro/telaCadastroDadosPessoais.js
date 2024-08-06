import { View, TextInput, ScrollView, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from '../../styles/geral'

export default function TelaCadastroDadosPessoais() {
    return(
        <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingTop: 50 }} 
      >
        <View style={styles.container}>
            <Text>Cadastre-Se</Text>
            <Image source={require('../../assets/icone-sapo.png')}/>
            <TextInput style={{borderBottomWidth: 1, width:320}} placeholder="Insira o nome completo"/>

            <StatusBar style="auto" />
        </View>
        </ScrollView>
    )
}