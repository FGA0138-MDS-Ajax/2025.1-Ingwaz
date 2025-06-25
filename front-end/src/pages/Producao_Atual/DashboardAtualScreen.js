import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProducaoAtual() {
  const navigation = useNavigation();
  const [cultivos, setCultivos] = useState([]);
  const [criacoes, setCriacoes] = useState([]);
  const [statusSelecionado, setStatusSelecionado] = useState('Crescendo');

  useEffect(() => {
    // Simulando dados
    setCultivos([
      {
        id: 1,
        nome: 'Dr. Mateen',
        idade: 53,
        sexo: 'Male',
        investimento: 5000,
        previsao_colheita: 'março/2025',
        imagem_usuario: 'https://via.placeholder.com/50',
        status: 'Crescendo'
      },
      {
        id: 2,
        nome: 'Ana Silva',
        idade: 45,
        sexo: 'Feminino',
        investimento: 3000,
        previsao_colheita: 'abril/2025',
        imagem_usuario: 'https://via.placeholder.com/50',
        status: 'Doente'
      }
    ]);

    setCriacoes([
      {
        id: 3,
        nome: 'Dr. Mateen',
        idade: 53,
        sexo: 'Male',
        investimento: 5000,
        previsao_colheita: 'março/2025',
        imagem_usuario: 'https://via.placeholder.com/50',
        status: 'Ativo'
      }
    ]);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.imagem_usuario || 'https://via.placeholder.com/50' }} style={styles.avatar} />
        <View>
          <Text style={styles.investimento}>Investimento: R$ {item.investimento}</Text>
          <Text>{item.previsao_colheita || 'Sem previsão'}</Text>
        </View>
      </View>
      <View style={styles.rowBottom}>
        <Text>{item.nome || '-'}</Text>
        <Text>{item.idade ? `${item.idade}` : '--'} </Text>
        <Text>{item.sexo || '--'}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item.status || 'Sem status'}</Text>
        </View>
      </View>
    </View>
  );

  const cultivosFiltrados = cultivos.filter(c => c.status === statusSelecionado);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Produção Atual</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegistrarCultivo')}>
          <Ionicons name="add" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Status do Cultivo</Text>
      <View style={styles.filtroContainer}>
        {['Crescendo', 'Colheita', 'Doente'].map(status => (
          <TouchableOpacity
            key={status}
            style={[styles.filtroBotao, statusSelecionado === status && styles.filtroBotaoAtivo]}
            onPress={() => setStatusSelecionado(status)}
          >
            <Text style={[styles.filtroTexto, statusSelecionado === status && styles.filtroTextoAtivo]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={cultivosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum cultivo com status "{statusSelecionado}".</Text>}
      />

      <Text style={styles.sectionTitle}>Criações em Andamento</Text>
      <FlatList
        data={criacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma criação registrada.</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 6,
    fontWeight: '600'
  },
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  filtroBotao: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#f0f0f0'
  },
  filtroBotaoAtivo: {
    backgroundColor: '#333'
  },
  filtroTexto: {
    color: '#555'
  },
  filtroTextoAtivo: {
    color: '#fff',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowBottom: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  investimento: {
    fontWeight: 'bold'
  },
  tag: {
    backgroundColor: '#82d97c',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10
  },
  tagText: {
    color: '#fff',
    fontSize: 12
  },
  emptyMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 12
  }
});
