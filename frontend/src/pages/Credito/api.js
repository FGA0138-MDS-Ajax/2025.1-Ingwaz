import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = `${API_URL}/api`;

export async function solicitarCredito(dadosSolicitacao) {
  const token = await AsyncStorage.getItem("token");
  console.log("Token usado:", token);

  const response = await fetch(`${API_BASE}/solicitacoes/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(dadosSolicitacao),
  });

  const json = await response.json();
  console.log("Resposta completa da API:", json);

  if (!response.ok) {
    throw new Error(JSON.stringify(json));
  }

  return json;
}

export async function getSolicitacoes() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_BASE}/solicitacoes/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  const json = await response.json();
  return json;
}

export async function avaliarCredito(solicitacaoId) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_BASE}/solicitacoes/${solicitacaoId}/avaliar/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  const json = await response.json();
  console.log(`Resultado da avaliação da solicitação #${solicitacaoId}:`, json);
  return json;
}

export async function aprovarSolicitacao(solicitacaoId) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_BASE}/solicitacoes/${solicitacaoId}/aprovar/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw json;
  }
  return json;
}

export async function rejeitarSolicitacao(solicitacaoId) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_BASE}/solicitacoes/${solicitacaoId}/rejeitar/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw json;
  }
  return json;
}
