import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function CultivosECriacoesHub() {
  const navigation = useNavigation();

  const items = [
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

      <View style={styles.grid}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate(item.route)}
          >
            {item.icon}
            <Text style={styles.buttonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "47%",
    height: 140,
    backgroundColor: "#CEEBAF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
  },
  buttonText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 15,
    color: "#000",
  },
});
