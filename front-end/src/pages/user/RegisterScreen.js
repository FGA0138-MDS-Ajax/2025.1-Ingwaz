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
  const [usuario, setUsuario] = useState('');
  const [userType, setUserType] = useState(''); 
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [aceitaSugestoes, setAceitaSugestoes] = useState(false);

  const handleCadastro = () => {
    if (!nome || !cpf || !usuario || !senha || !confirmarSenha || !userType) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }
    if (senha !== confirmarSenha) {
      return Alert.alert('Erro', 'As senhas não coincidem.');
    }
    if (!aceitaTermos) {
      return Alert.alert('Erro', 'Você precisa aceitar os termos do aplicativo.');
    }

    Alert.alert('Sucesso', `Bem-vindo, ${nome}!`);

    // Aqui você pode fazer a lógica de envio para o backend

    // E redirecionar com base no tipo
    // Exemplo:
    // if (userType === 'agricultor') navigation.navigate('HomeAgricultor');

    navigation.navigate('Drawer'); // você pode mudar isso conforme o tipo
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
        <Text style={styles.label}>Selecione o tipo de usuário: </Text>
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
        <Text style={styles.checkboxLabel}>
          Estou de acordo com os termos do aplicativo
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setAceitaSugestoes(!aceitaSugestoes)}>
          <MaterialIcons
            name={aceitaSugestoes ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color="#66E266"
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          Aceito receber sugestões por email
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
    textAlign: 'center',
    marginBottom: 24,
  },
  selecione: {
    padding: 16,
  },
  picker: {
    height: 60,
    width: '100%',
  },
  label: {
    marginBottom: 4,
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
    marginBottom: 12,
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
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
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
