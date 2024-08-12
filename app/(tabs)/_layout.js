import {Tabs} from "expo-router"
import { Image } from "react-native-web"

export default function TabsLayout(){
    return(
        <Tabs 
        >
            <Tabs.Screen name="home/index"/>
            <Tabs.Screen name="perfis/index"/>
            <Tabs.Screen name="add-tarefa/index"/>
            <Tabs.Screen name="recompensas/index"/>
            <Tabs.Screen name="imprimir/index"/>
        </Tabs>
    )
}