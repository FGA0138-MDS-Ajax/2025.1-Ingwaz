import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import GridMenu from "../components/GridMenu";

export default function CultivosECriacoesHub() {
  const navigation = useNavigation();

  const buttons = [
    {
      label: "Registrar Plantio",
      icon: <FontAwesome5 name="plus" size={40} color="#2e5339" />,
      route: "RegistrarPlantio",
    },
    {
      label: "Produção Atual",
      icon: <MaterialIcons name="agriculture" size={45} color="#2e5339" />,
      route: "ProducaoAtual", // ajuste se o nome da tela for diferente
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Cultivos e Criações</Text>
      <Text style={styles.subheader}>Gerencie seu ciclo produtivo</Text>

      <GridMenu items={buttons} />
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: "#666",
    alignSelf: "flex-start",
    marginBottom: 16,
  },
});
