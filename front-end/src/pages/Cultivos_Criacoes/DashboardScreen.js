import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();

  const [cultivos, setCultivos] = useState([]);
  const [criacoes, setCriacoes] = useState([]);


  useEffect(() => {
    // buscar dados do backend futuramente
    // fetch('https://seu-backend.com/api/cultivos')
    //   .then(response => response.json())
    //   .then(data => {
    //     setCultivos(data.cultivos);
    //     setCriacoes(data.criacoes);
      //.catch(err => {
      //console.error('Erro ao buscar dados:', err);
    //   });
    
  // Dados de exemplo apenas para testes (até integrar com o backend)
  setCultivos([
    {
      id: 1,
      nome: 'Feijão',
      area: '1.5',
      data: '24 fev 2025',
    }
  ]);

  setCriacoes([
    {
      id: 1,
      animal: 'Boi',
      quantidade: 10,
      data: '24 fev 2025',
    }
  ]);


  }, []);

  const handleEditar = (tipo, item) => {
    
    navigation.navigate('AdicionarCriacao', { tipo, item });
  };

  const handleExcluir = (tipo, id) => {
    Alert.alert(
      "Excluir",
      `Tem certeza que deseja excluir este ${tipo}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sim", 
          onPress: () => {
            // chamando DELETE para o backend
            // await fetch(`https://seu-backend.com/api/${tipo}/${id}`, { method: 'DELETE' })
            
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
  

      <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('AdicionarCriacao')}>
        <Text style={styles.buttonAddText}>Adicionar</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Cultivos Ativos</Text>
      {cultivos.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text>{item.nome}</Text>
          <Text>{item.area} ha</Text>
          <Text>plantada em {item.data}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn} onPress={() => handleEditar('cultivo', item)}>
              <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnEx} onPress={() => handleExcluir('cultivo', item.id)}>
              <Text style={styles.btnExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Criações</Text>
      {criacoes.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text>{item.animal}</Text>
          <Text>{item.quantidade} cabeças</Text>
          <Text>vacinados em {item.data}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn} onPress={() => handleEditar('criacao', item)}>
              <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnEx} onPress={() => handleExcluir('criacao', item.id)}>
              <Text style={styles.btnExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  buttonAdd: {
    backgroundColor: '#D9F5D1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonAddText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginTop: 20 },
  card: { backgroundColor: '#fff', marginVertical: 10 },
  actions: { flexDirection: 'row', marginTop: 8 },
  btn: {
    borderColor: '#34A853',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 10
  },
  btnEx: {
    borderColor: '#DE0000',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 10
  },
  btnText: { color: '#34A853', fontWeight: 'bold' },
  btnExcluir: { color: '#DE0000', fontWeight: 'bold' }
});



