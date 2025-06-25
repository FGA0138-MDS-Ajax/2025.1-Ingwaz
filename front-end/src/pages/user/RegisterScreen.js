import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function Cadastro() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const handleCadastro = () => {
    if (!nome || !cpf || !email || !senha || !confirmarSenha || !userType) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    if (senha !== confirmarSenha) {
      return Alert.alert('Erro', 'As senhas não coincidem.');
    }

    if (!aceitaTermos) {
      return Alert.alert('Erro', 'Você precisa aceitar os termos do aplicativo.');
    }

    // Aqui você faria a chamada para o backend para registrar o usuário
    // Exemplo comentado:
    /*
    fetch('http://SEU_BACKEND_URL/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cpf, email, tipo: userType, senha }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro no cadastro');
        return res.json();
      })
      .then(data => {
        Alert.alert('Sucesso', 'Cadastro realizado. Faça login.');
        navigation.navigate('Login');
      })
      .catch(err => Alert.alert('Erro', err.message));
    */

    // Simulação de sucesso para teste:
    Alert.alert('Sucesso', 'Cadastro realizado. Faça login.');
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.seta}>{'←'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Crie sua conta</Text>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="José Maria dos Santos"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        placeholder="000.000.000-00"
        keyboardType="numeric"
        placeholderTextColor="#999"
        maxLength={14}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="seu@email.com"
        keyboardType="email-address"
        placeholderTextColor="#999"
        autoCapitalize="none"
      />

      <View style={styles.selecione}>
        <Text style={styles.label}>Selecione o tipo de usuário</Text>
        <Picker
          selectedValue={userType}
          onValueChange={(itemValue) => setUserType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Agricultor" value="agricultor" />
          <Picker.Item label="Técnico" value="tecnico" />
          <Picker.Item label="Analista" value="analista" />
        </Picker>
      </View>

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        placeholder="********"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Confirmar senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        placeholder="********"
        placeholderTextColor="#999"
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setAceitaTermos(!aceitaTermos)}>
          <MaterialIcons
            name={aceitaTermos ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color="#66E266"
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          Estou de acordo com os termos do aplicativo
        </Text>
      </View>

      <TouchableOpacity style={styles.botaoCriar} onPress={handleCadastro}>
        <Text style={styles.botaoTexto}>Criar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Já possuo uma conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
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
    marginBottom: 24,
    textAlign: 'center',
  },
  selecione: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#aaa',
    marginBottom: 16,
    paddingVertical: 6,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  botaoCriar: {
    backgroundColor: '#66E266',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    textAlign: 'center',
    color: '#007AFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
