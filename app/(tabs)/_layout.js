import { Tabs } from "expo-router";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 60,
          backgroundColor: "#CDE1DE"
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          
          if (route.name === "index") {
            iconName = "home-outline";
          } else if (route.name === "perfis/index") {
            iconName = "account-child-outline";
          } else if (route.name === "add-tarefa/index") {
            iconName = "plus";
          } else if (route.name === "recompensas/index") {
            iconName = "trophy-outline";
          } else if (route.name === "imprimir/index") {
            iconName = "printer-outline";
          }

          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: focused ? "#415E3E" : "transparent", // Círculo ao redor do ícone quando focado
                elevation: focused ? 5 : 0, // Elevação quando focado
                top: focused ? -15 : 0, // Move o círculo para cima quando focado
              }}
              >
              <MaterialCommunityIcons
                name={iconName}
                size={30}
                color={focused ? "#ffffff" : "#300030"} // Cor branca quando focado
                style={{ alignSelf: "center", width: 30 }}
              />
            </View>
          );
        }
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="perfis/index" />
      <Tabs.Screen name="add-tarefa/index" />
      <Tabs.Screen name="recompensas/index" />
      <Tabs.Screen name="imprimir/index" />
    </Tabs>
  );
}
