import { useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import styles from "../styles/geral"
import { CampoEmail } from "../componentes/geral";

export default function TelaEsqueciSenha () {
    return(
        <View style={[styles.container]}>
            <StatusBar style="auto" />
            <View>
                <Text>Esqueceu a Senha?</Text>
                <Image/>
                <Text>Por favor insira o Email cadastrado para receber as instruções e acessar sua conta.</Text>
            </View>
            <CampoEmail/>
            <BotaoPrincipal titulo="ENVIAR" backgroundColor="#415E3E" color="#FFFFFF"/>
        </View>
    )
}