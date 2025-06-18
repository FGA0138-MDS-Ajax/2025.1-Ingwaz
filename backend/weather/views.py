from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Propriedade
from .services import get_weather
    
class WeatherListView(APIView):
    """
    View para listar as previsões da semana para uma propriedade específica.
    """
    permission_classes = [IsAuthenticated] # Somente usuários logados podem ver

    def get(self, request, propriedade_id, format=None):
        try:
            propriedade = Propriedade.objects.get(id=propriedade_id, agricultor=request.user)
        except Propriedade.DoesNotExist:
            return Response({'error': 'Propriedade não encontrada ou não pertence a você.'}, status=status.HTTP_404_NOT_FOUND)

        data = get_weather(propriedade.latitude, propriedade.longitude)
        
        if data is None:
            return Response({'error': 'Coordenadas não disponíveis para esta propriedade. Serviço indisponível.'}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response(data, status=status.HTTP_200_OK)


class WeatherDetailView(APIView):
    """
    View para consultar o tempo de um dia específico para uma propriedade.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, propriedade_id, format=None):
        date = request.query_params.get('date', None)
        if not date:
            return Response({'error': 'O parâmetro "date" é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            propriedade = Propriedade.objects.get(id=propriedade_id, agricultor=request.user)
        except Propriedade.DoesNotExist:
            return Response({'error': 'Propriedade não encontrada ou não pertence a você.'}, status=status.HTTP_404_NOT_FOUND)

        data = get_weather(propriedade.latitude, propriedade.longitude)
        
        if data is None:
             return Response({'error': 'Coordenadas não disponíveis para esta propriedade. Serviço indisponível.'}, status=status.HTTP_400_BAD_REQUEST)

        forecast = data['previsoes'].get(date)
        
        if forecast is None:
            return Response({'error': 'Previsão do tempo para este dia não está disponível.'}, status=status.HTTP_404_NOT_FOUND)
            
        return_data = {
            "cidade": data['cidade'],
            "pais": data['pais'],
            "atualizado_em": data['atualizado_em'],
            'forecast': forecast
        }

        return Response(return_data, status=status.HTTP_200_OK)