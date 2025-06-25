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
  
 <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Text style={styles.seta}>{'←'}</Text>
        </TouchableOpacity>


  <Text style={styles.title}>Pedido de Crédito</Text>
</View>

     

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
    flex: 1,
    
  },
  voltar: {
    position: 'absolute',
    top: 40,
    left: 3,
    zIndex: 10,
  },
  seta: {
    fontSize: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 46,
    marginBottom: 10,
    textAlign: 'center',
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
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 20,
  marginTop: 1,
  paddingVertical: 4,
},
headerTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginLeft: 10,
},


});
