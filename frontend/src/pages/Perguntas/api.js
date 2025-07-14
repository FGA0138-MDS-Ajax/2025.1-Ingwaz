import { API_EMBRAPA_URL, API_EMBRAPA_KEY } from "@env";

export async function getPerguntas(pergunta) {
  try {
    payload = {
      id: "query_all",
      params: {
        query_string: pergunta,
        from: 0,
        size: 100,
      },
    };
    const response = await fetch(API_EMBRAPA_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_EMBRAPA_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

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
