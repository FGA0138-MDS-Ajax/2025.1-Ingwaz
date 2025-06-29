import { API_URL, API_EMBRAPA_KEY } from "@env";

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
        "size": 1000
      }
    };
    const response = await fetch(
      "https://api.cnptia.embrapa.br/respondeagro/v1/_search/template", {
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
