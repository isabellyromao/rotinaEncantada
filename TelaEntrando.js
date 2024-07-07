import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function TelaEntrando(){
    return(
        <View style={styles.container}>
            <Image source={require('./assets/icone-estrela.png')}/>
            <Text style={[styles.texto, {color: "#300030"}]}>Entrando...</Text>
            <StatusBar style="auto"/>
        </View>
    )
} 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})