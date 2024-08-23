import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth,db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useRouter, Link } from 'expo-router';
import { View, TextInput, Text, Image, StyleSheet, SafeAreaView, Keyboard, Alert, ScrollView, TouchableOpacity } from "react-native";
import { BotaoSecundario, CampoDataDeNascimento, CampoGenero, Lembrete } from "../../componentes/geral";
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_300Light, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";

export default function TelaCadastro() {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [genero, setGenero] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repetirSenha, setRepetirSenha] = useState('');
    const [esconderSenha1, setEsconderSenha1] = useState(true);
    const [esconderSenha2, setEsconderSenha2] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const calcularIdade = (dataNascimento) => {
        const dataAtual = new Date();
        const [ano, mes, dia] = dataNascimento.split('-').map(Number);
        const idade = dataAtual.getFullYear() - ano;
        if (dataAtual.getMonth() + 1 < mes || (dataAtual.getMonth() + 1 === mes && dataAtual.getDate() < dia)) {
            return idade - 1;
        }
        return idade;
    };

    const handleSalvarDados = async () => {
        try {
            // Verificação de campos
            if (!nome.trim()) {
                Alert.alert("Erro", "Por favor, insira seu nome completo.");
                return;
            }
            const nomeParts = nome.trim().split(' ');
            if (nomeParts.length < 2) {
                Alert.alert("Erro", "Por favor, insira seu nome completo (nome e sobrenome).");
                return;
            }
            if (!dataNascimento) {
                Alert.alert("Erro", "Por favor, insira sua data de nascimento.");
                return;
            }
            if (!genero) {
                Alert.alert("Erro", "Por favor, selecione seu gênero.");
                return;
            }

            const idade = calcularIdade(dataNascimento);
            if (idade < 15) {
                Alert.alert("Erro", "Você precisa ter pelo menos 15 anos para se cadastrar.");
                return;
            }
            // Agora, processa o login
            handleCadastrar(nome, dataNascimento, genero, idade);
        } catch (e) {
            console.error("Erro ao armazenar dados pessoais: ", e);
        }
    };

    const handleCadastrar = async (nome, dataNascimento, genero, idade) => {
        if (!email || !senha || !repetirSenha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailValido(email)) {
            Alert.alert("Erro", "E-mail inválido. \nVerifique o formato do seu e-mail. \nTente novamente com atenção :)");
            return;
        }

        const terSeisNumeros = (password) => (password.match(/\d/g) || []).length == 6;

        if (!terSeisNumeros(senha, repetirSenha)) {
            Alert.alert("Erro", "Senha inválida. Deve conter 6 números. \nTente novamente com atenção :)");
            return;
        }

        if (senha !== repetirSenha) {
            Alert.alert('Senhas diferentes', 'As duas senhas devem ser iguais. \nPor favor refaça com atenção :)');
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

            // Salvar dados pessoais no Firestore
            const userId = userCredential.user.uid;
            await setDoc(doc(db, "dadosTemporarios", userId), {
                nome, dataNascimento, genero, idade, email, emailVerified: false
            });

            await sendEmailVerification(userCredential.user);

            Alert.alert(
                "Verifique seu E-mail",
                `Um e-mail de verificação foi enviado para ${email}. \n\nPor favor, verifique sua caixa de entrada antes de continuar.`,
                [
                    { text: "OK", onPress: () => router.replace('/tudo-pronto') }
                ]
            );
        } catch (error) {
            console.error(error.code);
            console.error(error.message);
            setLoading(false);

            let errorMessage = "Ocorreu um erro. \nTente novamente mais tarde.";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "O e-mail já está em uso. \nTente fazer login ou use um e-mail diferente :)";
                    break;
                default:
                    errorMessage = "Ocorreu um erro. \nTente novamente mais tarde.";
                    break;
            }
            Alert.alert("Erro", errorMessage);
        }
    };

    const handleGeneroChange = (value) => {
        setGenero(value);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    let [fonteCarregada] = useFonts({
        Pompiere_400Regular,
        Poppins_300Light,
        Poppins_600SemiBold,
        NotoSans_600SemiBold,
    });

    if (!fonteCarregada) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.container, { paddingTop: keyboardVisible ? 150 : 0 }]}>
                <StatusBar style="auto" />
                <View style={styles.containerTopo}>
                    <Text style={styles.titulo}>Cadastre-Se</Text>
                    <Image source={require('../../assets/logo-sapo.png')} style={styles.fundoAvatar} />
                </View>
                <ScrollView
                    contentContainerStyle={{ width: '100%', alignItems: 'center', justifyContent: "center", flexGrow: 1, paddingBottom:5 }}
                    style={{ width: '100%', minHeight: 350, maxHeight: 480 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ gap: 20 }}>
                        <View style={{ gap: 20 }}>
                            <TextInput
                                style={styles.campos}
                                placeholder="Insira o nome completo"
                                value={nome}
                                onChangeText={(text) => setNome(text)}
                            />
                            <View style={{ gap: 5 }}>
                                <Text style={{ fontFamily: "NotoSans_600SemiBold", fontSize: 14 }}>Email</Text>
                                <TextInput
                                    style={styles.campos}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder='Insira seu email'
                                    keyboardType='email-address'
                                />
                            </View>
                            <CampoDataDeNascimento onDataChange={(data) => setDataNascimento(data)} />
                            <CampoGenero onGeneroChange={handleGeneroChange} />

                        </View>
                        <View style={{ gap: 20 }}>
                            <Lembrete/>
                            <View style={styles.camposLogin}>
                                <TouchableOpacity
                                    style={[styles.iconeBotaoSenha, esconderSenha1 && styles.iconeBotaoAtivado]}
                                    onPress={() => setEsconderSenha1(true)}>
                                    <MaterialCommunityIcons name="lock-outline" size={22} color="#300030" style={{ alignSelf: "center" }} />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.textoCampo}
                                    value={senha}
                                    onChangeText={setSenha}
                                    keyboardType="numeric"
                                    placeholder="Insira sua senha "
                                    secureTextEntry={esconderSenha1}
                                />
                                <TouchableOpacity
                                    style={[styles.iconeBotaoSenha, !esconderSenha1 && styles.iconeBotaoAtivado]}
                                    onPress={() => setEsconderSenha1(false)}>
                                    <MaterialCommunityIcons name="lock-open-outline" size={22} color="#300030" style={{ alignSelf: "center" }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.camposLogin}>
                                <TouchableOpacity
                                    style={[styles.iconeBotaoSenha, esconderSenha2 && styles.iconeBotaoAtivado]}
                                    onPress={() => setEsconderSenha2(true)}>
                                    <MaterialCommunityIcons name="lock-outline" size={22} color="#300030" style={{ alignSelf: "center" }} />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.textoCampo}
                                    keyboardType="numeric"
                                    value={repetirSenha}
                                    onChangeText={setRepetirSenha}
                                    placeholder="Repita sua senha "
                                    secureTextEntry={esconderSenha2}
                                />
                                <TouchableOpacity
                                    style={[styles.iconeBotaoSenha, !esconderSenha2 && styles.iconeBotaoAtivado]}
                                    onPress={() => setEsconderSenha2(false)}>
                                    <MaterialCommunityIcons name="lock-open-outline" size={22} color="#300030" style={{ alignSelf: "center" }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ paddingVertical: 16 }}>
                    <BotaoSecundario
                        titulo="CADASTRAR"
                        width={162}
                        onPress={handleSalvarDados}
                        loading={loading}
                        disabled={loading}
                    />
                </View>
                <View style={styles.containerTextoFinal}>
                    <Text style={styles.textoFinal}>Já tem conta?</Text>
                    <Link style={styles.linkFinal} href={'/login'}>Faça Login!</Link>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding: 16,
    },
    containerTopo:{ 
        paddingVertical: 16, 
        gap:20
    },
    titulo: {
        color: "#300030",
        fontFamily: "Pompiere_400Regular",
        fontSize: 40
    },
    fundoAvatar: {
        width: 145,
        height: 145,
        backgroundColor: "#CDE1DE",
        borderRadius: 100
    },
    campos: {
        borderBottomWidth: 1,
        borderColor:"300030",
        width: 320,
        fontFamily: "Poppins_300Light",
        fontSize: 14,
        color: "#000000"
    },
    camposLogin: {
        paddingHorizontal: 15,
        flexDirection: "row",
        gap: 10,
        height: 49,
        borderColor: "#300030",
        borderWidth: 1,
        borderRadius: 8,
        width: 322,
    },
    iconeEmail: {
        alignSelf: "center",
        width: 35
    },
    textoCampo: {
        flex: 1,
        fontFamily: "Poppins_300Light",
        fontSize: 14
    },
    iconeBotaoSenha: {
        borderRadius: 100,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center"
    },
    iconeBotaoAtivado: {
        backgroundColor: '#CDE1DE',
    },
    containerTextoFinal: {
        position: "static",
        top: "5%",
        flexDirection: "row",
        gap: 10,
        alignContent: "center",
    },
    textoFinal: {
        fontFamily: "Poppins_300Light",
        fontSize: 14
    },
    linkFinal: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 14
    }
});
