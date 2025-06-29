import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import DashboardScreen from '../pages/DashboardScreen';
import Home from '../pages/Home';
import CotacoesScreen from '../pages/CotacoesScreen'
import PerguntasScreen from '../pages/PerguntasScreen'

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Preços de Produtos Rurais" component={CotacoesScreen} />
      <Stack.Screen name="Perguntas Agrícolas" component={PerguntasScreen} />
    </Stack.Navigator>
  );
}