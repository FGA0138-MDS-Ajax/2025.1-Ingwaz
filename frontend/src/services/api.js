import { API_URL, API_EMBRAPA_URL, API_EMBRAPA_KEY } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = `${API_URL}/api`;

export async function registerUser(data) {
  const response = await fetch(`${API_BASE}/users/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  console.log("Erro ou sucesso no registro:", json); // 👈 mostra no console
  return json;
}

export async function loginUser(data) {
  const response = await fetch(`${API_BASE}/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  console.log("Resultado do login:", json); // opcional
  return json;
}

export async function getQuotes() {
  try {
    console.log(`${API_BASE}/quotes/`);
    const response = await fetch(`${API_BASE}/quotes/`);
    const data = await response.json();
    if (!response.ok) {
      console.error("Erro API:", data);
      return null;
    }
    return data;
  } catch (e) {
    console.error("Erro servidor:", e.message);
    return null;
  }
}

export async function getPerguntas(pergunta) {
  try {
    payload = {
      "id": "query_all",
      "params": {
        "query_string": pergunta,
        "from": 0,
        "size": 100
      }
    };
    const response = await fetch(
      API_EMBRAPA_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_EMBRAPA_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      },
    );
    
    const data = await response.json();
    if (!response.ok) {
      console.error("Erro API:", data);
      return null;
    }
    return data.hits.hits;
  } catch (e) {
    console.error("Erro servidor:", e.message);
    return null;
  }
}

const getAuthToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getProperties = async () => {
  const token = await getAuthToken();
  if (!token) {
      return { error: "Usuário não autenticado." };
  }

  try {
    const response = await fetch(`${API_BASE}/propriedade`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
         return { error: "Sua sessão expirou. Por favor, faça login novamente." };
      }
      const errorData = await response.json();
      throw new Error(errorData.detail || `Erro na API: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em getProperties:", error);
    return { error: error.message || "Não foi possível conectar ao servidor." };
  }
};

export const getWeatherList = async (propriedadeId, useCache) => {
  const token = await getAuthToken();
  if (!token) {
      return { error: "Usuário não autenticado." };
  }

  try {
    const response = await fetch(`${API_BASE}/weather/${propriedadeId}/${useCache}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro em getWeatherList:", error);
    return { error: error.message || "Não foi possível conectar ao servidor." };
  }
};

export const getWeatherDetail = async (propriedadeId, date) => {
  const token = await getAuthToken();
  if (!token) {
      return { error: "Usuário não autenticado." };
  }

  console.log(`Buscando detalhe para propriedade ${propriedadeId} na data ${date}`);
  
  try {
    const response = await fetch(`${API_BASE}/weather/${propriedadeId}/${date}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro em getWeatherDetail:", error);
    return { erro: error.message || "Não foi possível conectar ao servidor." };
  }
};
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