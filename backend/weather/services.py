from datetime import timedelta
from django.utils import timezone
from .models import Weather
from .clients import OpenMeteoClient

class WeatherService:
    """
    Serviço com a lógica de negócio para a previsão do tempo.
    """
    def __init__(self, client=None):
        self.client = client or OpenMeteoClient()

    def get_forecast_for_property(self, propriedade, cache=True):
        """
        Obtém a previsão do tempo para uma propriedade, usando cache se disponível
        e válido. Caso contrário, busca na API externa e atualiza o cache.
        """
        forecast_obj, created = Weather.objects.get_or_create(
            propriedade=propriedade,
            defaults={'data_forecast': {}, 'data_expiration': timezone.now()}
        )

        # verifica se o cache está expirado
        if not created and forecast_obj.data_expiration > timezone.now() and cache:
            return forecast_obj.data_forecast

        # se o cache não existe ou expirou, busca na API
        coordinates = propriedade.coordinates
        latitude = coordinates.get('latitude')
        longitude = coordinates.get('longitude')
        
        if latitude is None or longitude is None:
            return None

        novos_dados = self.client.fetch_forecast(latitude, longitude)

        if novos_dados:
            # atualiza o objeto de previsão com os novos dados e data de expiração
            forecast_obj.data_forecast = novos_dados
            forecast_obj.data_expiration = timezone.now() + timedelta(days=14)
            forecast_obj.save()
            return novos_dados
            
        # retorna dados antigos se a API falhar, ou None se não houver nada
        return forecast_obj.data_forecast if not created else None
    
    def get_daily_forecast_for_property(self, propriedade, requested_date):
        """
        Obtém a previsão do tempo para um dia específico para uma dada propriedade.
        """
        # reutiliza o método existente para obter a previsão completa (com cache)
        full_forecast = self.get_forecast_for_property(propriedade)

        if not full_forecast or 'daily' not in full_forecast:
            return None

        # procura o índice da data solicitada na lista de datas da previsão
        try:
            # a API Open-Meteo retorna as datas no formato 'YYYY-MM-DD'
            date_str = requested_date.strftime('%Y-%m-%d')
            date_index = full_forecast['daily']['time'].index(date_str)
        except (ValueError, KeyError):
            # a data solicitada não foi encontrada na previsão de 14 dias
            return None

        # monta um dicionário com os dados apenas para o dia solicitado
        daily_data = {
            'time': full_forecast['daily']['time'][date_index],
            'temperature_2m_max': full_forecast['daily']['temperature_2m_max'][date_index],
            'temperature_2m_min': full_forecast['daily']['temperature_2m_min'][date_index],
            'precipitation_sum': full_forecast['daily']['precipitation_sum'][date_index],
            'windspeed_10m_max': full_forecast['daily']['windspeed_10m_max'][date_index],
        }
        
        # inclui as unidades para o frontend saber como exibir os dados
        daily_units = full_forecast.get('daily_units', {})
        
        return {'daily': daily_data, 'daily_units': daily_units}