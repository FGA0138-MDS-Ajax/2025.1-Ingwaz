import React from "react";
import { Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistrarPropriedade from "../pages/RegistrarPropriedade";
import EscolhaPropriedadeScreen from "../pages/EscolhaPropriedade";
import Home from "../pages/Home";
import WeatherScreen from "../pages/PrevisaoScreen";
import CotacoesScreen from "../pages/CotacoesScreen";
import PerguntasScreen from "../pages/PerguntasScreen";
import PedirCredito from "../pages/SolicitarCreditoScreen";
import RegistrarPlantio from "../pages/RegistrarPlantio";
import AnaliseSolicitacoes from "../pages/AnaliseSolicitacoesScreen";
import AgricultorSolicitacoes from "../pages/AgricultorSolicitacoesScreen";
import ListarPlantiosScreen from "../pages/ListarPlantiosScreen";


const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Registrar Propriedades" component={RegistrarPropriedade} />
      <Stack.Screen name="Registrar Plantios" component={RegistrarPlantio} />
      <Stack.Screen name="Plantios Registrados" component={ListarPlantiosScreen} />
      {/* <Stack.Screen name="Produção Atual" component={...} /> */}
      <Stack.Screen name="Solicitar Crédito" component={PedirCredito} />
      <Stack.Screen name="Solicitações de Crédito" component={AgricultorSolicitacoes} />
      <Stack.Screen name="Analisar Solicitações de Crédito" component={AnaliseSolicitacoes} />
      <Stack.Screen
        name="Preços Produtos Rurais"
        component={CotacoesScreen}
        options={{
          headerRight: () => (
            <Text style={styles.headerSource}>CEPEA e{"\n"}HFBRASIL</Text>
          ),
        }}
      />
      <Stack.Screen
        name="Perguntas Agrícolas"
        component={PerguntasScreen}
        options={{
          headerRight: () => <Text style={styles.headerSource}>EMBRAPA</Text>,
        }}
      />
      <Stack.Screen name="Previsão do Tempo" component={EscolhaPropriedadeScreen} />
      <Stack.Screen name="Previsões" component={WeatherScreen} />
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
