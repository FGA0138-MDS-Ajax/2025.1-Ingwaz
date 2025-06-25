import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const perguntasRespostas = [
  {
    pergunta: 'Como faço para criar minha conta?',
    resposta:
      'No menu de cadastro, preencha seus dados corretamente e escolha seu tipo de usuário. Depois, clique em "Criar".',
  },
  {
    pergunta: 'Esqueci minha senha. O que faço?',
    resposta:
      'Na tela de login, clique em "Esqueci a senha" e siga as instruções para recuperar seu acesso.',
  },
  {
    pergunta: 'Como faço um pedido de crédito?',
    resposta:
      'No menu principal, selecione "Pedido de Crédito" e preencha o formulário com seus dados e necessidades.',
  },
  {
    pergunta: 'Posso falar com um técnico pelo app?',
    resposta:
      'Sim! Na opção "Falar com Técnico", você pode enviar mensagens e tirar suas dúvidas.',
  },
  {
    pergunta: 'Como acompanho a produção atual?',
    resposta:
      'Escolha "Produção Atual" no menu para ver o status das suas plantações e criações.',
  },
  {
    pergunta: 'Recebo notificações no app?',
    resposta:
      'Sim, o app envia notificações importantes sobre seus cultivos e créditos.',
  },
];

export default function FaqScreen() {
  const navigation = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
              <View style={styles.banner}>
  <Image
    source={{ uri: 'https://i.postimg.cc/WbKrC35J/ponto-de-interrogacao.png' }}
    style={styles.bannerImage}
  />
            </View>
      

      {perguntasRespostas.map((item, index) => (
        <View key={index} style={styles.item}>
          <TouchableOpacity
            style={styles.questionRow}
            onPress={() => toggleExpand(index)}
            activeOpacity={0.7}
          >
            <Text style={styles.question}>{item.pergunta}</Text>
            <Ionicons
              name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#2e5339"
            />
          </TouchableOpacity>

          {expandedIndex === index && (
            <Text style={styles.answer}>{item.resposta}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
 banner: {
  width: '100%',
  height: 170,
  marginBottom: 30,
  borderRadius: 10,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
},
bannerImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'contain', // ou 'cover' se preferir
},

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e5339',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    marginTop: 8,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 12,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e5339',
    flex: 1,
    paddingRight: 10,
  },
  answer: {
    marginTop: 8,
    fontSize: 15,
    color: '#555',
    lineHeight: 20,
  },
});

