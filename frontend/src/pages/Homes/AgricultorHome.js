import React, { useContext } from "react";
import { Ionicons, FontAwesome5, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";

import HomeScreen from "../../components/Home";
import RelatorioButton from "../../components/RelatorioButton";

export default function AgricultorHome() {
  const items = [
    {
      name: "Registrar Propriedades",
      icon: <FontAwesome5 name="home" size={45} color="#2e5339" />,
    },
    {
      name: "Registrar Plantios",
      icon: <FontAwesome5 name="seedling" size={45} color="#2e5339" />,
    },
    {
      name: "Plantios Registrados",
      icon: <MaterialIcons name="agriculture" size={45} color="#2e5339" />,
    },
    {
      name: "Solicitar Crédito",
      icon: <FontAwesome6 name="sack-dollar" size={45} color="#2e5339" />,
    },
    {
      name: "Preços Produtos Rurais",
      icon: <MaterialIcons name="show-chart" size={45} color="#2e5339" />,
    },
    {
      name: "Perguntas Agrícolas",
      icon: <Ionicons name="help-outline" size={45} color="#2e5339" />,
    },
    {
      name: "Previsão do Tempo",
      icon: <Ionicons name="partly-sunny-outline" size={45} color="#2e5339" />,
    },
    {
      name: "Calendário de Plantios",
      icon: <Ionicons name="calendar" size={45} color="#2e5339" />,
    },
  ];

  return (
    <HomeScreen
      items={items}
      subGreeting={"Veja o que está acontecendo na sua produção hoje."}
      isAbove={true}
    >
      <RelatorioButton />
    </HomeScreen>
  );
}
