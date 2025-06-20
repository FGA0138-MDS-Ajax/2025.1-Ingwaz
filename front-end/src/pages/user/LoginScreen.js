import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login () {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Funcionando</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Drawer')} style={styles.button}>
              <Text style={styles.buttonText}>Ir para Login</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  button: { padding: 10, backgroundColor: '#ccc', marginTop: 10 },
  buttonText: { fontSize: 16 },
});

