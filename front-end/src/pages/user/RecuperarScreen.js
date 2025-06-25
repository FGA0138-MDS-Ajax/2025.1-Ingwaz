import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RecuperarSenha () {
    const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const handleRedefinirSenha = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, preencha o campo de e-mail.');
      return;
    }

    //  chamar a API para envio de redefinição
    Alert.alert('Enviado', `Enviamos um link para ${email} redefinir sua senha.`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.voltar}>
        <Text style={styles.seta}>{'←'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subTitle}>
        Por favor, insira seu e-mail para redefinir a senha
      </Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="seuemail@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('RedefinirSenha')}>
        <Text style={styles.botaoTexto}>Redefinir senha</Text>
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