from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from propriedade.models import Propriedade
from .services import WeatherService
from rest_framework.permissions import IsAuthenticated

class WeatherListView(APIView):
    """
    View para obter a previsão do tempo dos próximos 14 dias de uma propriedade.
    """

    permission_classes = [IsAuthenticated] # somente usuários logados podem ver

    def get(self, request, propriedade_id, cache, format=None):
        try:
            propriedade = Propriedade.objects.get(id=propriedade_id, agricultor=request.user)
        except Propriedade.DoesNotExist:
            return Response({'error': 'Propriedade não encontrada ou não pertence a você.'}, status=status.HTTP_404_NOT_FOUND)
        
        if propriedade.coordinates is None:
            return Response(
                {"error": "Propriedade não tem as coordenadas de localização."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        service = WeatherService()
        forecast = service.get_forecast_for_property(propriedade, cache)

        if forecast:
            return Response(forecast, status=status.HTTP_200_OK)
        
        return Response(
            {"error": "Não foi possível obter a previsão do tempo."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

class WeatherDetailView(APIView):
    """
    View para consultar o tempo de um dia específico para uma propriedade.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, propriedade_id, data, format=None):
        try:
            propriedade = Propriedade.objects.get(id=propriedade_id, agricultor=request.user)
        except Propriedade.DoesNotExist:
            return Response({'error': 'Propriedade não encontrada ou não pertence a você.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            # converte a string da data (formato YYYY-MM-DD) para um objeto date
            requested_date = datetime.strptime(data, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {"erro": "Formato de data inválido. Use AAAA-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST
            )

        service = WeatherService()
        daily_forecast = service.get_daily_forecast_for_property(propriedade, requested_date)

        if daily_forecast:
            return Response(daily_forecast, status=status.HTTP_200_OK)
        
        return Response(
            {"erro": "Previsão para esta data não disponível."},
            status=status.HTTP_404_NOT_FOUND
        )