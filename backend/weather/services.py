import datetime
import random

def get_weather(latitude: float, longitude: float):
    """
    Retorna a previsão do tempo de uma semana.
    Esta função simula os dados que seriam retornados por uma API.
    """

    if latitude is None or longitude is None:
        return None
    
    variacao_temp = int(latitude % 4) - 2

    hoje = datetime.date.today()
    data = {
        # Em uma API real, a cidade e o país seriam determinados pelas coordenadas
        "cidade": f"Propriedade em Lat: {latitude:.2f}",
        "pais": f"Propriedade em Long: {longitude:.2f}",
        "atualizado_em": hoje.strftime("%d/%m/%Y %H:%M"),
        "previsoes": {}
    }
    for i in range(7):
        dia_atual = hoje + datetime.timedelta(days=i)
        
        # Lógica de simulação com a variação
        if i < 3:
            condicao = "Ensolarado e quente"
            min_temp = 19 + variacao_temp
            max_temp = 30 + variacao_temp
            prob_chuva = 10 + int(longitude % 5) # Longitude afeta a chuva
        else:
            condicao = "Parcialmente nublado com chance de chuva isolada"
            min_temp = 18 + variacao_temp
            max_temp = 26 + variacao_temp
            prob_chuva = 40 + int(longitude % 10)

        previsao_dia = {
            "dia_semana": dia_atual.strftime("%A").capitalize(),
            "temperatura_min": f"{min_temp + random.randint(-1, 1)}°C",
            "temperatura_max": f"{max_temp + random.randint(-1, 1)}°C",
            "condicao": condicao,
            "probabilidade_chuva": f"{min(95, prob_chuva)}%"
        }
        
        data["previsoes"][dia_atual.strftime("%Y-%m-%d")] = previsao_dia
    
    return data