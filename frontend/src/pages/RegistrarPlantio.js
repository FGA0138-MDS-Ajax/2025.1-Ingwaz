import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export default function RegistrarPlantio() {
  const [cultura, setCultura] = useState('');
  const [area, setArea] = useState('');
  const [data, setData] = useState('');
  const [estimativaColheita, setEstimativaColheita] = useState('');
  const [propriedade, setPropriedade] = useState('');
  const [propriedades, setPropriedades] = useState([]);

  // Carregar propriedades registradas da API
  useEffect(() => {
    const fetchPropriedades = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch(`${API_URL}/api/propriedade/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        });

        const data = await response.json();
        setPropriedades(data);  // Preenche as propriedades com dados da API
      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
        Alert.alert('Erro', 'Não foi possível carregar as propriedades.');
      }
    };

    fetchPropriedades();
  }, []);

  const handleSubmit = async () => {
    if (!cultura || !area || !data || !estimativaColheita || !propriedade) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const payload = {
      cultura,
      area: parseFloat(area),
      data,
      estimativa_colheita: estimativaColheita,
      propriedade: parseInt(propriedade),  // Envia o ID da propriedade selecionada
    };

    const API_BASE = `${API_URL}/api`;

    try {
      const response = await fetch(`${API_BASE}/plantios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const textResponse = await response.text();
      console.log('Resposta da API (como texto):', textResponse);

      let responseData;
      try {
        responseData = JSON.parse(textResponse);  // Tenta converter a resposta para JSON
      } catch (error) {
        console.error('Erro ao parsear JSON:', error);
        Alert.alert('Erro', 'A resposta do servidor não é válida.');
        return;
      }

      if (!response.ok) {
        throw new Error('Falha ao registrar plantio');
      }

      console.log('Resposta da API (JSON):', responseData);
      Alert.alert('Sucesso', 'Plantio registrado com sucesso!');
      
      // Limpar os campos após o sucesso
      setCultura('');
      setArea('');
      setData('');
      setEstimativaColheita('');
      setPropriedade('');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      Alert.alert('Erro', 'Não foi possível registrar o plantio.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Novo Plantio</Text>

      <Text style={styles.label}>Cultura</Text>
      <TextInput style={styles.input} value={cultura} onChangeText={setCultura} placeholder="Ex: Milho" />

      <Text style={styles.label}>Área (hectares)</Text>
      <TextInput style={styles.input} value={area} onChangeText={setArea} placeholder="Ex: 5.2" keyboardType="numeric" />

      <Text style={styles.label}>Data do plantio</Text>
      <TextInput style={styles.input} value={data} onChangeText={setData} placeholder="YYYY-MM-DD" />

      <Text style={styles.label}>Estimativa de colheita</Text>
      <TextInput style={styles.input} value={estimativaColheita} onChangeText={setEstimativaColheita} placeholder="YYYY-MM-DD" />

      <Text style={styles.label}>Propriedade</Text>
      <Picker
        selectedValue={propriedade}
        onValueChange={(itemValue) => setPropriedade(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione..." value="" />
        {propriedades.map((p) => (
          <Picker.Item key={p.id} label={p.nome} value={p.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar Plantio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#66E266',
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
