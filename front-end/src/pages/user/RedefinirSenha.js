import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RedefinirSenha () {
     const navigation = useNavigation();

  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const handleAtualizarSenha = () => {
    if (!senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha os dois campos de senha.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Aqui você pode chamar a API para atualizar a senha
    Alert.alert('Sucesso', 'Sua senha foi atualizada!');
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

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Login')} >
        <Text style={styles.botaoTexto}>Atualizar senha</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  label: {
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
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
    marginTop: 12,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});