import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Perfil() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.warn('Token não encontrado');
          return;
        }

        const resposta = await fetch('http://SEU_BACKEND_URL/api/usuario-logado/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // ou Token, se usar TokenAuth
            'Content-Type': 'application/json',
          },
        });

        if (!resposta.ok) {
          throw new Error(`Erro ${resposta.status}`);
        }

        const dados = await resposta.json();
        setUser(dados);

      } catch (erro) {
        console.error('Erro ao carregar usuário:', erro);

        // ✅ MOCK TEMPORÁRIO (opcional)
        setUser({
          nome: 'João Albuquerque',
          email: 'joao_123@gmail.com',
          telefone: '123456789',
          cidade: 'Goiânia - GO',
          user_type: 'agricultor', // ou 'tecnico', 'analista'
          especialidade: 'pragas',
          culturas: ['milho', 'café'],
          avatarUrl: 'https://i.postimg.cc/1zvCWHrP/189715.png',
          producoes: ['Plantação de Milho', 'Horta Familiar'],
        });
      }
    };

    carregarUsuario();
  }, []);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#66E266" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        <View>
          <Text style={styles.nome}>{user.nome}</Text>
          {user.user_type === 'tecnico' && (
            <Text style={styles.subtitulo}>Especialidade: {user.especialidade}</Text>
          )}
          {user.user_type === 'analista' && (
            <Text style={styles.subtitulo}>Analista de crédito</Text>
          )}
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Detalhes do Usuário</Text>
        <Text style={styles.texto}>Email: {user.email}</Text>
        <Text style={styles.texto}>Telefone: {user.telefone}</Text>
        <Text style={styles.texto}>Cidade/município: {user.cidade}</Text>

        {user.user_type === 'tecnico' && (
          <Text style={styles.texto}>Especialidade: {user.especialidade}</Text>
        )}
        {user.user_type === 'agricultor' && (
          <Text style={styles.texto}>Cultura: {user.culturas?.join(', ')}</Text>
        )}
      </View>

      <View style={styles.secao}>
        {user.user_type === 'tecnico' && <Text style={styles.tituloSecao}>Últimas conversas</Text>}
        {user.user_type === 'analista' && <Text style={styles.tituloSecao}>Últimas análises</Text>}
        {user.user_type === 'agricultor' && <Text style={styles.tituloSecao}>Minhas produções</Text>}

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {user.producoes?.map((item, index) => (
            <View key={index} style={styles.cardProducao}>
              <Text style={styles.producaoTexto}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() => navigation.navigate('EditarPerfil')}
      >
        <Text style={styles.botaoTexto}>Editar Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 14,
    color: '#555',
  },
  secao: {
    marginBottom: 24,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  texto: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  cardProducao: {
    backgroundColor: '#D5F5DC',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  producaoTexto: {
    fontSize: 14,
    textAlign: 'center',
  },
  botaoEditar: {
    backgroundColor: '#66E266',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
