import React from "react";
import { Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AgricultorSolicitacoes from "../pages/Credito/AgricultorSolicitacoesScreen";
import AnaliseSolicitacoes from "../pages/Credito/AnaliseSolicitacoesScreen";
import CotacoesScreen from "../pages/CotacoesScreen";
import EscolhaPropriedadeScreen from "../pages/Previsao/EscolhaPropriedade";
import WeatherScreen from "../pages/Previsao/PrevisaoScreen";
import PerguntasScreen from "../pages/PerguntasScreen";
import RegistrarPlantio from "../pages/RegistrarPlantio";
import RegistrarPropriedade from "../pages/RegistrarPropriedade";
import PedirCredito from "../pages/Credito/SolicitarCreditoScreen";
import Home from "../pages/Homes";
import EscolhaCulturaScreen from "../pages/Calendario/EscolhaCulturaScreen";
import CalendarioScreen from "../pages/Calendario/CalendarioScreen";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Registrar Propriedades" component={RegistrarPropriedade} />
      <Stack.Screen name="Registrar Plantios" component={RegistrarPlantio} />
      {/* <Stack.Screen name="Produção Atual" component={...} /> */}
      <Stack.Screen name="Solicitar Crédito" component={PedirCredito} />
      <Stack.Screen name="Solicitações de Crédito" component={AgricultorSolicitacoes} />
      <Stack.Screen
        name="Analisar Solicitações de Crédito"
        component={AnaliseSolicitacoes}
      />
      <Stack.Screen
        name="Preços Produtos Rurais"
        component={CotacoesScreen}
        options={{
          headerRight: () => <Text style={styles.subHeader}>CEPEA e{"\n"}HFBRASIL</Text>,
        }}
      />
      <Stack.Screen
        name="Perguntas Agrícolas"
        component={PerguntasScreen}
        options={{
          headerRight: () => <Text style={styles.subHeader}>EMBRAPA</Text>,
        }}
      />
      <Stack.Screen name="Previsão do Tempo" component={EscolhaPropriedadeScreen} />
      <Stack.Screen name="Previsões" component={WeatherScreen} />
      <Stack.Screen name="Calendário de Plantios" component={EscolhaCulturaScreen} />
      <Stack.Screen name="Calendário" component={CalendarioScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
  },
});
