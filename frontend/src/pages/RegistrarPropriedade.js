import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "@env";

import ScreenLayout from "../components/ScreenLayout";

export default function RegistrarPropriedade() {
  const [nome, setNome] = useState("");
  const [areaTotal, setAreaTotal] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = async () => {
    if (!nome || !areaTotal) {
      Alert.alert("Erro", "Nome e área total são obrigatórios.");
      return;
    }

    const token = await AsyncStorage.getItem("token");

    const payload = {
      nome,
      area_total: parseFloat(areaTotal),
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
    };

    const API_BASE = `${API_URL}/api`;

    try {
      const response = await fetch(`${API_BASE}/propriedade/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const textResponse = await response.text();
      console.log("Resposta da API (como texto):", textResponse); 

      let responseData;
      try {
        responseData = JSON.parse(textResponse);
      } catch (error) {
        console.error("Erro ao parsear JSON:", error);
        Alert.alert("Erro", "A resposta do servidor não é válida.");
        return;
      }

      if (!response.ok) {
        throw new Error("Falha ao registrar propriedade");
      }

      console.log("Resposta da API (JSON):", responseData);

      Alert.alert("Sucesso", "Propriedade registrada com sucesso!");

      setNome("");
      setAreaTotal("");
      setLatitude("");
      setLongitude("");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      Alert.alert("Erro", "Não foi possível registrar a propriedade.");
    }
  };

  return (
    <ScreenLayout hasHeader={true}>
      <Text style={styles.label}>Nome da Propriedade</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Fazenda Boa Vista"
      />

      <Text style={styles.label}>Área Total (hectares)</Text>
      <TextInput
        style={styles.input}
        value={areaTotal}
        onChangeText={setAreaTotal}
        keyboardType="numeric"
        placeholder="Ex: 10.5"
      />

      <Text style={styles.label}>Latitude (opcional)</Text>
      <TextInput
        style={styles.input}
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
        placeholder="Ex: -23.56789"
      />

      <Text style={styles.label}>Longitude (opcional)</Text>
      <TextInput
        style={styles.input}
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
        placeholder="Ex: -46.56789"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar Propriedade</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#66E266",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
