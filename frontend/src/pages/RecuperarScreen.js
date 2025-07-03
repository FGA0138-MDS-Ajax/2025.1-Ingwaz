import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecuperarSenha() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');

  const handleRedefinirSenha = async () => {
    if (!email || !cpf) {
      Alert.alert('Erro', 'Preencha os campos de e-mail e CPF.');
      return;
    }

    try {
      const response = await fetch('http://X.X.X.X:8000/api/users/forgot/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, cpf }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('tempToken', data.token);
        navigation.navigate('RedefinirSenha');
      } else {
        Alert.alert('Erro', data.error || 'Não foi possível recuperar a senha.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na comunicação com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.voltar}>
        <Text style={styles.seta}>{'←'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subTitle}>Informe seu e-mail e CPF</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="seuemail@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        placeholder="00000000000"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={handleRedefinirSenha}>
        <Text style={styles.botaoTexto}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  voltar: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  seta: {
    fontSize: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  label: {
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 24,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#66E266',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

