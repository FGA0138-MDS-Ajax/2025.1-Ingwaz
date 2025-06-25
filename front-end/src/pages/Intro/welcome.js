import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* LOGO na parte branca superior */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.postimg.cc/MpWXF7Q4/Green-Modern-Agriculture-Logo-Design.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* PARTE VERDE INFERIOR COM CURVA */}
      <View style={styles.curvedSection}>
        <Text style={styles.title}>AgroRenda</Text>
        <Text style={styles.subtitle}>Conectando o campo ao que importa</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
  <Text style={styles.buttonText}>Ir para Login</Text>
</TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: height * 0.50, 
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    paddingBottom: 20,
  },

  logo: {
    width: 200,
    height: 200,
  },

  curvedSection: {
    flex: 1,
    backgroundColor: '#2E7D32',
    borderTopLeftRadius: width * 1,   // mais arredondado
    borderTopRightRadius: width * 1,
    alignItems: 'center',
    paddingTop: 200,
  
    
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#E6F0E6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

