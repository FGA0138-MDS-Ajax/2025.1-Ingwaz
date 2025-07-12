import React, { useEffect, useState, useLayoutEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { getQuotes } from "../services/api";
import ScreenLayout from "../components/ScreenLayout";

export default function CotacoesScreen() {
  const navigation = useNavigation();
  const [cotacoes, setCotacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function fetchOnce() {
      try {
        const quotes = await getQuotes();
        setCotacoes(quotes || []);
      } finally {
        setCarregando(false);
      }
    }
    fetchOnce();
  }, []);

  const cotacoesFiltradas = useMemo(() => {
    if (!cotacoes) return [];
    const buscaFormatada = busca.toLowerCase();
    return cotacoes.filter((cotacao) =>
      cotacao?.name?.toLowerCase().includes(buscaFormatada),
    );
  }, [cotacoes, busca]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.produto}>{item.name}</Text>
      <Text style={styles.preco}>
        {`R$ ${item.value} / ${item.unity}\nem ${item.date}`}
      </Text>
    </View>
  );

  return (
    <ScreenLayout hasHeader={true}>
      <TextInput
        placeholder="Clique aqui para pesquisar um produto específico."
        value={busca}
        onChangeText={setBusca}
        style={styles.busca}
      />

      {carregando ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={cotacoesFiltradas}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>Nenhuma cotação disponível.</Text>
          }
        />
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  busca: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  produto: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  preco: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
  },
  emptyMessage: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#888",
  },
});
