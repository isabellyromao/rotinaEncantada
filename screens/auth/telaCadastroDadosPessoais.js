import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { router, Link } from 'expo-router';
import { useState, useEffect } from "react";
import { View, TextInput, Text, Image, StyleSheet, SafeAreaView, Keyboard, Alert} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { BotaoSecundario, CampoDataDeNascimento } from "../../componentes/geral";
import { Pompiere_400Regular } from '@expo-google-fonts/pompiere';
import { Poppins_300Light, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { NotoSans_600SemiBold } from "@expo-google-fonts/noto-sans";

export default function TelaCadastroDadosPessoais() {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [genero, setGenero] = useState(null);
    const [dataNascimento, setDataNascimento] = useState('');
    const [nome, setNome] = useState('');

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

            // Dados válidos, pode salvar e prosseguir
            const dadosPessoais = { nome, dataNascimento, genero, idade };
            console.log("Dados pessoais armazenados com sucesso!");
            console.log("Nome:", nome);
            console.log("Data de Nascimento:", dataNascimento);
            console.log("Gênero:", genero);
            console.log("Idade:", idade);
            // Código para salvar os dados

            // Navegar para a próxima rota
            router.push('/cadastro-login');
        } catch (e) {
            console.error("Erro ao armazenar dados pessoais: ", e);
        }
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

    const generos = [
        { label: 'Feminino', value: 'Feminino' },
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Outro', value: 'Outro' },
        { label: 'Não sei', value: 'Não sei' },
    ];

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
            <View style={[styles.container, { paddingTop: keyboardVisible ? 250 : 0 }]}>
                <StatusBar style="auto" />
                <>
                    <Text style={styles.titulo}>Cadastre-Se</Text>
                    <Image source={require('../../assets/logo-sapo.png')} style={styles.fundoAvatar} />
                </>
                <View style={{ gap: 20 }}>
                    <TextInput 
                      style={styles.campos} 
                      placeholder="Insira o nome completo"
                      value={nome}
                      onChangeText={(text) => setNome(text)} 
                    />
                    <View style={{ gap: 5 }}>
                        <CampoDataDeNascimento onDataChange={(data) => setDataNascimento(data)} />
                        <Dropdown
                            style={styles.campos}
                            textStyle={styles.textoDrop}
                            selectedTextStyle={styles.textoDrop}
                            data={generos}
                            labelField="label"
                            valueField="value"
                            placeholder="Selecione seu gênero"
                            placeholderStyle={styles.placeholderStyle}
                            value={genero}
                            onChange={(value) => setGenero(value.value)}
                        />
                    </View>
                </View>
                <BotaoSecundario 
                  titulo="CONTINUAR" 
                  width={162} 
                  onPress={handleSalvarDados} 
                />
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
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: "center",
        padding: 16,
        gap: 40,
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
        width: 320,
        fontFamily: "Poppins_300Light",
        fontSize: 14,
        color: "#000000"
    },
    textoDrop:{
        fontFamily: 'Poppins_300Light', 
        fontSize: 14,
        color: "#000000"
    },
    placeholderStyle: {
        color: "#505050",
        fontFamily: "Poppins_300Light",
        fontSize: 14
    },
    containerTextoFinal: {
        position: "static",
        top: "35%",
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
