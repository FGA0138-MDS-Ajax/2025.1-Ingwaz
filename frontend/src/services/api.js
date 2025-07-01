import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';


const API_BASE = `${API_URL}/api`;

export async function registerUser(data) {
  const response = await fetch(`${API_BASE}/users/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  console.log('Erro ou sucesso no registro:', json); // 👈 mostra no console
  return json;
}

export async function loginUser(data) {
  const response = await fetch(`${API_BASE}/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  console.log('Resultado do login:', json); // opcional
  return json;
}

export async function solicitarCredito(dadosSolicitacao) {
  const token = await AsyncStorage.getItem('token');
  console.log("Token usado:", token);

  const response = await fetch(`${API_BASE}/solicitacoes/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify(dadosSolicitacao),
  });

  const json = await response.json();
  console.log('Resposta completa da API:', json);

  if (!response.ok) {
    throw new Error(JSON.stringify(json));
  }

  return json;
}


/**
 * Busca as solicitações de crédito.
 * - Para analistas, retorna todas.
 * - Para agricultores, retorna apenas as suas.
 * Requer autenticação.
 * @returns {Promise<any>} O JSON de resposta da API.
 */
export async function getSolicitacoes() {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_BASE}/solicitacoes/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  });

  const json = await response.json();
  // Não vamos logar aqui para não poluir o console com listas grandes
  return json;
}


/**
 * Dispara a avaliação de uma solicitação de crédito específica.
 * Requer autenticação (geralmente de um analista).
 * @param {number} solicitacaoId - O ID da solicitação a ser avaliada.
 * @returns {Promise<any>} O JSON de resposta da API.
 */
export async function avaliarCredito(solicitacaoId) {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_BASE}/solicitacoes/${solicitacaoId}/avaliar/`, {
        method: 'GET', // A view Django espera um GET para esta ação
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    });

    const json = await response.json();
    console.log(`Resultado da avaliação da solicitação #${solicitacaoId}:`, json);
    return json;
}