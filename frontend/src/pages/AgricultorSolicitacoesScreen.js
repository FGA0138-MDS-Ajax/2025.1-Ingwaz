import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getSolicitacoes } from "../services/api";

// Paleta de Cores (Tema Verde)
const themeColors = {
  background: "#F1F8E9",
  card: "#FFFFFF",
  textPrimary: "#1B5E20",
  textSecondary: "#558B2F",
  placeholder: "#81C784",
  accent: "#4CAF50",
  status: {
    aprovado: "#2E7D32",
    rejeitado: "#C62828",
    analise: "#F9A825",
    pendente: "#757575",
  },
};

export default function AgricultorSolicitacoesScreen() {
  const navigation = useNavigation();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [busca, setBusca] = useState("");

  const fetchSolicitacoes = useCallback(async () => {
    try {
      const response = await getSolicitacoes();
      setSolicitacoes(response || []);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
    } finally {
      setCarregando(false);
      setIsRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      fetchSolicitacoes();
    }, [fetchSolicitacoes])
  );
  
  const onRefresh = () => {
      setIsRefreshing(true);
      fetchSolicitacoes();
  };

  const solicitacoesFiltradas = useMemo(() => {
    if (!solicitacoes) return [];
    const buscaFormatada = busca.toLowerCase();
    return solicitacoes.filter(
      (s) =>
        s?.finalidade?.toLowerCase().includes(buscaFormatada) ||
        s?.status?.toLowerCase().includes(buscaFormatada)
    );
  }, [solicitacoes, busca]);
  
  const getStatusStyle = (status) => {
    const color = themeColors.status[status] || themeColors.status.pendente;
    return { color, fontWeight: 'bold' };
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Solicitação #{item.id}</Text>
        <Text style={styles.cardSubtitle}>{item.finalidade}</Text>
        <Text style={styles.cardInfo}>
          Data: {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.preco}>
          R$ {parseFloat(item.valor_solicitado).toFixed(2)}
        </Text>
        <Text style={getStatusStyle(item.status)}>{item.status?.toUpperCase()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar por finalidade ou status..."
        value={busca}
        onChangeText={setBusca}
        style={styles.busca}
        placeholderTextColor={themeColors.placeholder}
      />
       <TouchableOpacity style={styles.newButton} onPress={() => navigation.goBack()}>
       {/*  navigation.navigate('Pedido de Crédito') -> virou navigation.goBack(), caso acabe dando ruim nos testes no mobile, deletar botão */}
        <Text style={styles.newButtonText}>+ Nova Solicitação</Text>
      </TouchableOpacity>

      {carregando ? (
        <ActivityIndicator size="large" color={themeColors.accent} style={{ marginTop: 20 }}/>
      ) : (
        <FlatList
          data={solicitacoesFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>Nenhuma solicitação encontrada.</Text>
          }
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={[themeColors.accent]}/>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
    padding: 16,
  },
  busca: {
    backgroundColor: themeColors.card,
    borderWidth: 1,
    borderColor: "#A5D6A7",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    color: themeColors.textPrimary,
  },
  newButton: {
    backgroundColor: themeColors.accent,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: themeColors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DCEDC8",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: themeColors.textPrimary,
  },
  cardSubtitle: {
    fontSize: 16,
    color: themeColors.textSecondary,
    marginTop: 4,
  },
  cardInfo: {
      fontSize: 14,
      color: '#757575',
      marginTop: 8,
  },
  cardRight: {
      alignItems: 'flex-end',
  },
  preco: {
    fontSize: 18,
    fontWeight: "600",
    color: themeColors.textPrimary,
    marginBottom: 4,
  },
  emptyMessage: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
    marginTop: 40,
  },
});
