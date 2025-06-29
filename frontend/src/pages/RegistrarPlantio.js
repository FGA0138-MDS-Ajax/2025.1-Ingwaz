import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RegistrarPlantio() {
  const [cultura, setCultura] = useState('');
  const [area, setArea] = useState('');
  const [data, setData] = useState('');
  const [estimativaColheita, setEstimativaColheita] = useState('');
  const [propriedade, setPropriedade] = useState('');
  const [propriedades, setPropriedades] = useState([]);

  useEffect(() => {
    // Mock de propriedades — substituir pela chamada GET /api/propriedade/ depois
    setPropriedades([
      { id: 1, nome: 'Sítio Santa Clara' },
      { id: 2, nome: 'Fazenda Esperança' },
    ]);
  }, []);

  const handleSubmit = () => {
    if (!cultura || !area || !data || !estimativaColheita || !propriedade) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const payload = {
      cultura,
      area: parseFloat(area),
      data,
      estimativa_colheita: estimativaColheita,
      propriedade: parseInt(propriedade),
    };

    console.log('Dados do plantio:', payload);
    Alert.alert('Atenção', 'Integração ainda será feita. Veja console.');
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
