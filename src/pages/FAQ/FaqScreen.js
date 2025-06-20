import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FaqScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                // Ocupa a tela toda
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});