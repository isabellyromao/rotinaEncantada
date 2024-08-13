import {Tabs} from "expo-router"
import { Image } from "react-native-web"

export default function TabsLayout(){
    return(
        <Tabs 
        screenOptions={({ route }) => {
            return {
              tabBarIcon: () => {
                let iconName;
                if (route.name === "index") {
                  iconName = require("../../assets/home.png");
                } else if (route.name === "perfis/index") {
                  iconName = require("../../assets/perfis.png");
                } else if (route.name === "add-tarefa/index") {
                  iconName = require("../../assets/add-tarefa.png");
                } else if (route.name === "recompensas/index") {
                  iconName = require("../../assets/recompensas.png");
                }
                else if (route.name === "imprimir/index") {
                    iconName = require("../../assets/imprimir.png");
                  }
                return (
                  <Image
                    style={{ width: 25, height: 25}}
                    source={iconName}
                  />
                );
              },
              headerShown: false,
              tabBarShowLabel: false,
            };
          }}
        >
            <Tabs.Screen name="index"/>
            <Tabs.Screen name="perfis/index"/>
            <Tabs.Screen name="add-tarefa/index"/>
            <Tabs.Screen name="recompensas/index"/>
            <Tabs.Screen name="imprimir/index"/>
        </Tabs>
    )
}