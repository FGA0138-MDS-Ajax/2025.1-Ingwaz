import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import ScreenLayout from "../../components/ScreenLayout";
import { getPlantios, getProperties, deletePlantio } from "./api";

export default function ListarPlantiosScreen() {
  const [plantios, setPlantios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [propriedades, setPropriedades] = useState([]);

  useEffect(() => {
    fetchDados();
  }, []);

  async function fetchDados() {
    try {
      setCarregando(true);
      const [dadosPlantios, dadosPropriedades] = await Promise.all([
        getPlantios(),
        getProperties(),
      ]);

      setPlantios(dadosPlantios);
      if (Array.isArray(dadosPropriedades)) {
        setPropriedades(dadosPropriedades);
      } else {
        console.warn("Falha ao carregar propriedades:", dadosPropriedades);
        setPropriedades([]);
      }
    } catch (e) {
      console.error("Erro ao buscar dados:", e);
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    } finally {
      setCarregando(false);
    }
  }

  const handleExcluir = (plantioId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir este plantio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePlantio(plantioId);
              setPlantios((plantiosAtuais) =>
                plantiosAtuais.filter((p) => p.id !== plantioId),
              );
              Alert.alert("Sucesso", "Plantio excluído com sucesso.");
            } catch (error) {
              console.error("Erro ao excluir:", error);
              Alert.alert("Erro", "Não foi possível excluir o plantio.");
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item }) => {
    const propriedade = propriedades.find((p) => p.id === item.propriedade);
    const nomePropriedade = propriedade?.nome || `Propriedade #${item.propriedade}`;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardId}>Plantio #{item.id}</Text>
          <TouchableOpacity
            style={styles.botaoExcluir}
            onPress={() => handleExcluir(item.id)}
          >
            <Text style={styles.botaoExcluirTexto}>🗑️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.linha}>Cultura: {item.cultura}</Text>
          <Text style={styles.linha}>Área: {item.area} ha</Text>
          <Text style={styles.linha}>
            Data do Plantio:{" "}
            {new Date(item.data + "T12:00:00").toLocaleDateString("pt-BR")}
          </Text>
          <Text style={styles.linha}>
            Estimativa Colheita:{" "}
            {new Date(item.estimativa_colheita + "T12:00:00").toLocaleDateString("pt-BR")}
          </Text>
          <Text style={styles.linha}>Propriedade: {nomePropriedade}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenLayout hasHeader={true} isList={true}>
      {carregando ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={plantios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.textoVazio}>Nenhum plantio encontrado.</Text>
          }
        />
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DCEDC8",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e5339",
  },
  botaoExcluir: {
    padding: 8,
  },
  botaoExcluirTexto: {
    fontSize: 20,
  },
  cardContent: {
    paddingLeft: 8,
  },
  linha: {
    marginBottom: 6,
    color: "#2e5339",
  },
  textoVazio: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});
