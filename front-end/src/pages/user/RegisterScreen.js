import React, { useState, useContext } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../navigation/AuthContext';

export default function Cadastro() {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [usuario, setUsuario] = useState('');
  const [userType, setUserType] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [aceitaSugestoes, setAceitaSugestoes] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !cpf || !usuario || !senha || !confirmarSenha || !userType) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    if (senha !== confirmarSenha) {
      return Alert.alert('Erro', 'As senhas não coincidem.');
    }

    if (!aceitaTermos) {
      return Alert.alert('Erro', 'Você precisa aceitar os termos do aplicativo.');
    }

    try {
      const response = await fetch('http://SEU_BACKEND_URL/api/cadastro/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          cpf,
          usuario,
          senha,
          tipo: userType,
          receberSugestoes: aceitaSugestoes,
        }),
      });

      if (!response.ok) {
        const erro = await response.json();
        Alert.alert('Erro ao cadastrar', erro.message || 'Verifique os dados informados.');
        return;
      }

      const data = await response.json();
      const { token, usuario: usuarioCadastrado } = data;

      // Armazenar token
      await AsyncStorage.setItem('authToken', token);

      // Atualizar contexto do usuário
      setUser(usuarioCadastrado);

      // Redirecionar
      navigation.replace('Drawer');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Erro ao se conectar com o servidor.');
    }
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

      <Text style={styles.label}>Usuário</Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        placeholder="@josemaria"
        placeholderTextColor="#999"
      />

      <View style={styles.selecione}>
        <Text style={styles.label}>Tipo de usuário</Text>
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

      <Text style={styles.label}>Criar senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        placeholder="************"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Confirmar senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        placeholder="************"
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
        <Text style={styles.checkboxLabel}>Estou de acordo com os termos</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setAceitaSugestoes(!aceitaSugestoes)}>
          <MaterialIcons
            name={aceitaSugestoes ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color="#66E266"
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Aceito receber sugestões por email</Text>
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