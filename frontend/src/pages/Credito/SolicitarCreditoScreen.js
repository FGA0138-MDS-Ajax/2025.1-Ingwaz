import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { solicitarCredito, avaliarCredito } from "./api";
import { AuthContext } from "../../navigation/AuthContext";
import ScreenLayout from "../../components/ScreenLayout";
import { API_URL } from "@env";

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
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [plantios, setPlantios] = useState([]);
  const [plantio, setPlantio] = useState([]);

  useEffect(() => {
    const fetchPlantios = async () => {
      console.log("pegando plantios");
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await fetch(`${API_URL}/api/plantios/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        const data = await response.json();
        setPlantios(data);
      } catch (error) {
        console.error("Erro ao carregar plantios:", error);
        Alert.alert("Erro", "Não foi possível carregar as plantios.");
      }
    };

    fetchPlantios();
  }, []);

  useEffect(() => {
    console.log(
      "DADOS DO UTILIZADOR NO CONTEXTO (SolicitarCreditoScreen):",
      JSON.stringify(user, null, 2),
    );
  }, [user]);

  const [finalidade, setFinalidade] = useState("");
  const [valor, setValor] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSolicitar = async () => {
    if (!plantio || !finalidade || !valor) {
      Alert.alert("Atenção", "Todos os campos são obrigatórios.");
      return;
    }
    console.log("handleSolicitar disparado! plantioId =", plantio);
    setCarregando(true);
    try {
      const dados = {
        plantio: parseInt(plantio, 10),
        finalidade,
        valor_solicitado: parseFloat(valor),
      };

      const result = await solicitarCredito(dados);

      if (result && result.id) {
        const resultadoAvaliacao = await avaliarCredito(result.id);

        const statusFinal = resultadoAvaliacao.solicitacao?.status || "desconhecido";
        Alert.alert(
          "Solicitação Processada!",
          `A sua solicitação foi enviada e o resultado da análise é: ${statusFinal.toUpperCase()}`,
          [{ text: "OK", onPress: () => navigation.navigate("Solicitações de Crédito") }],
        );
      } else {
        throw new Error(
          "A resposta da criação da solicitação não continha um ID válido.",
        );
      }
    } catch (err) {
      const errorMessage =
        err.detail ||
        (err.plantio && err.plantio[0]) ||
        "Não foi possível enviar a solicitação.";
      Alert.alert("Erro na Solicitação", errorMessage);
    } finally {
      setCarregando(false);
    }
  };

  const handleNavigateToList = () => {
    if (user?.tipo === "analista") {
      navigation.navigate("Análise de Solicitaões");
    } else {
      navigation.navigate("Solicitações de Crédito");
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={themeColors.accent} />
        <Text style={styles.loadingText}>A carregar dados do utilizador...</Text>
      </View>
    );
  }

  return (
    <ScreenLayout hasHeader={true} style={styles.container} isList={true}>
      <View style={styles.card}>
        <Text style={styles.title}>Nova Solicitação</Text>

        <Text style={styles.label}>Plantio</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={plantio}
            onValueChange={(itemValue) => setPlantio(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione..." value="" />
            {plantios.map((p) => (
              <Picker.Item key={p.id} label={p.cultura + " #" + p.id.toString()} value={p.id.toString()} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Finalidade do Crédito</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Compra de fertilizantes"
          value={finalidade}
          onChangeText={setFinalidade}
          placeholderTextColor={themeColors.placeholder}
        />

        <Text style={styles.label}>Valor Solicitado (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 5000.00"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
          placeholderTextColor={themeColors.placeholder}
        />

        {carregando ? (
          <ActivityIndicator
            size="large"
            color={themeColors.accent}
            style={{ marginTop: 20 }}
          />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSolicitar}>
            <Text style={styles.buttonText}>Enviar Solicitação</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.secondaryButton} onPress={handleNavigateToList}>
          <Text style={styles.secondaryButtonText}>
            {user?.tipo === "analista"
              ? "Ver Todas as Solicitações"
              : "Ver Minhas Solicitações"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "#F9FBE7",
    borderWidth: 1,
    borderColor: "#A5D6A7",
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: themeColors.textPrimary,
  },
  picker: {
    height: 52,
  },
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
    shadowColor: "#000",
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
    fontWeight: "600",
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
  secondaryButton: {
    backgroundColor: "transparent",
    borderColor: themeColors.accent,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  secondaryButtonText: {
    color: themeColors.accent,
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 10,
    color: themeColors.textPrimary,
  },
});
