import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
import { getPerguntas } from "../services/api";

const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true
  }
};

export default function PerguntasScreen() {
  const navigation = useNavigation();
  const [perguntas, setPerguntas] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchDaBusca() {
        if (busca !== "") {
          setCarregando(true);
          try {
            const perguntas = await getPerguntas(busca);
            setPerguntas(perguntas || []);
          } finally {
            setCarregando(false);
          }
        } else {
          setPerguntas([]);
        }
      }
      fetchDaBusca();
    }, 500);
    return () => clearTimeout(timer);
  }, [busca]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.pergunta}>{item["_source"].question}</Text>
      <RenderHTML
        contentWidth={width}
        source={{ html: item["_source"].answer }}
        tagsStyles={tagsStyles}
        renderersProps={renderersProps}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={{
            uri: "https://i.postimg.cc/rs8x2VYX/Captura-de-tela-2025-06-22-235024.png",
          }}
          style={styles.bannerImage}
        />
      </View>

      <TextInput
        placeholder="Clique aqui para pesquisar uma pergunta."
        value={busca}
        onChangeText={setBusca}
        style={styles.busca}
      />

      {carregando ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={perguntas}
          keyExtractor={(item) => item["_id"]}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>Nenhuma pergunta disponível.</Text>
          }
        />
      )}
    </View>
  );
}

const tagsStyles = {
  p: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "justify",
    color: "#555",
    margin: 0,
    padding: 0,
  },
  img:{
    "width": "50%",
  },
  li: {
    fontSize: 16,
    color: "#555",
    textAlign: "justify",
  },
};

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 170,
    marginBottom: 30,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  busca: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
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
  },
  pergunta: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptyMessage: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#888",
  },
});
