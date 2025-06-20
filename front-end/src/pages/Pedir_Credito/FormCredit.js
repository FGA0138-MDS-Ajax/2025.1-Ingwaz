import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function PedidoCreditoScreen() {
    const navigation = useNavigation();

  const [formData, setFormData] = useState({
    nomeFazenda: '',
    proprietario: '',
    cpfCnpj: '',
    cultura: '',
    montante: '',
    motivo: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Aqui você pode enviar os dados para o back-end
    console.log('Enviando dados:', formData);
  };

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
  <Ionicons name="arrow-back" size={24} color="black" />
</TouchableOpacity>


  <Text style={styles.headerTitle}>Pedido de Crédito</Text>
</View>

      <Text style={styles.title}>Pedido de Crédito</Text>

      <View style={styles.form}>
        <View>
        <Text style={styles.label}>Nome da Fazenda</Text>
            <TextInput
                placeholder = 'Exemplo: Fazenda dos Vales'
                style={styles.input}
            />
        </View>

         <View>
        <Text style={styles.label}>Nome do proprietário</Text>
            <TextInput
                placeholder = 'Exemplo: João Albuquerque '
                style={styles.input}
            />
        </View>

         <View>
        <Text style={styles.label}>CPF/CNPJ</Text>
            <TextInput
                placeholder = 'CPF/CNPJ'
                style={styles.input}
            />
        </View>

         <View>
        <Text style={styles.label}>Cultura</Text>
            <TextInput
                placeholder = 'Ex: milho'
                style={styles.input}
            />
        </View>

         <View>
        <Text style={styles.label}>Montante</Text>
            <TextInput
                placeholder = 'Exemplo: 20.000,00'
                style={styles.input}
            />
        </View>

         <View>
        <Text style={styles.label}>Motivo</Text>
            <TextInput
                placeholder = 'Motivo'
                style={styles.input}
            />
        </View>
        
      </View>

    

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>



  );

}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  
  button: {
    backgroundColor: '#01560A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
form:{
    flex:1,
    backgroundColor: '#white',
    borderTopLeftRadius:16,
    borderBottomRightRadius: 28,
    paddingTop: 34,
    paddingLeft: 14,
    paddingRight: 14,

},
label:{
    color: '#zinc',
    marginBottom: 4
},
input:{
    borderWidth: 1,
    borderRadius: 8,
    marginBottom:16,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,

},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  marginTop: 10,
  paddingVertical: 20,
},
headerTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginLeft: 10,
},


});
