import { Pressable, Text, View, Image, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Pompiere_400Regular } from "@expo-google-fonts/pompiere";
import { Poppins_300Light, Poppins_500Medium } from "@expo-google-fonts/poppins";
import styles from "../../styles/geral";
import { StatusBar } from "expo-status-bar";
import { CalendarioVertical } from "../../componentes/geral";
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TelaHome() {
    const [isPressed, setIsPressed] = useState(false);
    const router = useRouter();
    const [tarefas, setTarefas] = useState([]);
    const user = auth.currentUser;

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
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            }
        };

        fetchTarefas();
    }, [user]);

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
                <CalendarioVertical />

                <ScrollView
                    contentContainerStyle={{ width: '100%', alignItems: 'center', paddingBottom: 60 }}
                    style={{ width: '100%', flex: 1 }}
                    showsVerticalScrollIndicator={false}    
                    showsHorizontalScrollIndicator={false}  
                >
                    {tarefas.map((tarefa) => (
                        <View key={tarefa.id} style={[styles.tarefaContainer, { backgroundColor: tarefa.corCategoria ? tarefa.corCategoria : "#FBF4E2" }]}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.tarefaTitulo, {fontFamily: "Poppins_500Medium"}]}>{tarefa.titulo}</Text>
                                
                            </View>
                            <TouchableOpacity onPress={() => handleConcluirTarefa(tarefa.id, tarefa.concluida)} style={styles.checkIconContainer}>
                                <MaterialCommunityIcons
                                    name={tarefa.concluida ?  "checkbox-marked-circle" : "checkbox-marked-circle-outline" }
                                    size={35}
                                    color={tarefa.concluida ? "#000000" : "#000000"}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}
