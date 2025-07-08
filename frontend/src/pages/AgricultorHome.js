import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialIcons, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { AuthContext } from '../navigation/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function AgricultorHome() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    setUser(null);
    navigation.replace('Login');
  };


  const nome = user?.nome || '';

  const buttons = [
    {
      label: 'Cultivo e Criações',
      icon: <FontAwesome5 name="seedling" size={45} color="#2e5339" />,
      route: 'Cultivo e Criações',
    },
    {
      label: 'Registrar Propriedade',
      icon: <FontAwesome5 name="home" size={45} color="#2e5339" />,
      route: 'RegistrarPropriedade',
    },

    {
      label: 'Pedido de Crédito',
      icon: <FontAwesome6 name="sack-dollar" size={45} color="#2e5339" />,
      route: 'Pedido de Crédito',
    },
    
   // {
  //    label: 'Preços Produtos Rurais',
    //  icon: <MaterialIcons name="show-chart" size={45} color="#2e5339" />,
      //route: 'Preços Produtos Rurais',
    //},
    {
      label: 'Produção Atual',
      icon: <Entypo name="leaf" size={45} color="#2e5339" />,
      route: 'Produção Atual',
    },
    {
      label: 'Perguntas Agrícolas',
      icon: <Ionicons name="help-outline" size={45} color="#2e5339" />,
      route: 'Perguntas Agrícolas',
    },
    {
      label: 'Previsão do Tempo',
      icon: <Ionicons name="partly-sunny-outline" size={45} color="#2e5339" />,
      route: 'Previsão do Tempo',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tutorial */}
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x150?text=Como+usar+o+App' }}
          style={styles.bannerImage}
        />
      </View>



      {/* Saudação */}
      <Text style={styles.greeting}>{`OLÁ ${nome.toUpperCase()}!`}</Text>
      <Text style={styles.subGreeting}>Veja o que está acontecendo na sua produção hoje.</Text>

      <View style={styles.grid}>
        {buttons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate(btn.route)}
          >
            {btn.icon}
            <Text style={styles.buttonText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão relatorio*/}
      <TouchableOpacity
        style={styles.relatorioButton}
        onPress={() => navigation.navigate('Relatório')}
      >
        <Ionicons name="document-text-outline" size={40} color="#2e5339" />
        <Text style={styles.relatorioText}>Relatórios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
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
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '47%',
    height: 145,
    backgroundColor: '#CEEBAF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
  },
  buttonText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 15,
    color: '#00000',
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

  logoutButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
