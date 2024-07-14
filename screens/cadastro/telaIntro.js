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
        <View style={{flex: 1, backgroundColor: "#fff", alignContent: "center", justifyContent: "center", alignItems: "center" }}>
            <Image source={item.imagem}/>
            <View style={{flex:1, alignContent: "center", justifyContent: "center", alignItems: "center", gap:18, }}>
                <Text style={[{color: "#300030", fontFamily: "Poppins_600SemiBold", fontSize: 24, textAlign: "center", width: 250}]}>
                    {item.titulo}
                </Text>
                <Text style={{color: "#300030", fontFamily: "Poppins_400Regular", fontSize: 16, textAlign: "center", width: 324}}>
                    {item.subtitulo}
                </Text>
            </View>
        </View>
    )
    
    return(
        <View style={{flex:1, backgroundColor: "#fff", paddingBottom:50}}>
            <StatusBar style="auto"/>
            <AppIntroSlider
                renderItem={renderItem}
                data={slides}
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
                renderPrevButton={() =>(
                    <View style={[styles.renderBotaoSemBorda, styles.containerBotao]}>
                        <Text style={[styles.renderTexto, {fontFamily: "NotoSans_600SemiBold",}]}>VOLTAR</Text>
                    </View>
                )}
                renderNextButton={() => (
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
                showNextButton={true}
                showPrevButton={true}
                
            />
        </View>
    )
}
