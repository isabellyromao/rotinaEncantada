import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image, Text } from "react-native";
import styles from "../../styles/geral"
import { router } from "expo-router";
import AppIntroSlider from "react-native-app-intro-slider";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";


const slides =[{
    key: "1",
    titulo: "Organize Sua Rotina De Forma Mágica!",
    subtitulo: "Crie sua rotina com listas personalizadas com interatividades únicas e se divertindo. ",
    imagem: require("../../assets/img-todolist.png")
},
{   key: "2",
    titulo: "Ajudar Na Rotina Da Criançada",
    subtitulo: "Construa uma Rotina Encantada ,com perfis separados, para cada criança se divertir também",
    imagem: require("../../assets/img-dinossauro.png")
},
{   key: "3",
    titulo: "Recompensas Encantadoras",
    subtitulo: "Desbloqueie desenhos encantadores e explore seu lado artístico pintando.",
    imagem: require("../../assets/img-pintar1.png")
},
]

export default function TelaIntro(){
    const [activeIndex, setActiveIndex] = useState(0);

    //O useFonts ajuda a carregar as fontes 
    let [fonteCarregada, fonteErro] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
    NotoSans_600SemiBold
    });

    //verrifica se a fonte foi carregada e se não existe erro
    if (!fonteCarregada && !fonteErro) {
    return null;
      }

    const renderItem = ({item}) => (
        <View style={{flex: 1, backgroundColor: "#fff", alignContent: "center", justifyContent: "center", alignItems: "center", paddingTop: 50}}>
            <Image source={item.imagem}/>
            <View style={{alignContent: "center", justifyContent: "center", alignItems: "center", gap:18}}>
                <Text style={[{color: "#300030", fontFamily: "Poppins_600SemiBold", fontSize: 24, textAlign: "center", width: 250}]}>
                    {item.titulo}
                </Text>
                <Text style={{color: "#300030", fontFamily: "Poppins_400Regular", fontSize: 16, textAlign: "center", width: 324}}>
                    {item.subtitulo}
                </Text>
            </View>
        </View>
    )

    // Função para verificar se o slide atual é o último
  const isLastSlide = () => activeIndex === slides.length - 1;

    return(
        <View style={{flex:1, backgroundColor: "#fff", paddingBottom:50, alignContent: "center"}}>
            <StatusBar style="auto"/>
            <AppIntroSlider
                renderItem={renderItem}
                data={slides}
                activeIndex={activeIndex}
                onSlideChange={(index) => setActiveIndex(index)}
                activeDotStyle={{
                    backgroundColor: "#388726",
                    width: 80,
                    height: 8,
                }}
                dotStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#388726",
                    borderWidth: 1,
                    width: 15,
                    height: 8,
                }}
                renderPrevButton={() => !isLastSlide() && (
                    <View style={[styles.renderBotaoSemBorda, styles.containerBotao]}>
                        <Text style={[styles.renderTexto, {fontFamily: "NotoSans_600SemiBold",}]}>VOLTAR</Text>
                    </View>
                )}
                renderNextButton={() => !isLastSlide() && (
                    <View style={[styles.renderBotaoComBorda, styles.containerBotao,{width:162}]}>
                        <Text style={[styles.renderTexto, {fontFamily: "NotoSans_600SemiBold",}]}>PRÓXIMO</Text>
                    </View>
                )}
                renderDoneButton={() => (
                    <View style={[styles.renderBotaoComBorda, styles.containerBotao, {width: 322}]}>
                        <Text style={[styles.renderTexto, {fontFamily: "NotoSans_600SemiBold",}]}>COMEÇAR JORNADA</Text>
                    </View>
                )}
                
                onDone={() => {router.push('/cadastro-realizado')}}
                showNextButton={!isLastSlide()}
                showPrevButton={!isLastSlide()}
                onSlideChange={(index) => setActiveIndex(index)} // Atualizar índice do slide ativo
                
            />
        </View>
    )
}
