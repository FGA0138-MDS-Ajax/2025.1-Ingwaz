import { API_URL } from "@env";

const API_BASE = `${API_URL}/api`;

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
