import React from 'react';
import { Text, View } from 'react-native';
import firebaseConfig from '../signspeaak/firebaseConfig';
import { ThemeProvider } from '../signspeaak/screens/context/ThemeContext'; // Importamos el ThemeProvider
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../signspeaak/screens/HomeScreen';
import RegisterScreen from '../signspeaak/screens/RegisterScreen';
import Registercorreo from '../signspeaak/screens/Registercorreo';
import Datos from '../signspeaak/screens/Datos';
import LoginScreen from '../signspeaak/screens/LoginScreen';
import Olvidocontra from '../signspeaak/screens/Olvidocontra';
import Perfil from '../signspeaak/screens/Perfil';
import IdiomaScreen from '../signspeaak/screens/IdiomaScreen';
import VolumenScreen from '../signspeaak/screens/VolumenScreen';
import TutorialScreen from '../signspeaak/screens/TutorialScreen';
import AyudaScreen from '../signspeaak/screens/AyudaScreen';
import HistorialScreen from '../signspeaak/screens/HistorialScreen';
import PrivacidadScreen from '../signspeaak/screens/PrivacidadScreen';
import EditarPerfil from '../signspeaak/screens/EditarPerfil';
import SignText from '../signspeaak/screens/SignText'; // Ruta correcta
import TexttoSign from '../signspeaak/screens/TexttoSign'
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Registercorreo" component={Registercorreo} />
            <Stack.Screen name="Datos" component={Datos} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Olvidocontra" component={Olvidocontra} />
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen name="IdiomaScreen" component={IdiomaScreen} />
            <Stack.Screen name="VolumenScreen" component={VolumenScreen} />
            <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
            <Stack.Screen name="AyudaScreen" component={AyudaScreen} />
            <Stack.Screen name="HistorialScreen" component={HistorialScreen} />
            <Stack.Screen name="PrivacidadScreen" component={PrivacidadScreen} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
            <Stack.Screen name="SignText" component={SignText} />
            <Stack.Screen name="TexttoSign" component={TexttoSign} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
