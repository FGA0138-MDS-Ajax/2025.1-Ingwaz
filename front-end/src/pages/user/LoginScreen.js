import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthContext'; 

export default function Login() {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = () => {
  if (!email || !senha) {
    Alert.alert('Erro', 'Preencha todos os campos.');
    return;
  }
  setUser({
    nome: 'Maria',
    tipo: 'agricultor',
    email,
  });

  console.log("Navegando para Drawer");
  navigation.replace('Drawer');
};


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.seta}>{'←'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Faça o Login</Text>
      <Text style={styles.subTitle}>Veja o que está acontecendo no seu negócio</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="seu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputInterno}
          secureTextEntry={!mostrarSenha}
          value={senha}
          onChangeText={setSenha}
          placeholder="********"
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Text style={styles.olho}>{mostrarSenha ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setLembrar(!lembrar)}>
          <MaterialIcons
            name={lembrar ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color="#66E266"
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Lembre-me</Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')} style={styles.button}>
        <Text style={styles.linkVerde}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.button}>
        <Text style={styles.linkPreto}>Ainda não tenho conta?</Text>
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
    marginBottom: 6,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
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
  inputInterno: {
    flex: 1,
    height: 48,
  },
  olho: {
    fontSize: 18,
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  botao: {
    backgroundColor: '#66E266',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkVerde: {
    color: '#66E266',
    textAlign: 'center',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  linkPreto: {
    textAlign: 'center',
    color: '#333',
    textDecorationLine: 'underline',
  },
});
