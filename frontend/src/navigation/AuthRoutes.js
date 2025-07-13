import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../pages/Autenticacao/LoginScreen';
import RegisterScreen from '../pages/Autenticacao/RegisterScreen';
import RecuperarSenha from '../pages/Autenticacao/RecuperarScreen';
import RedefinirSenha from '../pages/Autenticacao/RedefinirSenha';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Criar Conta" component={RegisterScreen} />
      <Stack.Screen name="Recuperar Senha" component={RecuperarSenha} />
      <Stack.Screen name="Redefinir Senha" component={RedefinirSenha} />
    </Stack.Navigator>
  );
}
