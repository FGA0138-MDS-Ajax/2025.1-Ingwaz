import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import Home from '../pages/Home';
import CotacoesScreen from '../pages/CotacoesScreen'
import PerguntasScreen from '../pages/PerguntasScreen'
import RecuperarSenha from '../pages/RecuperarScreen';
import RedefinirSenha from '../pages/RedefinirSenha';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen 
        name="Preços Produtos Rurais" 
        component={CotacoesScreen}
        options={{
          headerRight: () => (
            <Text style={styles.headerSource}>CEPEA e{'\n'}HFBRASIL</Text>
          ),
        }} 
      />
      <Stack.Screen 
        name="Perguntas Agrícolas" 
        component={PerguntasScreen}
        options={{
          headerRight: () => (
            <Text style={styles.headerSource}>EMBRAPA</Text>
          ),
        }} 
      />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerSource: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
  },
});