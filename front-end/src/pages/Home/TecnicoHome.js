import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthContext'; 

export default function TecnicoHome () {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);


  const nome = user?.nome || '';

  const buttons = [
    {
      label: 'Cultivo e Criações',
      icon: <FontAwesome5 name="seedling" size={45} color="#2e5339" />,
      route: 'Cultivo e Criações',
    },
    {
  label: 'Pedido de Crédito',
  icon: <FontAwesome5 name="money-bill-wave" size={45} color="black" />,
  route: 'Pedido de Crédito',
},

    {
      label: 'Falar com Técnico',
      icon: <FontAwesome5 name="user-tie" size={45} color="#2e5339" />,
      route: 'Chat',
    },
    {
      label: 'Lucros e Vendas',
      icon: <MaterialIcons name="show-chart" size={45} color="#2e5339" />,
      route: 'Lucros e Vendas',
    },
    {
      label: 'Produção Atual',
      icon: <Entypo name="leaf" size={45} color="#2e5339" />,
      route: 'Produção Atual',
    },
    {
      label: 'Vídeos Educativos',
      icon: <Ionicons name="videocam-outline" size={45} color="#2e5339" />,
      route: 'Videos Educacionais',
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
      <Text style={styles.subGreeting}>Monitore, oriente e cultive bons resultados com os agricultores.</Text>

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

      {/* Botão relatorio */}
      <TouchableOpacity
        style={styles.relatorioButton}
        onPress={() => navigation.navigate('Relatório')}
      >
        <Ionicons name="document-text-outline" size={40} color="#2e5339" />
        <Text style={styles.relatorioText}>Relatórios</Text>
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
    color: '#000000',
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
    color: '#000000',
  },
});
