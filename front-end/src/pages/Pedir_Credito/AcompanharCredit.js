import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AcompanharCredit() {
  const [pedidos, setPedidos] = useState([]);
  const [statusFiltro, setStatusFiltro] = useState('analise');
  const [busca, setBusca] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    buscarPedidosFake();

    //  API descomente 
    // buscarPedidos();
  }, []);

  // Simulação
  const buscarPedidosFake = () => {
    const pedidosFalsos = [
      {
        id: 1,
        finalidade: 'Compra de sementes',
        valor: 1200,
        data_pedido: '2025-06-01',
        foto: 'https://via.placeholder.com/50',
        status: 'analise',
      },
      {
        id: 2,
        finalidade: 'Irrigação',
        valor: 2000,
        data_pedido: '2025-06-10',
        foto: 'https://via.placeholder.com/50',
        status: 'aprovado',
      },
      {
        id: 3,
        finalidade: 'Adubos e fertilizantes',
        valor: 1500,
        data_pedido: '2025-06-15',
        foto: 'https://via.placeholder.com/50',
        status: 'reprovado',
      },
    ];
    setPedidos(pedidosFalsos);
  };

  //  API  pronta, descomente
  // const API_URL = 'http://SEU_IP:PORTA/sua-rota';

  // const buscarPedidos = async () => {
  //   try {
  //     const response = await fetch(API_URL); // Adicione headers com token se necessário
  //     const data = await response.json();
  //     setPedidos(data);
  //   } catch (error) {
  //     console.error('Erro ao buscar pedidos:', error);
  //   }
  // };

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      pedido.status === statusFiltro &&
      pedido.finalidade.toLowerCase().includes(busca.toLowerCase())
  );

  const renderPedido = ({ item }) => (
    <View style={styles.card}>
      <Image
         source={{ uri: 'https://i.postimg.cc/1zvCWHrP/189715.png' }}
         style={styles.image}
  />

      <View style={{ flex: 1 }}>
        <Text style={styles.texto}>Finalidade: {item.finalidade}</Text>
        <Text style={styles.texto}>R$ {item.valor}</Text>
        <Text style={styles.texto}>Data: {item.data_pedido}</Text>
      </View>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('DetalhePedido', { pedido: item })}
      >
        <Text style={styles.botaoTexto}>Acompanhar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Text style={styles.seta}>{'←'}</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Acompanhar</Text>

        <TextInput
          placeholder="Buscar por finalidade..."
          value={busca}
          onChangeText={setBusca}
          style={styles.busca}
        />

        <View style={styles.filtros}>
          {['analise', 'aprovado', 'reprovado'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filtroBotao,
                statusFiltro === status && styles.filtroSelecionado,
              ]}
              onPress={() => setStatusFiltro(status)}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  statusFiltro === status && styles.filtroTextoSelecionado,
                ]}
              >
                {status === 'analise'
                  ? 'Em análise'
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={pedidosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPedido}
          contentContainerStyle={{ paddingBottom: 40 }}
          scrollEnabled={false}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  voltar: {
    position: 'absolute',
    top: 35,
    left: 3,
    zIndex: 10,
  },
  seta: {
    fontSize: 30,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 46,
    marginBottom: 10,
    textAlign: 'center',
  },
  busca: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 24,
  },
  filtros: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: '#D9D9D9',
    height: 40,
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 1,
  },
  filtroBotao: {
    padding: 4,
    paddingHorizontal: 8,
    height: 40,
    borderWidth: 1,

    borderColor: '#D9D9D9',
    borderRadius: 40,
    justifyContent: 'center',
  },
  filtroSelecionado: {
    backgroundColor: '#FFF',
  },
  filtroTexto: {
    fontSize: 14,
  },
  filtroTextoSelecionado: {
    color: '#000',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  texto: {
    fontSize: 14,
  },
  botao: {
    backgroundColor: '#e6ffe6',
    borderWidth: 1,
    borderColor: '#2ecc71',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  botaoTexto: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
});
