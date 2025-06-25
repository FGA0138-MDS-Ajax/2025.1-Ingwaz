/*import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SolicitacoesPendentes() {
  const navigation = useNavigation();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [busca, setBusca] = useState('');

  const buscarSolicitacoes = async () => {
    setCarregando(true);
    try {
      const response = await fetch('http://SEU_BACKEND_URL/credito/pendentes/');
      const data = await response.json();
      setSolicitacoes(data);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
    }
    setCarregando(false);
  };

  useEffect(() => {
    buscarSolicitacoes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={require('../../assets/investimento.png')} // substitua pela sua imagem
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.titulo}>Investimento</Text>
        <Text style={styles.descricao}>Fazenda: {item.nome || 'Nome não informado'}</Text>
        <Text style={styles.descricao}>até {item.data || 'Data não informada'}</Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('AvaliacaoCredito', { solicitacaoId: item.id })}
        >
          <Text style={styles.botaoTexto}>Saiba mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const solicitacoesFiltradas = solicitacoes.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          placeholder="Procure uma solicitação"
          style={styles.searchInput}
          value={busca}
          onChangeText={setBusca}
        />
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={solicitacoesFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma solicitação encontrada.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fdfdfd',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 2
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    resizeMode: 'contain'
  },
  info: {
    flex: 1
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16
  },
  descricao: {
    fontSize: 13,
    color: '#444'
  },
  botao: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 20
  }
});*/
