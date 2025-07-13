import { API_URL } from "@env";

const API_BASE = `${API_URL}/api`; 

export async function getCropCalendar(cropSlug) {
  if (!cropSlug) {
    console.error("O slug da cultura é necessário para a busca.");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE}/calendario/${cropSlug}/`);
    
    if (!response.ok) {
      throw new Error(`Erro na API: Status ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`Erro ao buscar o calendário para '${cropSlug}':`, error);
    return null;
  }
}
