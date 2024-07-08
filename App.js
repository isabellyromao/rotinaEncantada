import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaEntrando from './screens/T.Entrando';
import TelaInicial from './screens/Inicial';
import TelaTudoPronto from './screens/T.TudoPronto';
import Explicativa1 from './screens/T.Explicativa1';
import TelaCadastroRealizado from './screens/T.CadastroRealizado';
import Explicativa2 from './screens/T.Explicativa2';
import Explicativa3 from './screens/T.Explicativa3';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicial" component={TelaInicial} options={{headerShown:false}}/>
        <Stack.Screen name="Explicativa1" component={Explicativa1} options={{headerShown: false}}/>
        <Stack.Screen name="Explicativa2" component={Explicativa2} options={{headerShown: false}}/>
        <Stack.Screen name="Explicativa3" component={Explicativa3} options={{headerShown: false}}/>
        <Stack.Screen name="Entrando" component={TelaEntrando} options={{headerShown: false}}/>
        <Stack.Screen name="TudoPronto" component={TelaTudoPronto} options={{headerShown: false}}/>
        <Stack.Screen name='CadastroRealizado' component={TelaCadastroRealizado} options={{headerShown: false}}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  )
}

