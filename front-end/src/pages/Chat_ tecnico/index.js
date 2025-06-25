import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function Chat({ navigation }) {
  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    // busca as conversas do usuário no backend
    // Exemplo :
    setConversas([
      { id: '1', nomeOutro: 'Maria', ultimaMensagem: 'Tudo certo!', data: '2025-06-24T14:00:00Z' },
      { id: '2', nomeOutro: 'João', ultimaMensagem: 'Obrigado!', data: '2025-06-23T17:30:00Z' },
    ]);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Conversa', { conversaId: item.id })}
    >
      <Text style={styles.nome}>{item.nomeOutro}</Text>
      <Text style={styles.ultimaMensagem}>{item.ultimaMensagem}</Text>
      <Text style={styles.data}>{new Date(item.data).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversas}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  item: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  nome: { fontWeight: 'bold', fontSize: 16 },
  ultimaMensagem: { color: '#666', marginTop: 2 },
  data: { color: '#aaa', marginTop: 2, fontSize: 12 },
});
