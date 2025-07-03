import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import RecuperarSenha from '../pages/RecuperarScreen';
import RedefinirSenha from '../pages/RedefinirSenha';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} />
    </Stack.Navigator>
  );
}
