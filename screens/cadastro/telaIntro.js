import { StatusBar } from "expo-status-bar";
import { View, Image, Text } from "react-native";
import styles from "../../styles/geral"
import { router } from "expo-router";
import AppIntroSlider from "react-native-app-intro-slider";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";

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
    Poppins_400Regular
    });

    //verrifica se a fonte foi carregada e se não existe erro
    if (!fonteCarregada && !fonteErro) {
    return null;
      }

    const renderItem = ({item}) => (
        <View style={[styles.container, {paddingHorizontal: 50, justifyContent: "space-between"}]}>
            <Image source={item.imagem}/>
            <View style={{alignContent: "center", justifyContent: "center"}}>
                <Text style={[{color: "#300030", fontFamily: "Poppins_600SemiBold", fontSize: 24, textAlign: "center"}]}>
                    {item.titulo}
                </Text>
                <Text style={{color: "#300030", fontFamily: "Poppins_400Regular", fontSize: 16, textAlign: "center"}}>
                    {item.subtitulo}
                </Text>
            </View>
            <StatusBar style="auto"/>
        </View>
    )
    
    return(
       <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, alignContent: "center"}}>
            <AppIntroSlider
                renderItem={renderItem}
                data={slides}
                onDone={() => {router.push('/cadastro-realizado')}}
                showNextButton={true}
                showPrevButton={true}
                activeDotStyle={{
                    backgroundColor: "#388726",
                    width: 80,
                    height: 8
                }}
                dotStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#388726",
                    borderWidth: 1,
                    width: 15,
                    height: 8
                }}
                renderPrevButton={() =>(
                    <View style={styles.renderBotaoSemBorda}>
                        <Text style={styles.renderTexto}>VOLTAR</Text>
                    </View>
                )}
                renderNextButton={() => (
                    <View style={[styles.renderBotaoComBorda, {width:162}]}>
                        <Text style={styles.renderTexto}>PRÓXIMO</Text>
                    </View>
                )}
                renderDoneButton={() => (
                    <View style={[styles.renderBotaoComBorda, {width: 322}]}>
                        <Text style={styles.renderTexto}>COMEÇAR JORNADA</Text>
                    </View>
                )}
            />
        </View> 
    )
}
