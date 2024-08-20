import { Pressable, Text, View, Image, ScrollView, ImageBackground, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pompiere_400Regular } from "@expo-google-fonts/pompiere";
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import styles from "../../styles/geral";
import { StatusBar } from "expo-status-bar";

export default function TelaHome() {
    const [isPressed, setIsPressed] = useState(false);
    const router = useRouter();

    let [fonteCarregada, fonteErro] = useFonts({
        Pompiere_400Regular,
        Poppins_300Light
    });

    if (!fonteCarregada && !fonteErro) {
        return null;
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ImageBackground 
                source={require('../../assets/flor-de-lotus-fundo.png')} 
                style={styles.containerHome} 
                resizeMode="contain"
            >
                <View style={styles.homeHeader}>
                    <StatusBar style="auto" />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "Pompiere_400Regular", fontSize: 40, borderBottomColor: "#415E3E", borderBottomWidth: 2, paddingBottom: 5, maxWidth: "90%" }}>
                            Olá, [Primeiro Nome]
                        </Text>
                        <Pressable 
                            style={{ backgroundColor: isPressed ? '#CDE1DE' : 'transparent', borderRadius: 100 }}
                            onPressIn={() => setIsPressed(true)}
                            onPressOut={() => setIsPressed(false)}
                            onPress={() => router.push('/perfil')}
                        >
                            <Image source={require('../../assets/logo-sapo.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
                        </Pressable>
                    </View>
                    <Text style={{ fontFamily: "Poppins_300Light", fontSize: 14 }}>Hoje é [Dia Tal]</Text>
                </View>

                <ScrollView 
                    contentContainerStyle={{  width: '100%', alignItems: 'center', paddingBottom:60}}
                    style={{ width: '100%', flex: 1 }}
                    showsVerticalScrollIndicator={false}    // Oculta a barra de rolagem vertical
                    showsHorizontalScrollIndicator={false}  // Oculta a barra de rolagem horizontal
                >

                    {/* Adicione mais conteúdo aqui */}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}