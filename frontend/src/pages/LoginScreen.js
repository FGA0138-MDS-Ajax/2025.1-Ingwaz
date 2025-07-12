import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginUser } from "../services/api";
import { AuthContext } from "../navigation/AuthContext";
import ScreenLayout from "../components/ScreenLayout";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const result = await loginUser({ email, password: senha });

      if (result?.token && result?.id && result?.tipo && result?.nome) {
        await AsyncStorage.setItem("userId", result.id.toString());
        await AsyncStorage.setItem("token", result.token);
        await AsyncStorage.setItem("userTipo", result.tipo);
        await AsyncStorage.setItem("userNome", result.nome);

        setUser(result);
      } else {
        Alert.alert("Erro", "Credenciais inválidas ou resposta incompleta.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
    }
  };

  return (
    <ScreenLayout style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Criar Conta")}>
        <Text style={styles.link}>Ainda não tem conta? Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Recuperar Senha")}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#aaa",
    marginBottom: 16,
    paddingVertical: 6,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#66E266",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    color: "#007AFF",
    fontSize: 14,
    textDecorationLine: "underline",
    marginBottom: 8,
  },
});
