import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Entypo,
  FontAwesome6,
} from "@expo/vector-icons";
import { AuthContext } from "../navigation/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GridMenu from "../components/GridMenu";

export default function AgricultorHome() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    setUser(null);
  };

  const nome = user?.nome || "";

  const buttons = [
    {
      label: "Cultivo e Criações",
      icon: <FontAwesome5 name="seedling" size={45} color="#2e5339" />,
      route: "Cultivo e Criações",
    },
    {
      label: "Registrar Propriedade",
      icon: <FontAwesome5 name="home" size={45} color="#2e5339" />,
      route: "RegistrarPropriedade",
    },

    {
      label: "Pedido de Crédito",
      icon: <FontAwesome6 name="sack-dollar" size={45} color="#2e5339" />,
      route: "Pedido de Crédito",
    },
    {
      label: "Falar com Técnico",
      icon: <FontAwesome5 name="user-tie" size={45} color="#2e5339" />,
      route: "Chat",
    },
    {
      label: "Preços Produtos Rurais",
      icon: <MaterialIcons name="show-chart" size={45} color="#2e5339" />,
      route: "Preços Produtos Rurais",
    },
    {
      label: "Perguntas Agrícolas",
      icon: <Ionicons name="help-outline" size={45} color="#2e5339" />,
      route: "Perguntas Agrícolas",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>{`OLÁ ${nome.toUpperCase()}!`}</Text>
      <Text style={styles.subGreeting}>
        Veja o que está acontecendo na sua produção hoje.
      </Text>

      <GridMenu items={buttons} />

      {/* Botão relatorio*/}
      <TouchableOpacity
        style={styles.relatorioButton}
        onPress={() => navigation.navigate("Relatório")}
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
    backgroundColor: "#fff",
    alignItems: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: "#666",
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  relatorioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CEEBAF",
    borderRadius: 10,
    padding: 25,
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
  },
  relatorioText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#00000",
  },

  logoutButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
