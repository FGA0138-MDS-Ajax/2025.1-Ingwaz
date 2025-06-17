from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

def get_quotes():
    # TODO: chamar uma API de verdade.
    data = {
        'cafe': 99.99,
        'soja': 1.99,
        'milho': 0.99,
    }
    return data
    
class QuotesDetailView(APIView):
    """
    View para consultar uma cotação específica.
    """
    permission_classes = [AllowAny]
  
    def get(self, request, format=None):
        name = request.query_params.get('name', None)
        
        if name is None:
            return Response({'error': 'Especifique o nome do produto'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            
        price = get_quotes().get(name, None)
        
        if price is None:
            return Response({'error': 'Não temos a cotação dessa cultura'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            
        return Response({'price': price}, status=status.HTTP_200_OK)
        # return Response({'error': 'Serviço indisponível no momento'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

class QuotesListView(APIView):
    """
    View para listar todas as cotações.
    """
    permission_classes = [AllowAny]
    
    def get(self, request, format=None):
        data = get_quotes()
        
        return Response(data, status=status.HTTP_200_OK)
        # return Response({'error': 'Serviço indisponível no momento'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        