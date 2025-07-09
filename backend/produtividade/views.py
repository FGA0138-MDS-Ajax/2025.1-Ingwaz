from rest_framework import generics
from .models import Produtividade
from .serializers import ProdutividadeSerializer

# GET /api/produtividades/  e POST /api/produtividades/
class ProdutividadeListCreate(generics.ListCreateAPIView):
    queryset = Produtividade.objects.order_by('-data_criacao')
    serializer_class = ProdutividadeSerializer

# GET /api/produtividades/{pk}/ , PUT/PATCH e DELETE
class ProdutividadeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Produtividade.objects.all()
    serializer_class = ProdutividadeSerializer
