import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export default function Conversa() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá, em que posso ajudar?', sender: 'tecnico' },
    { id: '2', text: 'Gostaria de saber sobre a irrigação.', sender: 'agricultor' },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();

  const enviarMensagem = () => {
    if (inputText.trim() === '') return;

    const novaMensagem = {
      id: (messages.length + 1).toString(),
      text: inputText,
      sender: 'agricultor', // ou 'tecnico', dependendo do usuário logado
    };
    setMessages([...messages, novaMensagem]);
    setInputText('');

    // Aqui você pode enviar a mensagem para o backend via API ou WebSocket
  };

  useEffect(() => {
    // Quando a lista de mensagens atualizar, rolar para o final
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }) => {
    const isAgricultor = item.sender === 'agricultor';
    return (
      <View style={[styles.messageContainer, isAgricultor ? styles.agricultor : styles.tecnico]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity onPress={enviarMensagem} style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  agricultor: {
    backgroundColor: '#d1f5d3',
    alignSelf: 'flex-end',
  },
  tecnico: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


