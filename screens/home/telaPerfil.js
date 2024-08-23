import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { View, Alert, Text, ScrollView, Image, TextInput, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { getAuth, signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential  } from "firebase/auth"
import { auth, db } from '../../firebaseConfig'
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { BotaoPrincipal, SetaVoltar, CampoDataDeNascimento, CampoGenero } from "../../componentes/geral";
import { Pompiere_400Regular } from "@expo-google-fonts/pompiere";
import { NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";
import { BotaoSecundario } from "../../componentes/geral"

export default function TelaPerfil() {
    const [editar, setEditar] = useState(false);
    const [userData, setUserData] = useState({nome: '', dataNascimento: '', genero: ''});

    const fetchUserDado = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setUserData(data);
            }
        }
    };

    useEffect(() => {
        fetchUserDado();
    }, []);

    const calcularIdade = (dataNascimento) => {
        const dataAtual = new Date();
        const [ano, mes, dia] = dataNascimento.split('-').map(Number);
        const idade = dataAtual.getFullYear() - ano;
        if (dataAtual.getMonth() + 1 < mes || (dataAtual.getMonth() + 1 === mes && dataAtual.getDate() < dia)) {
            return idade - 1;
        }
        return idade;
    };


    const handleAtualizar = async () => {
        if (editar) {
            // Se estiver em modo de edição e o usuário clicar em SALVAR
            Alert.alert(
                "Confirmar Alterações", "Você tem certeza que deseja salvar as alterações?",
                [
                    {
                        text: "Cancelar",
                        onPress: () => console.log("Alterações canceladas"),
                        style: "cancel"
                    },
                    {
                        text: "Salvar",
                        onPress: async () => {
                            try {
                                // Verificação de campos
                                if (!userData.nome.trim()) {
                                    Alert.alert("Erro", "Por favor, insira seu nome completo.");
                                    return;
                                }
                                const nomeParts = userData.nome.trim().split(' ');
                                if (nomeParts.length < 2) {
                                    Alert.alert("Erro", "Por favor, insira seu nome completo (nome e sobrenome).");
                                    return;
                                }
                                if (!userData.dataNascimento) {
                                    Alert.alert("Erro", "Por favor, insira sua data de nascimento.");
                                    return;
                                }
                                if (!userData.genero) {
                                    Alert.alert("Erro", "Por favor, selecione seu gênero.");
                                    return;
                                }
    
                                const idade = calcularIdade(userData.dataNascimento);
                                if (idade < 15) {
                                    Alert.alert("Erro", "Você precisa ter pelo menos 15 anos para se cadastrar.");
                                    return;
                                }
    
                                // Atualizar dados no Firestore
                                const user = auth.currentUser;
                                if (user) {
                                    await setDoc(doc(db, 'usuarios', user.uid), userData, { merge: true });
                                    
                                    Alert.alert("Sucesso", "Dados atualizados com sucesso!");
                                    setEditar(false);  // Desativa o modo de edição após salvar
                                }
    
                            } catch (error) {
                                console.error(error.code);
                                console.error(error.message);
                                Alert.alert("Erro", "Ocorreu um erro ao atualizar os dados.");
                            }
                        }
                    }
                ]
            );
        } else {
            // Se estiver em modo de visualização e o usuário clicar em EDITAR
            setEditar(true);  // Ativa o modo de edição
        }
    };
    
    const handleSair = async () => {
        try {
            await signOut(auth);
            router.replace('/');
        } catch (error) {
            console.error(error.code);
            console.error(error.message);
        }
    }


    const handleDeletarConta = async () => {
        
        const user = auth.currentUser;

        if (!user) {
            Alert.alert("Erro", "Usuário não autenticado.");
            return;
        }

        const email = user.email; 
        const senha = user.senha

        Alert.alert("Excluir Conta","Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            // Solicitar reautenticação, se necessário
                            const credential = EmailAuthProvider.credential(email, senha);
                            await reauthenticateWithCredential(user, credential);

                            // Deletar a conta do Firebase Auth
                            await deleteUser(user);

                            // Deletar dados do Firestore
                            await deleteDoc(doc(db, 'usuarios', user.uid));

                            Alert.alert("Sucesso", "Sua conta foi excluída.");
                            router.replace('/'); 

                        } catch (error) {
                            console.error(error.code);
                            console.error(error.message);

                            if (error.code === 'auth/requires-recent-login') {
                                Alert.alert("Erro", "Por favor, faça login novamente para excluir sua conta.");
                            } else {
                                Alert.alert("Erro", "Não foi possível excluir sua conta.");
                            }
                        }
                    },
                },
            ],
        );
    };

    let [fonteCarregada, fonteErro] = useFonts({
        Pompiere_400Regular,
        NotoSans_600SemiBold
    });

    if (!fonteCarregada && !fonteErro) {
        return null;
    };
       

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <SetaVoltar />
                <View>
                    <Text style={styles.titulo}>Tela de Perfil</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={require("../../assets/logo-sapo.png")} style={styles.fundoAvatar} />
                        <Pressable style={styles.iconeEditarImagem}>
                            <Image source={require("../../assets/icone-editar.png")} />
                        </Pressable>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={{ width: '100%', alignItems: 'center', justifyContent: "center", flexGrow: 1, gap: 40 }}
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.fundoDados}>
                        <Text style={styles.subtitulo}>
                            Dados Básicos
                        </Text>

                        <View style={{ gap: 10 }}>
                            <View>
                                <Text style={styles.label}>Nome Completo</Text>
                                <TextInput
                                    style={styles.campo}
                                    value={userData.nome}
                                    editable={editar}
                                    onChangeText={(text) => setUserData(prevData => ({ ...prevData, nome: text }))}
                                />
                            </View>
                            <View>
                                <CampoDataDeNascimento
                                    value={userData.dataNascimento}
                                    editable={editar}
                                    onChangeDate={(date) => setUserData(prevData => ({ ...prevData, dataNascimento: date }))}
                                />
                            </View>
                            <View>
                                <CampoGenero
                                    value={userData.genero}
                                    editable={editar}
                                    onChangeGender={(gender) => setUserData(prevData => ({ ...prevData, genero: gender }))}
                                />
                            </View>

                        </View>

                        <BotaoPrincipal
                            titulo={editar ? "SALVAR" : "EDITAR"}
                            backgroundColor="#415E3E"
                            color="#FFFFFF"
                            width={188}
                            onPress={handleAtualizar}
                        />
                        {editar && (
                        <BotaoSecundario
                            titulo="CANCELAR"
                            onPress={() => {
                            // Reverter os dados para os valores iniciais
                            fetchUserDado();
                            setEditar(false); // Desativar o modo de edição
                            }}
                        />
                        )}
                    </View>

                    <View style={[styles.fundoDados]}>
                        <Text style={styles.subtitulo}> Dados de Login </Text>
                        <View style={styles.espacamentoBotoes}>
                            <BotaoPrincipal titulo="ATUALIZAR EMAIL" backgroundColor="#415E3E" color="#FFFFFF" width={188} />
                            <BotaoPrincipal titulo="ATUALIZAR SENHA" backgroundColor="#415E3E" color="#FFFFFF" width={188} />
                        </View>
                    </View>
                    <View style={styles.espacamentoBotoes}>
                        <BotaoSecundario titulo="DESCONECTAR CONTA" onPress={handleSair} />
                        <Image source={require("../../assets/detalhe-estrela.png")} style={styles.imagemDetalheEstrela} />
                        <BotaoPrincipal titulo="DELETAR CONTA" onPress={handleDeletarConta}/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: "center",
        padding: 16,
        gap: 40,
        paddingTop: 100
    },
    titulo: {
        fontFamily: "Pompiere_400Regular",
        fontSize: 40
    },
    iconeEditarImagem: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 100,
        alignItems: "center"
    },
    fundoAvatar: {
        width: 145,
        height: 145,
        backgroundColor: "#CDE1DE",
        borderRadius: 100
    },
    fundoDados: {
        backgroundColor: "#FBF4E2",
        borderRadius: 25,
        width: "98%",
        alignItems: "center",
        paddingVertical: 30,
        gap: 20
    },
    subtitulo: {
        fontFamily: "Pompiere_400Regular",
        fontSize: 35,
        borderBottomColor: "#415E3E",
        borderBottomWidth: 2,
        paddingBottom: 5
    },
    label: {
        fontFamily: "NotoSans_600SemiBold",
        fontSize: 14
    },
    campo: {
        borderBottomWidth: 1,
        width: 320,
        fontFamily: "Poppins_300Light",
        fontSize: 14,
        color: "#000000"
    },
    campoDiaeMes: {
        borderBottomWidth: 1,
        width: 75,
        textAlign: 'center',
        fontFamily: "Poppins_300Light",
        fontSize: 14,
        color: "#000000"
    },
    campoAno: {
        borderBottomWidth: 1,
        width: 145,
        textAlign: 'center',
        fontFamily: "Poppins_300Light",
        fontSize: 14,
        color: "#000000"
    },
    espacamentoBotoes: {
        gap: 30,
        alignItems:"center"
    },
    imagemDetalheEstrela: {
        width: 35,
        height: 35,
        resizeMode: "contain"
    }

})