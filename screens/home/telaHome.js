import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Pressable, Text, View, Image, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc } from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pompiere_400Regular } from "@expo-google-fonts/pompiere";
import { Poppins_300Light, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { CalendarioVertical } from "../../componentes/tabs";

export default function TelaHome() {
    const [isPressed, setIsPressed] = useState(false);
    const router = useRouter();
    const [tarefas, setTarefas] = useState([]);
    const user = auth.currentUser;
    const [userData, setUserData] = useState(null);
    const [primeiroNome, setPrimeiroNome] = useState('');
    const [diaAtual, setDiaAtual] = useState('');
    const [dataSelecionada, setDataSelecionada] = useState(null);
    const [tarefasFiltradas, setTarefasFiltradas] = useState([]);


    const capitalizeEachWord = (string) => {
        return string
            .split(' ') // Divide a string em palavras
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza a primeira letra de cada palavra
            .join(' '); // Junta as palavras novamente em uma string
    };
    

    const fetchUserDado = async () => {
        if (user) {
            try {
                const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData(data);
                    
                    // Extrair o primeiro nome
                    if (data.nome) {
                        const nomeArray = data.nome.trim().split(' ');
                        setPrimeiroNome(nomeArray[0]);
                    } else {
                        setPrimeiroNome('Usuário');
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        }
    };

    useEffect(() => {
        fetchUserDado();
    }, []);

    const formatarDataAtual = () => {
        const dataAtual = new Date();
        const opcoes = { weekday: 'long' }; // Exibe o nome completo do dia da semana
        return dataAtual.toLocaleDateString('pt-BR', opcoes);
    };
    
    useEffect(() => {
        const dia = formatarDataAtual();
        setDiaAtual(dia);
    }, []);

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const tarefasQuery = query(collection(db, "tarefas"), where("userId", "==", user.uid));
                const tarefasSnapshot = await getDocs(tarefasQuery);
                const tarefasList = tarefasSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTarefas(tarefasList);
                
                if (dataSelecionada) {
                    const tarefasParaDataSelecionada = tarefasList.filter(tarefa => {
                        const dataTarefa = new Date(tarefa.dataSelecionada);
                        const dataSelecionadaObj = new Date(dataSelecionada);
                        return dataTarefa.toDateString() === dataSelecionadaObj.toDateString();
                    });
                    setTarefasFiltradas(tarefasParaDataSelecionada);
                } else {
                    setTarefasFiltradas(tarefasList);
                }
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            }
        };
    
        fetchTarefas();
    }, [user, dataSelecionada]);
    

    const handleConcluirTarefa = async (tarefaId, concluida) => {
        try {
            const tarefaRef = doc(db, "tarefas", tarefaId);
            await updateDoc(tarefaRef, {
                concluida: !concluida,
            });
            setTarefas(tarefas.map(tarefa =>
                tarefa.id === tarefaId ? { ...tarefa, concluida: !concluida } : tarefa
            ));
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
        }
    };

    const [fonteCarregada, fonteErro] = useFonts({
        Pompiere_400Regular,
        Poppins_300Light, Poppins_500Medium,
    });

    if (!fonteCarregada && !fonteErro) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ImageBackground
                source={require('../../assets/flor-de-lotus-fundo.png')}
                style={styles.container}
                resizeMode="contain"
            >
                <View style={styles.homeHeader}>
                    <StatusBar style="auto" />
                    <View style={styles.header}>
                        <Text style={styles.textoPrimeiroNome}>Olá, {capitalizeEachWord(primeiroNome) || 'Usuário'}</Text>
                        <Pressable
                            style={{ backgroundColor: isPressed ? '#CDE1DE' : 'transparent', borderRadius: 100 }}
                            onPressIn={() => setIsPressed(true)}
                            onPressOut={() => setIsPressed(false)}
                            onPress={() => router.push('/perfil')}
                        >
                            <Image source={require('../../assets/logo-sapo.png')} 
                            style={styles.imagemPerfil} 
                            resizeMode="contain" />
                        </Pressable>
                    </View>
                    <Text style={styles.subtituloHeader}>Hoje é {capitalizeEachWord(diaAtual)}</Text>
                </View>
                <CalendarioVertical onDateSelected={setDataSelecionada} />

                <ScrollView
                    contentContainerStyle={{ width: '100%', paddingBottom: 60}}
                    style={{ width: '100%', flex: 1 }}
                    showsVerticalScrollIndicator={false}    
                    showsHorizontalScrollIndicator={false}  
                >
                    {tarefasFiltradas.length === 0 ? (
                    <Text style={styles.semTarefas}>Você não tem tarefas para hoje.</Text>
                    ) : (
                    tarefasFiltradas.map((tarefa) => (
                        <View key={tarefa.id} 
                            style={[styles.tarefaContainer, { backgroundColor: tarefa.corCategoria ? tarefa.corCategoria : "#FBF4E2" }]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.tarefaTitulo}>{tarefa.titulo}</Text>
                                
                            </View>
                            <TouchableOpacity onPress={() => handleConcluirTarefa(tarefa.id, tarefa.concluida)} style={styles.checkIconContainer}>
                                <MaterialCommunityIcons
                                    name={tarefa.concluida ?  "checkbox-marked-circle" : "checkbox-marked-circle-outline" }
                                    size={35}
                                    color={tarefa.concluida ? "#000000" : "#000000"}
                                />
                            </TouchableOpacity>
                        </View>
                    ))
                    )}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        padding: 16,
    },
    homeHeader:{
        width:"100%",
        paddingHorizontal:20,
        gap:10,
        paddingTop:50,
        paddingBottom:20,
    },
    header:{
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between" 
    },
    textoPrimeiroNome:{
        fontFamily: "Pompiere_400Regular", 
        fontSize: 40, 
        borderBottomColor: "#415E3E", 
        borderBottomWidth: 2, 
        paddingBottom: 5, 
        maxWidth: "90%" 
    },
    imagemPerfil:{
        width: 60, 
        height: 60 
    },
    subtituloHeader:{
        fontFamily: "Poppins_300Light", 
        fontSize: 14 
    },
    tarefaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    tarefaTitulo: {
        fontSize: 18,
        color: "#000000",
    },
    checkIconContainer: {
    paddingLeft: 10,
    },
    semTarefas:{
        alignSelf:"center",
        paddingTop:180,
        fontFamily:"Pompiere_400Regular",
        fontSize:30

    }
})
