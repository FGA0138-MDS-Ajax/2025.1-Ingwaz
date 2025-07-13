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
  RefreshControl,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  getSolicitacoes,
  avaliarCredito,
  aprovarSolicitacao,
  rejeitarSolicitacao,
} from "../../services/api";
import ScreenLayout from "../../components/ScreenLayout";

const themeColors = {
  background: "#F1F8E9",
  card: "#FFFFFF",
  textPrimary: "#1B5E20",
  textSecondary: "#558B2F",
  placeholder: "#81C784",
  accent: "#4CAF50",
  buttonDisabled: "#A5D6A7",
  approve: "#2E7D32",
  reject: "#C62828",
  status: {
    aprovado: "#2E7D32",
    rejeitado: "#C62828",
    analise: "#F9A825",
    pendente: "#757575",
  },
};

export default function AnaliseSolicitacoesScreen() {
  const navigation = useNavigation();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [busca, setBusca] = useState("");
  const [evaluatingId, setEvaluatingId] = useState(null);

  const fetchSolicitacoes = useCallback(async () => {
    try {
      const response = await getSolicitacoes();
      setSolicitacoes(response || []);
    } catch (error) {
      console.error("Erro ao buscar solicitações para análise:", error);
      Alert.alert("Erro", "Não foi possível carregar as solicitações.");
    } finally {
      setCarregando(false);
      setIsRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      fetchSolicitacoes();
    }, [fetchSolicitacoes]),
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
        s?.user?.toString().includes(buscaFormatada) ||
        s?.finalidade?.toLowerCase().includes(buscaFormatada) ||
        s?.status?.toLowerCase().includes(buscaFormatada),
    );
  }, [solicitacoes, busca]);

  const handleUpdateStatus = async (id, action) => {
    setEvaluatingId(id);
    try {
      const updatedSolicitacao =
        action === "aprovar"
          ? await aprovarSolicitacao(id)
          : await rejeitarSolicitacao(id);

      Alert.alert(
        "Sucesso",
        `Solicitação #${id} foi atualizada para '${updatedSolicitacao.status}'.`,
      );
      setSolicitacoes((prev) =>
        prev.map((sol) => (sol.id === updatedSolicitacao.id ? updatedSolicitacao : sol)),
      );
    } catch (err) {
      Alert.alert("Erro", err.detail || "Não foi possível atualizar o status.");
    } finally {
      setEvaluatingId(null);
    }
  };

  const handleAvaliar = async (id) => {
    setEvaluatingId(id);
    try {
      const response = await avaliarCredito(id);
      const { novo_status, score_gerado } = response.solicitacao;

      Alert.alert("Avaliação Concluída", `Status alterado para: ${novo_status}`);

      setSolicitacoes((prev) =>
        prev.map((sol) =>
          sol.id === id ? { ...sol, status: novo_status, score: score_gerado } : sol,
        ),
      );
    } catch (err) {
      const errorMessage = err.detail || "Erro ao processar avaliação.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setEvaluatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    const color = themeColors.status[status] || themeColors.status.pendente;
    return { color, fontWeight: "bold" };
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Solicitação #{item.id}</Text>
        <Text style={styles.preco}>
          R$ {parseFloat(item.valor_solicitado).toFixed(2)}
        </Text>
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
          <>
            {item.status === "pendente" && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAvaliar(item.id)}
              >
                <Text style={styles.actionButtonText}>Avaliar Crédito (Auto)</Text>
              </TouchableOpacity>
            )}

            {item.status === "analise" && (
              <View style={styles.decisionButtonsContainer}>
                <TouchableOpacity
                  style={[styles.decisionButton, styles.approveButton]}
                  onPress={() => handleUpdateStatus(item.id, "aprovar")}
                >
                  <Text style={styles.decisionButtonText}>Aprovar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.decisionButton, styles.rejectButton]}
                  onPress={() => handleUpdateStatus(item.id, "rejeitar")}
                >
                  <Text style={styles.decisionButtonText}>Rejeitar</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );

  return (
    <ScreenLayout hasHeader={true}>
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
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[themeColors.accent]}
            />
          }
        />
      )}
    </ScreenLayout>
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    flexDirection: "row",
    alignItems: "center",
  },
  buttonWrapper: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E8F5E9",
    alignItems: "center",
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
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
    marginTop: 40,
  },
  decisionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  decisionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  approveButton: {
    backgroundColor: themeColors.approve,
  },
  rejectButton: {
    backgroundColor: themeColors.reject,
  },
  decisionButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
