import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function Dashboard () {
   const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
          <TouchableOpacity
            style={styles.relatorioButton}
            onPress={() => navigation.navigate('AdicionarCriacao')}
          >
            <Ionicons name="add-circle-outline" size={24} color="black" />
            <Text style={styles.relatorioText}>Adicionar</Text>
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

