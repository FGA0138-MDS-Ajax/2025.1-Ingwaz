import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import DashboardScreen from '../pages/DashboardScreen';
import Home from '../pages/Home';
import SolicitarCreditoScreen from '../pages/SolicitarCreditoScreen'
import AgricultorSolicitacoesScreen from '../pages/AgricultorSolicitacoesScreen';
import AnaliseSolicitacoesScreen from '../pages/AnaliseSolicitacoesScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pedido de Crédito" component={SolicitarCreditoScreen} />
      <Stack.Screen name="AgricultorSolicitacoes" component={AgricultorSolicitacoesScreen} />
      <Stack.Screen name="AnaliseSolicitacoes" component={AnaliseSolicitacoesScreen} />

    </Stack.Navigator>
  );
}