import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Cotacoes() {
  const navigation = useNavigation();
  const [cotacoes, setCotacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const buscarCotacoes = async () => {
    setCarregando(true);
    try {
      const response = await fetch('http://SEU_BACKEND_URL/mercado/cotacoes/');
      const data = await response.json();
      setCotacoes(data);
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    }
    setCarregando(false);
  };

  useEffect(() => {
    buscarCotacoes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.produto}>{item.produto}</Text>
      <Text style={styles.preco}>R$ {item.preco.toFixed(2)} / {item.unidade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cotações de Mercado</Text>
        <TouchableOpacity onPress={buscarCotacoes}>
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={cotacoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma cotação disponível.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
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
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  produto: {
    fontSize: 18,
    fontWeight: '600'
  },
  preco: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555'
  },
  emptyMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888'
  }
});
