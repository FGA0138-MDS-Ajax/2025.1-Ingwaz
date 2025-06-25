import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PedirCredito () {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x150?text=Como+usar+o+App' }}
          style={styles.bannerImage}
        />
      </View>

      

      <TouchableOpacity
        style={styles.relatorioButton}
        onPress={() => navigation.navigate('FormCredit')}
      >
      
        <Text style={styles.relatorioText}>Pedido de Crédito</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.relatorioButton}
        
        onPress={() => navigation.navigate('AcompanharCredit')}
      >
  
        <Text style={styles.relatorioText}>Acompanhar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   container: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  banner: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  relatorioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CEEBAF',
    borderRadius: 10,
    padding: 25,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
  },
  relatorioText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#00000',
  },
})