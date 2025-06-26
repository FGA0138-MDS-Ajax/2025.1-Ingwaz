import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RedefinirSenha() {
  const navigation = useNavigation();
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

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
          'Authorization': `Token ${token}`,
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
      Alert.alert('Erro', 'Erro ao tentar atualizar a senha.');
    }
  };

  return (
    <View style={styles.container}>
      {/* O restante da interface está igual ao que você já tem */}
      {/* Só troque a função do botão final */}
      <TouchableOpacity style={styles.botao} onPress={handleAtualizarSenha}>
        <Text style={styles.botaoTexto}>Atualizar senha</Text>
      </TouchableOpacity>
    </View>
  );
}
