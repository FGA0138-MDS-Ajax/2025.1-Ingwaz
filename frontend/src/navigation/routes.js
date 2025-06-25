import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import DashboardScreen from '../pages/DashboardScreen';
import Home from '../pages/Home';
import CotacoesScreen from '../pages/CotacoesScreen'

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    // <Stack.Navigator initialRouteName="Login">
    <Stack.Navigator initialRouteName="Cotações de produtos">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cotações de produtos" component={CotacoesScreen} />
    </Stack.Navigator>
  );
}