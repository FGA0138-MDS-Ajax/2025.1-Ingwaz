import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { API_URL } from "@env";

import ScreenLayout from "../../components/ScreenLayout";

const formatDateForAPI = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function RegistrarPlantio() {
  const [cultura, setCultura] = useState("");
  const [area, setArea] = useState("");
  const [propriedade, setPropriedade] = useState("");
  const [propriedades, setPropriedades] = useState([]);

  const [dataPlantio, setDataPlantio] = useState(null);
  const [estimativaColheita, setEstimativaColheita] = useState(null);
  const [showDataPicker, setShowDataPicker] = useState(false);
  const [showEstimativaPicker, setShowEstimativaPicker] = useState(false);

  const onChangeData = (event, selectedDate) => {
    setShowDataPicker(false);
    if (selectedDate) {
      setDataPlantio(selectedDate);
    }
  };

  const onChangeEstimativa = (event, selectedDate) => {
    setShowEstimativaPicker(false);
    if (selectedDate) {
      setEstimativaColheita(selectedDate);
    }
  };

  useEffect(() => {
    const fetchPropriedades = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await fetch(`${API_URL}/api/propriedade/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        const data = await response.json();
        setPropriedades(data);
      } catch (error) {
        console.error("Erro ao carregar propriedades:", error);
        Alert.alert("Erro", "Não foi possível carregar as propriedades.");
      }
    };

    fetchPropriedades();
  }, []);

  const handleSubmit = async () => {
    if (!cultura || !area || !dataPlantio || !estimativaColheita || !propriedade) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const token = await AsyncStorage.getItem("token");
    const payload = {
      cultura,
      area: parseFloat(area),
      data: formatDateForAPI(dataPlantio),
      estimativa_colheita: formatDateForAPI(estimativaColheita),
      propriedade: parseInt(propriedade),
    };

    const API_BASE = `${API_URL}/api`;

    try {
      const response = await fetch(`${API_BASE}/plantios/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Erro da API:", errorData);
        throw new Error(errorData?.detail || "Falha ao registrar plantio");
      }

      const responseData = await response.json();

      console.log("Resposta da API (JSON):", responseData);
      Alert.alert("Sucesso", "Plantio registrado com sucesso!");

      setCultura("");
      setArea("");
      setDataPlantio(null);
      setEstimativaColheita(null);
      setPropriedade("");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      Alert.alert("Erro", error.message || "Não foi possível registrar o plantio.");
    }
  };

  return (
    <ScreenLayout hasHeader={true}>
      <Text style={styles.label}>Cultura</Text>
      <TextInput
        style={styles.input}
        value={cultura}
        onChangeText={setCultura}
        placeholder="Ex: Milho"
      />

      <Text style={styles.label}>Área (hectares)</Text>
      <TextInput
        style={styles.input}
        value={area}
        onChangeText={setArea}
        placeholder="Ex: 5.2"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Data do plantio</Text>
      <TouchableOpacity onPress={() => setShowDataPicker(true)} style={styles.input}>
        <Text style={dataPlantio ? styles.dateText : styles.placeholderText}>
          {dataPlantio ? formatDateForDisplay(dataPlantio) : "Selecione a data"}
        </Text>
      </TouchableOpacity>
      {showDataPicker && (
        <DateTimePicker
          value={dataPlantio || new Date()}
          mode="date"
          display="default"
          onChange={onChangeData}
        />
      )}

      <Text style={styles.label}>Estimativa de colheita</Text>
      <TouchableOpacity
        onPress={() => setShowEstimativaPicker(true)}
        style={styles.input}
      >
        <Text style={estimativaColheita ? styles.dateText : styles.placeholderText}>
          {estimativaColheita
            ? formatDateForDisplay(estimativaColheita)
            : "Selecione a data"}
        </Text>
      </TouchableOpacity>
      {showEstimativaPicker && (
        <DateTimePicker
          value={estimativaColheita || new Date()}
          mode="date"
          display="default"
          onChange={onChangeEstimativa}
          minimumDate={dataPlantio || undefined}
        />
      )}

      <Text style={styles.label}>Propriedade</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={propriedade}
          onValueChange={(itemValue) => setPropriedade(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione..." value="" />
          {propriedades.map((p) => (
            <Picker.Item key={p.id} label={p.nome} value={p.id.toString()} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar Plantio</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  placeholderText: {
    color: "#aaa",
    fontSize: 16,
  },
  dateText: {
    color: "#000",
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  picker: {
    height: 52,
  },
  button: {
    backgroundColor: "#2E7D32",
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
