import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Homes/welcome";
import LoginScreen from "../pages/Autenticacao/LoginScreen";
import RegisterScreen from "../pages/Autenticacao/RegisterScreen";
import RecuperarSenha from "../pages/Autenticacao/RecuperarScreen";
import RedefinirSenha from "../pages/Autenticacao/RedefinirSenha";

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Criar Conta" component={RegisterScreen} />
      <Stack.Screen name="Recuperar Senha" component={RecuperarSenha} />
      <Stack.Screen name="Redefinir Senha" component={RedefinirSenha} />
    </Stack.Navigator>
  );
}
