import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function RelatorioButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.relatorioButton}
      onPress={() => navigation.navigate("Relatório de Produtividade")}
    >
      <Ionicons name="document-text-outline" size={40} color="#2e5339" />
      <Text style={styles.relatorioText}>Relatório de Produtividade</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  relatorioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CEEBAF",
    borderRadius: 10,
    padding: 25,
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
  },
  relatorioText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#00000",
  },
});
