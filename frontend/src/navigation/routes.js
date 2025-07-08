import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import RegistrarPropriedade from '../pages/RegistrarPropriedade';
import EscolhaPropriedadeScreen from '../pages/EscolhaPropriedade';
import Home from '../pages/Home';
import WeatherScreen from '../pages/PrevisaoScreen';import CotacoesScreen from '../pages/CotacoesScreen'
import PerguntasScreen from '../pages/PerguntasScreen'
import RecuperarSenha from '../pages/RecuperarScreen';
import RedefinirSenha from '../pages/RedefinirSenha';
import CultivoCriacao from '../pages/CultivosECriacoes';
import PedirCredito from '../pages/SolicitarCreditoScreen';
import AnaliseSolicitacoes from '../pages/AnaliseSolicitacoesScreen';


const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} options={{ headerShown: false }} />
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} options={{ headerShown: false }} />
      <Stack.Screen name="Pedido de Crédito" component={PedirCredito} options={{ headerShown: false }} />
      <Stack.Screen name="Cultivo e Criações" component={CultivoCriacao} options={{ headerShown: false }} />
      <Stack.Screen name="RegistrarPropriedade" component={RegistrarPropriedade} options={{ headerShown: false }} />
      <Stack.Screen name="Lucros e Vendas" component={LucrosVendas} options={{ headerShown: false }} />

      <Stack.Screen name="AnaliseSolicitacoes" component={AnaliseSolicitacoes} options={{ headerShown: false }} />

      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
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
      <Stack.Screen name="Previsão do Tempo" component={EscolhaPropriedadeScreen}/>
      <Stack.Screen name="Previsões" component={WeatherScreen}/>
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