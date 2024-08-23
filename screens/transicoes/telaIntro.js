import React from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { View, Image, Text, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";
import { SetaCancelar } from "../../componentes/geral";

const slides = [
  {
    key: "1",
    titulo: "Organize Sua Rotina De Forma Mágica!",
    subtitulo: "Crie sua rotina com listas personalizadas com interatividades únicas e se divertindo. ",
    imagem: require("../../assets/img-todolist.png")
  },
  {
    key: "2",
    titulo: "Ajudar Na Rotina Da Criançada",
    subtitulo: "Construa uma Rotina Encantada, com perfis separados, para cada criança se divertir também",
    imagem: require("../../assets/img-dinossauro.png")
  },
  {
    key: "3",
    titulo: "Recompensas Encantadoras",
    subtitulo: "Desbloqueie desenhos encantadores e explore seu lado artístico pintando.",
    imagem: require("../../assets/img-pintar1.png")
  },
];

export default function TelaIntro() {
  let [fonteCarregada, fonteErro] = useFonts({
    Poppins_600SemiBold, 
    Poppins_400Regular,
    NotoSans_600SemiBold
  });

  if (!fonteCarregada && !fonteErro) {
    return null;
  }

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <SetaCancelar/>
      <Image source={item.imagem} />
      <View style={styles.containerTexto}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.subtitulo}>{item.subtitulo}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.containerSlider}>
      <StatusBar style="auto" />
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        activeDotStyle={styles.activeDot}
        dotStyle={styles.dot}
        renderNextButton={() => (
          <View style={styles.renderBotao}>
            <Text style={styles.renderTexto}>PRÓXIMO</Text>
          </View>
        )}
        renderDoneButton={() => (
          <View style={styles.renderBotao}>
            <Text style={styles.renderTexto}>COMEÇAR JORNADA</Text>
          </View>
        )}
        onDone={() => router.push('/cadastro')}
        showNextButton={true}
        bottomButton
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#ffffff", 
    alignContent: "center", 
    justifyContent: "center", 
    alignItems: "center"
  },
  containerTexto: {
    alignContent: "center", 
    justifyContent: "center", 
    alignItems: "center", 
    gap: 18
  },
  titulo: {
    color: "#300030", 
    fontFamily: "Poppins_600SemiBold", 
    fontSize: 24, 
    textAlign: "center", 
    width: 250
  },
  subtitulo: {
    color: "#300030", 
    fontFamily: "Poppins_400Regular", 
    fontSize: 16, 
    textAlign: "center", 
    width: 324
  },
  containerSlider: {
    flex: 1, 
    backgroundColor: "#ffffff", 
    paddingBottom: "30%"
  },
  renderBotao: {
    height: 49,
    borderColor: "#300030", 
    borderWidth: 1, 
    borderRadius: 8,
    justifyContent: "center",
    width: 322,
    alignSelf: "center"
  },
  renderTexto: {
    color: "#300030", 
    fontSize: 18,
    textAlign: "center",
    fontFamily: "NotoSans_600SemiBold"
  },
  activeDot: {
    backgroundColor: "#388726",
    width: 80,
    height: 8,
    marginBottom: 100
  },
  dot: {
    backgroundColor: "#ffffff",
    borderColor: "#388726",
    borderWidth: 1,
    width: 15,
    height: 8,
    marginBottom: 100
  }
});
