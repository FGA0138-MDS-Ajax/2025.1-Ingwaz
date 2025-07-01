// screens/AnaliseSolicitacoesScreen.js
import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getTodasSolicitacoes, avaliarCredito } from "../services/api";

// Paleta de Cores (Tema Verde) - Consistente com as outras telas
const themeColors = {
  background: "#F1F8E9",
  card: "#FFFFFF",
  textPrimary: "#1B5E20",
  textSecondary: "#558B2F",
  placeholder: "#81C784",
  accent: "#4CAF50",
  buttonDisabled: "#A5D6A7",
  status: {
    aprovado: "#2E7D32",
    rejeitado: "#C62828",
    analise: "#F9A825",
    pendente: "#757575",
  },
};

export default function AnaliseSolicitacoesScreen() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [evaluatingId, setEvaluatingId] = useState(null);

  const fetchSolicitacoes = useCallback(async () => {
    try {
      const response = await getTodasSolicitacoes();
      setSolicitacoes(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      fetchSolicitacoes();
    }, [fetchSolicitacoes])
  );

  const solicitacoesFiltradas = useMemo(() => {
    if (!solicitacoes) return [];
    const buscaFormatada = busca.toLowerCase();
    return solicitacoes.filter(
      (s) =>
        s?.user?.toString().includes(buscaFormatada) ||
        s?.finalidade?.toLowerCase().includes(buscaFormatada) ||
        s?.status?.toLowerCase().includes(buscaFormatada)
    );
  }, [solicitacoes, busca]);
  
  const handleAvaliar = async (id) => {
      setEvaluatingId(id);
      try {
          const response = await avaliarCredito(id);
          const { novo_status, score_gerado } = response.data.solicitacao;
          
          Alert.alert("Avaliação Concluída", `Status alterado para: ${novo_status}`);
          
          setSolicitacoes(prev => prev.map(sol => 
              sol.id === id ? { ...sol, status: novo_status, score: score_gerado } : sol
          ));

      } catch (err) {
          const errorMessage = err.response?.data?.detail || "Erro ao processar avaliação.";
          Alert.alert("Erro", errorMessage);
      } finally {
          setEvaluatingId(null);
      }
  };
  
  const getStatusStyle = (status) => {
    const color = themeColors.status[status] || themeColors.status.pendente;
    return { color, fontWeight: 'bold' };
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Solicitação #{item.id}</Text>
        <Text style={styles.preco}>R$ {parseFloat(item.valor_solicitado).toFixed(2)}</Text>
      </View>
      <Text style={styles.cardInfo}>Usuário ID: {item.user}</Text>
      <Text style={styles.cardInfo}>Finalidade: {item.finalidade}</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.cardInfo}>Status:</Text>
        <Text style={getStatusStyle(item.status)}> {item.status?.toUpperCase()}</Text>
      </View>
      
      <View style={styles.buttonWrapper}>
        {evaluatingId === item.id ? (
            <ActivityIndicator color={themeColors.accent} />
        ) : (
            <TouchableOpacity 
                style={[styles.actionButton, item.status !== 'pendente' && styles.buttonDisabled]}
                onPress={() => handleAvaliar(item.id)}
                disabled={item.status !== 'pendente'}
            >
                <Text style={styles.actionButtonText}>Avaliar Crédito</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar por usuário, finalidade ou status..."
        value={busca}
        onChangeText={setBusca}
        style={styles.busca}
        placeholderTextColor={themeColors.placeholder}
      />

      {carregando ? (
        <ActivityIndicator size="large" color={themeColors.accent} />
      ) : (
        <FlatList
          data={solicitacoesFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>Nenhuma solicitação para análise.</Text>
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
    marginBottom: 20,
    fontSize: 16,
    color: themeColors.textPrimary,
  },
  card: {
    backgroundColor: themeColors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DCEDC8",
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: themeColors.textPrimary,
  },
  preco: {
    fontSize: 18,
    fontWeight: "600",
    color: themeColors.textPrimary,
  },
  cardInfo: {
    fontSize: 16,
    color: themeColors.textSecondary,
    lineHeight: 24,
  },
  statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  buttonWrapper: {
      marginTop: 16,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#E8F5E9',
      alignItems: 'center',
  },
  actionButton: {
      backgroundColor: themeColors.accent,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
  },
  buttonDisabled: {
      backgroundColor: themeColors.buttonDisabled,
  },
  actionButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
  },
  emptyMessage: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
    marginTop: 40,
  },
});
