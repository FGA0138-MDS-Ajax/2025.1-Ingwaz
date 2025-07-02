from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .services import get_all_cepea_quotes, get_all_hfbrasil_quotes
from .models import Quote
from .serializers import QuoteSerializer
import operator


class QuoteListView(generics.ListAPIView):
    """View para listar todas as cotações ou filtrar pelo nome."""

    permission_classes = [AllowAny]
    serializer_class = QuoteSerializer

    def get_queryset(self):
        queryset = Quote.objects.all()
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        return queryset


def update_or_create(item):
    Quote.objects.update_or_create(
        name=item['name'],
        defaults={
            'date': item['date'],
            'unity': item['unity'],
            'value': item['value'],
        },
    )

class QuoteUpdateView(APIView):
    """View para atualizar as cotações (só chamar se necessário)."""

    permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        sources = [get_all_cepea_quotes, get_all_hfbrasil_quotes]
        all_data = []
        for get_data in sources:
            data, ok = get_data()
            if not ok:
                return Response({'error': data}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            all_data += data
        all_data.sort(key=operator.itemgetter('name'))
        for item in all_data:
            update_or_create(item)
        return Response({'message': 'Cotações atualizadas com sucesso.'}, status=status.HTTP_200_OK)