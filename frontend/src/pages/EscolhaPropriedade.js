import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getProperties } from "../services/api"; // Importando a função real da API

export default function EscolhaPropriedadeScreen() {
  const navigation = useNavigation();
  const [propriedades, setPropriedades] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");

  const fetchProperties = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      // Usando a função real para buscar dados da API
      const data = await getProperties();
      if (data.error) {
        setErro(data.error);
        setPropriedades([]);
      } else {
        setPropriedades(data || []);
      }
    } catch (error) {
      console.error("Erro ao buscar propriedades:", error);
      setErro("Não foi possível carregar as propriedades. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }, []);

  // useFocusEffect é chamado toda vez que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      fetchProperties();
    }, [fetchProperties])
  );

  const propriedadesFiltradas = useMemo(() => {
    if (!propriedades) return [];
    const buscaFormatada = busca.toLowerCase();
    // Assumindo que o serializer retorna 'nome'
    return propriedades.filter((prop) =>
      prop?.nome?.toLowerCase().includes(buscaFormatada)
    );
  }, [propriedades, busca]);

  const handleSelectProperty = (propriedade) => {
    // Navega para a tela de previsão do tempo com o ID da propriedade
    console.log("something1");
    navigation.navigate("Previsões", { propriedadeId: propriedade.id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelectProperty(item)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="business-outline" size={24} color="#2c6e49" />
      </View>
      <View style={styles.cardTextContainer}>
        {/* Assumindo que o serializer da API retorna 'nome' e 'localizacao' */}
        <Text style={styles.propriedadeNome}>{item.nome}</Text>
        <Text style={styles.propriedadeLocal}>{item.localizacao || 'Localização não informada'}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={22} color="#ccc" />
    </TouchableOpacity>
  );

  const ListHeader = () => (
     <View>
      <Text style={styles.title}>Minhas Propriedades</Text>
      <View style={styles.buscaContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.buscaIcon} />
        <TextInput
          placeholder="Pesquisar por nome..."
          value={busca}
          onChangeText={setBusca}
          style={styles.buscaInput}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {carregando && !propriedades.length ? (
        <ActivityIndicator size="large" color="#2c6e49" style={styles.loader} />
      ) : erro ? (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyMessage}>{erro}</Text>
            <TouchableOpacity onPress={fetchProperties} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={propriedadesFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyMessage}>Nenhuma propriedade encontrada.</Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={carregando}
              onRefresh={fetchProperties}
              colors={["#2c6e49"]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buscaIcon: {
    padding: 12,
  },
  buscaInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  propriedadeNome: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  propriedadeLocal: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  retryButton: {
      marginTop: 16,
      backgroundColor: '#2c6e49',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
  },
  retryButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  }
});