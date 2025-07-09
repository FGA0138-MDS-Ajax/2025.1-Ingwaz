from rest_framework import serializers
from .models import Produtividade

class ProdutividadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produtividade
        fields = ['id', 'quantidade_colhida', 'sacas_por_hectare', 'data_criacao']
