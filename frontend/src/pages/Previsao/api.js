import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = `${API_URL}/api`;

const getAuthToken = async () => {
  console.log(await AsyncStorage.getItem("token"));
  return await AsyncStorage.getItem("token");
};

export const getProperties = async () => {
  const token = await getAuthToken();
  if (!token) {
    return { error: "Usuário não autenticado." };
  }

  try {
    const response = await fetch(`${API_BASE}/propriedade/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
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
