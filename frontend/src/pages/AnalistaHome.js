import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { AuthContext } from '../navigation/AuthContext';



export default function AnalistaHome() {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    setUser(null);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const { user } = useContext(AuthContext);
  const nome = user?.nome || '';

  const buttons = [
    {
      label: 'Pedido de Crédito',
      icon: <FontAwesome6 name="sack-dollar" size={45} color="black" />,
      route: 'Pedido de Crédito',
    },
    {
      label: 'Lucros e Vendas',
      icon: <MaterialIcons name="show-chart" size={45} color="#2e5339" />,
      route: 'Lucros e Vendas',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.greeting}>{`OLÁ ${nome.toUpperCase()}!`}</Text>
        <Text style={styles.subGreeting}>
          Transforme propostas em oportunidades para quem produz.
        </Text>

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
        <TouchableOpacity onPress={handleLogout} style={styles.botaoSair}>
          <Text style={styles.textoBotaoSair}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.relatorioButton}
          onPress={() => navigation.navigate('Relatorio')}
        >
          <Ionicons name="document-text-outline" size={40} color="#2e5339" />
          <Text style={styles.relatorioText}>Relatórios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '48%',
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
    padding: 20,
    marginTop: 10,
    justifyContent: 'center',
  },
  relatorioText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000000',
  },
  botaoSair: {
    backgroundColor: '#E55',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 24,
  },

  textoBotaoSair: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }

});
