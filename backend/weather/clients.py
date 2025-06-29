import requests
from requests.exceptions import RequestException

class OpenMeteoClient:
    """
    Cliente para comunicação com a API da Open-Meteo.
    """
    API_URL = "https://api.open-meteo.com/v1/forecast"

    def fetch_forecast(self, latitude, longitude):
        """
        Busca a previsão do tempo para uma dada latitude e longitude.
        Retorna os dados em formato JSON ou None em caso de erro.
        """
        params = {
            'latitude': latitude,
            'longitude': longitude,
            'daily': 'temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max',
            'timezone': 'America/Sao_Paulo',
            'forecast_days': 14
        }
        try:
            response = requests.get(self.API_URL, params=params)
            response.raise_for_status()
            return response.json()
        except RequestException as e:
            print(f"Erro ao buscar dados da API Open-Meteo: {e}")
            return None