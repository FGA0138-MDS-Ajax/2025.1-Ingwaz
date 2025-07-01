import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RedefinirSenha() {
  const navigation = useNavigation();
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState('');
  const [mostrarConfirmar, setMostrarConfirmar] = useState('');

  const handleAtualizarSenha = async () => {
    if (!senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha os dois campos de senha.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('tempToken');
      if (!token) {
        Alert.alert('Erro', 'Token de recuperação não encontrado.');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/users/info/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ password: senha }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
        await AsyncStorage.removeItem('tempToken');
        navigation.navigate('Login');
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.error || 'Não foi possível atualizar a senha.');
      }
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      Alert.alert('Erro', 'Erro ao tentar atualizar a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('RecuperarSenha')}
        style={styles.voltar}
      >
        <Text style={styles.seta}>{'←'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Redefinir Senha</Text>
      <Text style={styles.subTitle}>
        Crie uma nova senha. Certifique-se de que ela seja diferente das anteriores.
      </Text>

      <Text style={styles.label}>Nova Senha</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!mostrarSenha}
          value={senha}
          onChangeText={setSenha}
          placeholder="********"
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Text style={styles.olho}>{mostrarSenha ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirmar Nova Senha</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!mostrarConfirmar}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="********"
        />
        <TouchableOpacity onPress={() => setMostrarConfirmar(!mostrarConfirmar)}>
          <Text style={styles.olho}>{mostrarConfirmar ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleAtualizarSenha}>
        <Text style={styles.botaoTexto}>Atualizar Senha</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  olho: {
    fontSize: 18,
    marginLeft: 8,
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
