// screens/SolicitarCreditoScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { solicitarCredito } from "../services/api";

// Paleta de Cores (Tema Verde)
const themeColors = {
  background: "#F1F8E9",
  card: "#FFFFFF",
  textPrimary: "#1B5E20",
  placeholder: "#81C784",
  accent: "#4CAF50",
  error: "#D32F2F",
};

export default function SolicitarCreditoScreen() {
  const navigation = useNavigation();
  const [plantioId, setPlantioId] = useState("");
  //const [finalidade, setFinalidade] = useState("");
  //const [valor, setValor] = useState("");
  const [carregando, setCarregando] = useState(false);

    const handleSolicitar = async () => {
    console.log("▶️ handleSolicitar disparado! plantioId =", plantioId);
    if (!plantioId) {
      Alert.alert("Atenção", "Todos os campos são obrigatórios.");
      return;
    }
    setCarregando(true);
    try {
      const dados = {
        plantio: parseInt(plantioId, 10),
       // finalidade,
      //  valor_solicitado: parseFloat(valor),
      };

      
      const result = await solicitarCredito(dados);
     

      Alert.alert("Sucesso!", "Sua solicitação foi enviada com sucesso.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);

    } catch (err) {
      const errorMessage = err.detail || (err.plantio && err.plantio[0]) || "Não foi possível enviar a solicitação.";
      Alert.alert("Erro na Solicitação", errorMessage);
      

    } finally {
      setCarregando(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.card}>
        <Text style={styles.title}>Nova Solicitação</Text>

        <Text style={styles.label}>ID do Plantio</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1"
          keyboardType="numeric"
          value={plantioId}
          onChangeText={setPlantioId}
          placeholderTextColor={themeColors.placeholder}
        />
        {carregando ? (
          <ActivityIndicator size="large" color={themeColors.accent} style={{ marginTop: 20 }}/>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSolicitar}>
            <Text style={styles.buttonText}>Enviar Solicitação</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  card: {
    backgroundColor: themeColors.card,
    margin: 16,
    borderRadius: 12,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: themeColors.textPrimary,
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: themeColors.textPrimary,
    marginBottom: 8,
    fontWeight: '600'
  },
  input: {
    backgroundColor: "#F9FBE7",
    borderWidth: 1,
    borderColor: "#A5D6A7",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: themeColors.textPrimary,
  },
  button: {
    backgroundColor: themeColors.accent,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
