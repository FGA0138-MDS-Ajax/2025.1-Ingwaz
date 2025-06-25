import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RedefinirSenha() {
  const navigation = useNavigation();

  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

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
      // Exemplo de chamada de API fictícia — substitua pela sua URL real
      /*
      const resposta = await fetch('http://localhost:8000/api/reset-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.detail || 'Erro ao atualizar a senha.');
      }
      */

      // Simulação de sucesso:
      Alert.alert('Sucesso', 'Sua senha foi atualizada com sucesso!');
      navigation.replace('Login');
    } catch (erro) {
      Alert.alert('Erro', erro.message || 'Erro inesperado ao redefinir senha.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.navigate('RecuperarSenha')}>
        <Text style={styles.seta}>{'←'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Defina uma nova senha</Text>
      <Text style={styles.subTitle}>
        Crie uma nova senha. Certifique-se de que ela seja diferente das anteriores para sua segurança.
      </Text>

      <Text style={styles.label}>Senha</Text>
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

      <Text style={styles.label}>Confirme sua senha</Text>
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
        <Text style={styles.botaoTexto}>Atualizar senha</Text>
      </TouchableOpacity>
    </View>
  );
}
