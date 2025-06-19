from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .services import get_all_cepea_quotes, get_all_hfbrasil_quotes
from .models import Quote
from .serializers import QuoteSerializer

class QuoteListFilteredView(generics.ListAPIView):
    """
    View para consultar uma cotação específica.
    """
    permission_classes = [AllowAny]
    serializer_class = QuoteSerializer

    def get_queryset(self):
        queryset = Quote.objects.all()
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        return queryset
        
class QuoteListView(generics.ListAPIView):
    """
    View para listar todas as cotações.
    """
    permission_classes = [AllowAny]
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    
def update_or_create(item):
    Quote.objects.update_or_create(
        name=item['name'],
        defaults={
            'date': item['date'],
            'unity': item['unity'],
            'value': item['value']
        }
    )
    
class QuoteUpdateView(APIView):
    """
    View para atualizar as cotações (só chamar se necessário).
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        cepea_data, cepea_ok = get_all_cepea_quotes()
        hfbrasil_data, hfbrasil_ok = get_all_hfbrasil_quotes()
        if not cepea_ok:
            return Response({'error': cepea_data}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        if not hfbrasil_ok:
            return Response({'error': cepea_data}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        for item in cepea_data:
            update_or_create(item)
        for item in hfbrasil_data:
            update_or_create(item)
        return Response(status=status.HTTP_200_OK)