import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        // O backend espera um token para autenticação
        'Authorization': `Token ${token}`, // ou 'Bearer ' dependendo da sua config
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
  try {
    const response = await fetch(`${API_BASE}/weather/${propriedadeId}/${useCache}/`);
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
  console.log(`Buscando detalhe para propriedade ${propriedadeId} na data ${date}`);
  
  try {
    const response = await fetch(`${API_BASE}/weather/${propriedadeId}/${date}/`);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro em getWeatherDetail:", error);
    return { erro: error.message || "Não foi possível conectar ao servidor." };
  }
};