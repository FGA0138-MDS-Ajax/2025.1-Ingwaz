import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import DashboardScreen from '../pages/DashboardScreen';
import EscolhaPropriedadeScreen from '../pages/EscolhaPropriedade';
import Home from '../pages/Home';
import WeatherScreen from '../pages/PrevisaoScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Previsão do Tempo" component={EscolhaPropriedadeScreen}/>
      <Stack.Screen name="Previsões" component={WeatherScreen}/>
    </Stack.Navigator>
  );
}