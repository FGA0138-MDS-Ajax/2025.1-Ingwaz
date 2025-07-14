import React, { useContext } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

import HomeScreen from "../../components/Home";

export default function AnalistaHome() {
  const items = [
    {
      name: "Analisar Solicitações de Crédito",
      icon: <FontAwesome6 name="sack-dollar" size={45} color="#2e5339" />,
    },
  ];

  return (
    <HomeScreen
      items={items}
      subGreeting={"Transforme propostas em oportunidades para quem produz."}
    ></HomeScreen>
  );
}
