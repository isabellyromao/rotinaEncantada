import { Text, View, TextInput, Image } from "react-native";

export default function TelaLogin() {
    return(
        <View>
            <Text>Bem-Vindo De Volta</Text>
            <Image></Image>
            <View>
                <icon></icon>
                <Text>LEMBRETE: A senha deve ter 6 números</Text>
            </View>
            <TextInput></TextInput>
            <TextInput></TextInput>
        </View>
    )
}