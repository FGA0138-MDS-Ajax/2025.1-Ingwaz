import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { registerUser, loginUser } from "./api";
import { AuthContext } from "../../navigation/AuthContext";
import ScreenLayout from "../../components/ScreenLayout";

export default function RegisterScreen() {
  const { setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastro = async () => {
    if (!nome || !cpf || !email || !senha || !confirmarSenha || !role) {
      return Alert.alert("Erro", "Preencha todos os campos.");
    }

    if (senha !== confirmarSenha) {
      return Alert.alert("Erro", "As senhas não coincidem.");
    }

    const cpfNumerico = cpf.replace(/\D/g, "");

    const result = await registerUser({
      name: nome,
      email,
      password: senha,
      cpf: String(cpfNumerico),
      role,
    });

    if (result.id) {
      const loginResult = await loginUser({ email, password: senha });

      if (loginResult.token) {
        await AsyncStorage.setItem("userId", loginResult.id.toString());
        await AsyncStorage.setItem("token", loginResult.token);
        await AsyncStorage.setItem("userTipo", loginResult.tipo);
        await AsyncStorage.setItem("userNome", loginResult.nome);
        setUser(loginResult);
        Alert.alert("Sucesso", "Usuário registrado e logado com sucesso!");
      } else {
        Alert.alert(
          "Atenção",
          "Usuário criado, mas erro ao logar. Faça login manualmente.",
        );
        navigation.navigate("Login");
      }
    } else {
      Alert.alert("Erro", "Erro ao registrar usuário.");
    }
  };

  return (
    <ScreenLayout isScrollable={true} isRegister={true}>
      <Text style={styles.subTitle}>Insira as seguintes informações  para criar sua conta</Text>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="José Maria dos Santos"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        placeholder="000.000.000-00"
        keyboardType="numeric"
        placeholderTextColor="#999"
        maxLength={14}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="seu@email.com"
        keyboardType="email-address"
        placeholderTextColor="#999"
        autoCapitalize="none"
      />

      <View style={styles.selecione}>
        <Text style={styles.label}>Selecione o tipo de usuário</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Agricultor" value="agricultor" />
          <Picker.Item label="Analista" value="analista" />
        </Picker>
      </View>
      
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        placeholder="********"
        placeholderTextColor="#999"
      />
      
      <Text style={styles.label}>Repita sua senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        placeholder="********"
        placeholderTextColor="#999"
      />
      
      <TouchableOpacity style={styles.botaoCriar} onPress={handleCadastro}>
        <Text style={styles.botaoTexto}>Criar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>Já possuo uma conta</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 24,
  },
  selecione: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  picker: {
    height: 55,
    width: "100%",
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
  botaoCriar: {
    backgroundColor: "#2E7D32",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 16,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginLink: {
    textAlign: "center",
    color: "#007AFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
