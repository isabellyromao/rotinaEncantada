//Esse arquivo é a porta de entrada e para não ficar cheio de importações é preciso adicionar um arquivo com (rotas).
import { Stack } from "expo-router";

export default function LayoutRaizDeNavegacao() {
  return(
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="(rotas)/primeira/index"/>
        <Stack.Screen name="(rotas)/login/index"/> 
        <Stack.Screen name="(rotas)/cadastro-dados-pessoais/index"/> 
        <Stack.Screen name="(rotas/esqueci-senha/index)"/>
        <Stack.Screen name="(rotas)/entrando/index"/>
        <Stack.Screen name="(rotas)/intro/index"/>
        <Stack.Screen name="(rotas)/tudo-pronto/index"/>
        <Stack.Screen name="(rotas)/cadastro-realizado/index"/> 
      </Stack>
  )
}

//A primeira deveria ser a index.js mas não coloquei porque irei confirgurar ela.
//Está faltando a rota das intros 1,2 e 3, mas é porque vou ver como deixa ela dentro de uma slider